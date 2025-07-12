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
  FiEye,
  FiCalendar,
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
    <div className="container mx-auto py-32 px-4 overflow-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="my-4 flex gap-2 w-full justify-start">
          <TabsTrigger value="overview" className="bg-product-primary text-product-foreground">
            Overview
          </TabsTrigger>
          <TabsTrigger value="billing" className="bg-product-primary text-product-foreground">
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {user && (
            <div className="mb-8 p-8 bg-gradient-to-br from-product-background to-hero-product-background backdrop-blur-sm rounded-2xl shadow-product-shadow border border-product-border flex flex-col md:flex-row gap-6 items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-product-primary/10 to-product-primary-accent/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-product-secondary/10 to-product-icon/10 rounded-full blur-xl"></div>
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full ring-4 ring-product-primary/30 shadow-product-shadow"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-product-background"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-product-foreground mb-1">
                      Welcome back,{" "}
                      {`${user.firstName} ${user.lastName}` || "User"}! 👋
                    </div>
                    <div className="text-product-foreground-accent flex items-center gap-2">
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Total Analytics Card */}
          <div>
            <h2 className="text-center md:text-left text-2xl font-semibold mb-4">Usage Overview</h2>
            <div className="mb-8 grid grid-cols-2 md:grid md:grid-cols-4 gap-4">
              <Card className="p-4 flex flex-col items-center max-w-72 w-full justify-between">
                <div className="text-base md:text-lg font-semibold text-product-foreground mb-2 text-center">
                  Total Page Views
                </div>
                <div className="text-3xl font-bold text-product-foreground">
                  {totalPageViews}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72 w-full justify-between">
                <div className="text-base md:text-lg font-semibold text-product-foreground mb-2 text-center">
                  Total Visitors
                </div>
                <div className="text-3xl font-bold text-product-foreground">
                  {totalUniqueVisitors}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72 w-full justify-between">
                <div className="text-base md:text-lg font-semibold text-product-foreground mb-2 text-center">
                  Total Restaurants
                </div>
                <div className="text-3xl font-bold text-product-foreground">
                  {totalRestaurants}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72 w-full justify-between">
                <div className="text-base md:text-lg font-semibold text-product-foreground mb-2 text-center">
                  Engagement
                </div>
                <div className="text-3xl font-bold text-product-foreground">
                  121
                </div>
              </Card>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-product-foreground flex items-center gap-2">
                <LuSquareMenu className="text-product-primary" />
                Your Restaurants
              </h2>
              <Link href="/admin/create-menu">
                <Button className="bg-product-primary hover:bg-product-primary-accent text-product-foreground transition-colors duration-200 flex items-center gap-2 px-6">
                  <FiPlus size={20} />
                  Create Menu
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="w-16 h-16 bg-product-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LuSquareMenu className="w-8 h-8 text-product-primary" />
                  </div>
                  <p className="text-product-foreground-accent text-lg">
                    No restaurants created yet.
                  </p>
                  <p className="text-product-foreground-accent text-sm mt-2">
                    Create your first menu to get started!
                  </p>
                </div>
              )}
              
              {restaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="p-6 flex flex-col gap-4 relative"
                >
                  <div className="absolute top-4 right-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="w-8 h-8 bg-product-hover-background hover:bg-product-primary/10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200">
                          <FiMoreVertical
                            size={16}
                            className="text-product-foreground"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-product-background border-product-border">
                        <Link
                          href={`/admin/restaurants/${restaurant.name}/edit`}
                          passHref
                          legacyBehavior
                        >
                          <DropdownMenuItem
                            asChild
                            className="text-product-foreground hover:bg-product-hover-background cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <FiEdit size={16} /> Edit Menu
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() => handleDuplicateMenu(restaurant.id)}
                          disabled={duplicatingId === restaurant.id}
                          className="text-product-foreground hover:bg-product-hover-background cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <FiCopy size={16} />
                            {duplicatingId === restaurant.id
                              ? "Loading..."
                              : "Duplicate"}
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteMenu(restaurant.id)}
                          disabled={isModalOpen}
                          className="text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <FiTrash2 size={16} />
                            Delete
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="pr-8">
                    <div className="font-bold text-xl text-product-foreground mb-3">
                      {restaurant.name}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-product-foreground-accent">
                        <div className="w-2 h-2 bg-product-primary rounded-full"></div>
                        <span className="text-sm">Theme: {restaurant.theme}</span>
                      </div>
                      <div className="flex items-center gap-2 text-product-foreground-accent">
                        <div className="w-2 h-2 bg-product-secondary rounded-full"></div>
                        <span className="text-sm">Layout: {restaurant.layout}</span>
                      </div>
                      <div className="flex items-center gap-2 text-product-foreground-accent">
                        <FiCalendar size={12} />
                        <span className="text-sm">
                          Created: {new Date(restaurant.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/restaurants/${restaurant.name}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-product-primary hover:bg-product-primary-accent text-product-foreground transition-colors duration-200 flex items-center gap-2">
                        <FiEye size={16} />
                        View Menu
                      </Button>
                    </Link>
                    <Link
                      href={`/admin/restaurants/${restaurant.name}/analytics`}
                      className="flex-1"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full border-product-border bg-product-background hover:bg-product-hover-background text-product-foreground transition-colors duration-200 flex items-center gap-2"
                      >
                        <TbBrandGoogleAnalytics size={16} /> 
                        Analytics
                      </Button>
                    </Link>
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
        <TabsContent value="billing" className="text-product-foreground">
          <Billing pricingPlan={pricingPlan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
