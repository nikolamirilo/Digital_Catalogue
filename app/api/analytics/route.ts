import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookiesStore = await cookies();
    const supabase = createClient(cookiesStore);
    const res = await fetch(
      `https://eu.i.posthog.com/api/projects/${process.env
        .POSTHOG_PROJECT_ID!}/query/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.POSTHOG_API_KEY!}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: `SELECT 
    toDate(timestamp) AS date,
    formatDateTime(timestamp, '%H:00') AS hour,
    properties.$current_url AS current_url,
    COUNT(*) AS pageview_count,
    COUNT(DISTINCT properties.distinct_id) AS unique_visitors
FROM events
WHERE event = '$pageview'
  AND properties.$current_url NOT ILIKE '%admin%'
  AND properties.$current_url LIKE '%/restaurants/%'
  AND properties.$current_url NOT ILIKE '%localhost%'
GROUP BY date, hour, current_url
ORDER BY date DESC, hour DESC`,
          },
        }),
        cache: "no-store",
      }
    );
    const eventsData = await res.json();
    const analyticsData = eventsData.results.map(
      ([
        date, hour, current_url, pageview_count, unique_visitors
      ]) => ({
       date, hour, current_url, pageview_count, unique_visitors
      })
    );
    const { data, error } = await supabase
      .from('analytics')
      .upsert(analyticsData, { onConflict: 'date,hour,current_url', ignoreDuplicates: true });
    return NextResponse.json({message: "Analytics inserted successfuly", response: data, error: error }, { status: 200 });
  } catch (error) {
    return new Response("Error occurred while pinging.", { status: 500 });
  }
}
