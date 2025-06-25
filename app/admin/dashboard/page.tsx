import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import Navbar from '@/components/navigation/Navbar';
import { FiPlus } from 'react-icons/fi';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Get current user by session (assuming Clerk user id is stored in users table)
  const user = await currentUser()
  let restaurants = [];

  if (user && user?.id) {
    // Fetch restaurants created by this user
    const { data: restaurantData } = await supabase
      .from('restaurants')
      .select('*')
      .eq('created_by', user.id);
    restaurants = restaurantData || [];
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user && (
        <div className="mb-8 p-6 bg-white rounded shadow flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
          <img src={user.imageUrl} alt="Logo" width={100} height={100} className='rounded-full' />
            <div className="text-lg font-semibold text-gray-900">Welcome, {`${user.firstName} ${user.lastName}` || 'User'}!</div>
            <div className="text-gray-900">Email: {user.emailAddresses?.[0]?.emailAddress}</div>
            <div className="text-gray-900">User ID: {user.id}</div>
            
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Restaurants</h2>
        <div className="flex justify-start mb-4">
          <Link href="/admin/create-menu">
            <Button variant="primary-inverted" className="flex items-center gap-2 text-lg font-bold px-6 py-3 rounded-xl shadow-lg">
              <FiPlus size={30} />
              Create Menu
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.length === 0 && (
            <div className="col-span-full text-gray-500">No restaurants created yet.</div>
          )}
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="p-6 flex flex-col gap-2">
              <div className="font-bold text-lg text-gray-900">{restaurant.name}</div>
              <div className="text-gray-800">Theme: {restaurant.theme}</div>
              <div className="text-gray-800">Layout: {restaurant.layout}</div>
              <div className="text-gray-800">Created: {new Date(restaurant.created_at).toLocaleString()}</div>
              <div className="flex flex-row-reverse gap-2 mt-2">
                <Link href={`/admin/restaurants/${restaurant.name}`} className="flex-1">
                  <Button className="w-full">View Menu</Button>
                </Link>
                <Link href={`/admin/restaurants/${restaurant.name}/analytics`} className="flex-1">
                  <Button variant="secondary" className="w-full">Analytics</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
