import Analytics from '@/components/dashboard/Analytics';
import React from 'react'
import Navbar from "@/components/navigation/Navbar"

type tParams = Promise<{ name: string }>;
export const dynamic = "force-dynamic"

export default async function page({ params }: { params: tParams}) {
  const { name } = await params
  const transformedName = name
  .split("-")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
  const res = await fetch(`https://eu.i.posthog.com/api/projects/${process.env.POSTHOG_PROJECT_ID!}/events/`, {
    headers: {
      'Authorization': `Bearer ${process.env.POSTHOG_API_KEY!}`
    },
    cache: "no-store",

  });
  const data = await res.json();

  const filteredData = data.results.filter(
    (item) =>
      item.properties?.$current_url?.includes(name) === true &&
      item.event === "$pageview"
  );
  // Group by day
  const pageViewsByDay = filteredData.reduce((acc, item) => {
    const date = new Date(item.timestamp).toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const chartData = Object.entries(pageViewsByDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count: Number(count) }));
  console.log("Total sorted:", filteredData.length);
  return (
      <>
        <Navbar/>
        <div className='py-24 flex w-full gap-10 justify-center items-center flex-col relative'>
        <h1 className='text-4xl text-white font-bold'>Analytics for restaurant {transformedName}</h1>
        <Analytics data={chartData} rawEvents={filteredData} />
        </div>
      </>
  )
}
