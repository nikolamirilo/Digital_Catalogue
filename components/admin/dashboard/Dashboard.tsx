"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FiPlus,
  FiMoreVertical,
  FiEdit,
  FiCopy,
  FiTrash2,
} from "react-icons/fi";
import { deleteMenu, revalidateData, duplicateMenu } from "@/utils/server";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useState } from "react";
import InformModal from "./InformModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Billing from "./Billing";
import { LuSquareMenu } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Dashboard({
  user,
  restaurants,
  analytics,
  pricingPlan,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  // Aggregate analytics
  const totalPageViews = analytics?.reduce(
    (sum, a) => sum + (a.pageview_count || 0),
    0
  );
  const totalUniqueVisitors = analytics?.reduce(
    (sum, a) => sum + (a.unique_visitors || 0),
    0
  );
  const totalRestaurants = restaurants?.length || 0;

  async function handleDeleteMenu(id: string) {
    setMenuToDelete(id);
    setIsModalOpen(true);
  }

  async function confirmDelete() {
    if (menuToDelete) {
      await deleteMenu(menuToDelete);
      revalidateData();
      setMenuToDelete(null);
      setIsModalOpen(false);
    }
  }

  async function handleDuplicateMenu(id: string) {
    setDuplicatingId(id);
    try {
      await duplicateMenu(id);
      await revalidateData();
      // Optionally show a toast or alert
      // alert('Menu duplicated!');
    } catch (e) {
      alert("Failed to duplicate menu.");
    } finally {
      setDuplicatingId(null);
    }
  }

  function cancelDelete() {
    setMenuToDelete(null);
    setIsModalOpen(false);
  }

  return (
    <div className="container mx-auto py-20 px-4 overflow-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="my-4 flex gap-2 w-full justify-start">
          <TabsTrigger value="overview" className="bg-primary text-button">
            Overview
          </TabsTrigger>
          <TabsTrigger value="billing" className="bg-primary text-button">
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {user && (
            <div className="mb-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 flex flex-col md:flex-row gap-6 items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-xl"></div>
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full ring-4 ring-white/50 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      Welcome back,{" "}
                      {`${user.firstName} ${user.lastName}` || "User"}! 👋
                    </div>
                    <div className="text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Total Analytics Card */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Usage Overview</h2>
            <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 flex flex-col items-center max-w-72">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Total Page Views
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {totalPageViews}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Total Unique Visitors
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {totalUniqueVisitors}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Total Restaurants
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {totalRestaurants}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  Additional Measure
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  121
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Restaurants</h2>
            <div className="flex justify-start mb-4">
              <Link href="/admin/create-menu">
                <Button
                  variant="primary-inverted"
                  className="border border-white flex items-center gap-2 text-lg font-bold px-6 py-3 rounded-xl shadow-lg"
                >
                  <FiPlus size={30} />
                  Create Menu
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.length === 0 && (
                <div className="col-span-full text-gray-500">
                  No restaurants created yet.
                </div>
              )}
              {restaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="p-6 flex flex-col gap-2 relative"
                >
                  <div className="font-bold text-lg text-gray-900">
                    {restaurant.name}
                  </div>
                  <div className="text-gray-800">Theme: {restaurant.theme}</div>
                  <div className="text-gray-800">
                    Layout: {restaurant.layout}
                  </div>
                  <div className="text-gray-800">
                    Created: {new Date(restaurant.created_at).toLocaleString()}
                  </div>
                  <div className="flex flex-row-reverse gap-2 mt-2 items-center">
                    <Link
                      href={`/restaurants/${restaurant.name}`}
                      className="flex-1"
                    >
                      <Button className="w-full">
                        <LuSquareMenu size={25} />
                        View Menu
                      </Button>
                    </Link>
                    <Link
                      href={`/admin/restaurants/${restaurant.name}/analytics`}
                      className="flex-1"
                    >
                      <Button variant="secondary" className="w-full">
                        <TbBrandGoogleAnalytics size={25} /> Analytics
                      </Button>
                    </Link>
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <FiMoreVertical
                            size={25}
                            className="text-gray-900 cursor-pointer"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link
                            href={`/admin/restaurants/${restaurant.name}/edit`}
                            passHref
                            legacyBehavior
                          >
                            <DropdownMenuItem
                              asChild
                              className="text-gray-900 hover:bg-gray-900/10 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <FiEdit size={18} /> Edit Menu
                              </div>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            onClick={() => handleDuplicateMenu(restaurant.id)}
                            disabled={duplicatingId === restaurant.id}
                            className="text-gray-900 hover:bg-gray-900/10 cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <FiCopy size={18} />
                              {duplicatingId === restaurant.id
                                ? "Loading..."
                                : "Duplicate"}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteMenu(restaurant.id)}
                            disabled={isModalOpen}
                            className="text-red-400 hover:bg-red-50 cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <FiTrash2 size={18} />
                              Delete
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <InformModal
            isOpen={isModalOpen}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            title="Delete Menu"
            message="Are you sure you want to delete this menu? This action cannot be undone."
          />
        </TabsContent>
        <TabsContent value="billing" className="text-gray-900">
          <Billing pricingPlan={pricingPlan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
