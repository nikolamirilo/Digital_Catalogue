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

  if (user && user?.id) {
    const { data: restaurantData } = await supabase
      .from("restaurants")
      .select("*")
      .eq("created_by", user.id);
    restaurants = restaurantData || [];
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
      <Dashboard restaurants={restaurants} user={userData} />
    </>
  );
}
