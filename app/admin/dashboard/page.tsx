import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Get current user by session (assuming Clerk user id is stored in users table)
  const user = await currentUser()

  let userInfo = null;
  let restaurants = [];

  if (user && user?.id) {
    // Fetch user info
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    userInfo = userData;

    // Fetch restaurants created by this user
    const { data: restaurantData } = await supabase
      .from('restaurants')
      .select('*')
      .eq('created_by', userData?.id || '');
    restaurants = restaurantData || [];
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {userInfo && (
        <div className="mb-8 p-6 bg-white rounded shadow flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <div className="text-lg font-semibold">Welcome, {userInfo.name || 'User'}!</div>
            <div className="text-gray-600">Email: {userInfo.email}</div>
            <div className="text-gray-600">User ID: {userInfo.id}</div>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.length === 0 && (
            <div className="col-span-full text-gray-500">No restaurants created yet.</div>
          )}
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="p-6 flex flex-col gap-2">
              <div className="font-bold text-lg">{restaurant.name}</div>
              <div className="text-gray-600">Theme: {restaurant.theme}</div>
              <div className="text-gray-600">Layout: {restaurant.layout}</div>
              <div className="text-gray-600">Created: {new Date(restaurant.created_at).toLocaleString()}</div>
              <Link href={`/admin/restaurants/${restaurant.name}`}>
                <Button className="mt-2 w-full">View Menu</Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
