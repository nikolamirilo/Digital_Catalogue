import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";
import Navbar from "@/components/navigation/Navbar";
import Dashboard from "@/components/admin/dashboard/Dashboard";

export default async function page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Get current user by session (assuming Clerk user id is stored in users table)
  const user = await currentUser();
  let restaurants = [];
  let analytics = [];
  let sectionUsage = {};

  if (user && user?.id) {
    const { data: restaurantData } = await supabase
      .from("restaurants")
      .select("*")
      .eq("created_by", user.id);
    restaurants = restaurantData || [];

    // Fetch analytics for all restaurants owned by the user
    const { data: analyticsData } = await supabase
      .from("analytics")
      .select("date, hour, current_url, pageview_count, unique_visitors")
      .eq("user_id", user.id);
    analytics = analyticsData || [];

    // Fetch all menus for user's restaurants
    const { data: restaurantMenusData } = await supabase
      .from("restaurants")
      .select("menu")
      .eq("created_by", user.id);
    // Count section usage
    sectionUsage = {};
    (restaurantMenusData || []).forEach(r => {
      if (r.menu) {
        Object.keys(r.menu).forEach(section => {
          sectionUsage[section] = (sectionUsage[section] || 0) + 1;
        });
      }
    });
  }

  const userData = {
    id: user.id,
    imageUrl: user.imageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses?.[0]?.emailAddress,
  };

  return (
    <>
      <Navbar />
      <Dashboard restaurants={restaurants} user={userData} analytics={analytics} sectionUsage={sectionUsage} />
    </>
  );
}
