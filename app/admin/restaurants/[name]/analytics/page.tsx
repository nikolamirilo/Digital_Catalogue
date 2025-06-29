import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Analytics from "@/components/admin/dashboard/Analytics";

type tParams = Promise<{ name: string }>;
export const dynamic = "force-dynamic";

export default async function page({ params }: { params: tParams }) {
  const { name } = await params;
  const transformedName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const res = await fetch(
    `https://eu.i.posthog.com/api/projects/${process.env
      .POSTHOG_PROJECT_ID!}/query/`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.POSTHOG_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "query": {
          "kind": "HogQLQuery",
          "query": "select timestamp, properties.distinct_id, properties.$browser, properties.$device_type, properties.$geoip_country_name from events where properties.$current_url like '%/plato%' and event='$pageview' limit 500"
        }}),
      cache: "no-store",
    }
  );
  const data = await res.json();

  // Transform data.results (array of arrays) into rawEvents
  const rawEvents = data.results.map(
    ([timestamp, distinct_id, browser, device_type, country]) => ({
      timestamp,
      properties: {
        distinct_id,
        $browser: browser,
        $device_type: device_type,
        $geoip_country_name: country,
      },
    })
  );

  // Group by day for chart data
  const pageViewsByDay = rawEvents.reduce((acc, item) => {
    const date = new Date(item.timestamp).toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const chartData = Object.entries(pageViewsByDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count: Number(count) }));

  return (
    <>
      <Navbar />
      <div className="py-24 flex w-full gap-10 justify-center items-center flex-col relative">
        <h1 className="text-3xl lg:text-4xl text-white font-bold">
          Analytics for restaurant {transformedName}
        </h1>
        <Analytics data={chartData} rawEvents={rawEvents} />
      </div>
    </>
  );
}
