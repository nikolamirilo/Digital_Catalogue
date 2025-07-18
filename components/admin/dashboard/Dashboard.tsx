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
import { deleteServiceCatalogue, revalidateData, duplicateServiceCatalogue } from "@/utils/server";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useState } from "react";
import InformModal from "./InformModal";
import { RiSparkling2Line } from "react-icons/ri";
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
  const totalServiceCatalogues = restaurants?.length || 0;

  async function handleDeleteMenu(id: string) {
    setMenuToDelete(id);
    setIsModalOpen(true);
  }

  async function confirmDelete() {
    if (menuToDelete) {
      await deleteServiceCatalogue(menuToDelete);
      revalidateData();
      setMenuToDelete(null);
      setIsModalOpen(false);
    }
  }

  async function handleDuplicateMenu(id: string) {
    setDuplicatingId(id);
    try {
      await duplicateServiceCatalogue(id);
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
          <TabsTrigger value="overview" className="bg-product-primary text-product-foreground hover:bg-primary-accent">
            Overview
          </TabsTrigger>
          <TabsTrigger value="billing" className="bg-product-primary text-product-foreground hover:bg-primary-accent">
            Billing
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {user && (
            <div className="mb-8 p-8 bg-product-background rounded-2xl shadow-product-shadow border border-product-border flex flex-col md:flex-row gap-6 items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-product-primary/20 to-product-primary-accent/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-product-primary/20 to-product-primary-accent/20 rounded-full blur-xl"></div>
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full ring-4 ring-product-primary/20 shadow-lg"
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
            <h2 className="text-center md:text-left text-2xl font-semibold mb-4 text-product-foreground">Usage Overview</h2>
            <div className="mb-8 grid grid-cols-2 md:grid md:grid-cols-4 gap-4">
              <Card className="p-4 flex flex-col items-center max-w-72 w-full justify-between bg-product-background border border-product-border shadow-product-shadow">
                <div className="text-base md:text-lg font-semibold text-product-foreground mb-2 text-center">
                  Total Page Views
                </div>
                <div className="text-3xl font-bold text-product-primary">
                  {totalPageViews}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72 w-full justify-between bg-product-background border border-product-border shadow-product-shadow">
                <div className="text-base md:text-lg font-semibold text-product-foreground mb-2 text-center">
                  Total Visitors
                </div>
                <div className="text-3xl font-bold text-product-primary">
                  {totalUniqueVisitors}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72 w-full justify-between bg-product-background border border-product-border shadow-product-shadow">
                <div className="text-base md:text-lg font-semibold text-product-foreground mb-2 text-center">
                  Total ServiceCatalogues
                </div>
                <div className="text-3xl font-bold text-product-primary">
                  {totalServiceCatalogues}
                </div>
              </Card>
              <Card className="p-4 flex flex-col items-center max-w-72 w-full justify-between bg-product-background border border-product-border shadow-product-shadow">
                <div className="text-base md:text-lg font-semibold text-product-foreground mb-2 text-center">
                  Engagement
                </div>
                <div className="text-3xl font-bold text-product-primary">
                  121
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-product-foreground">Your ServiceCatalogues</h2>
            <div className="flex justify-start mb-4 gap-2">
              <Link href="/admin/create">
                <Button className="bg-product-primary text-product-foreground hover:bg-primary-accent hover:shadow-lg hover:scale-105 hover:transform hover:-translate-y-1 transition-all duration-200">
                  <FiPlus size={30} />
                  Create Menu
                </Button>
              </Link>
              <Link href="/admin/create/ai">
                <Button variant="outline" className="flex flex-row items-center gap-1">
                  <RiSparkling2Line size={30} />
                  Generate Menu with AI
                </Button>
              </Link>
              
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.length === 0 && (
                <div className="col-span-full text-product-foreground-accent">
                  No restaurants created yet.
                </div>
              )}
              
              {restaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className="p-6 flex flex-col gap-2 relative bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200"
                >
                  <div className="font-bold text-lg text-product-foreground">
                    {restaurant.name}
                  </div>
                  <div className="text-product-foreground-accent">Theme: {restaurant.theme}</div>
                  <div className="text-product-foreground-accent">
                    Layout: {restaurant.layout}
                  </div>
                  <div className="text-product-foreground-accent">
                    Created: {new Date(restaurant.created_at).toLocaleString()}
                  </div>
                  <div className="flex flex-row-reverse gap-2 mt-2 items-center">
                    <Link
                      href={`/service-catalogues/${restaurant.name}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-product-primary text-product-foreground hover:bg-primary-accent hover:shadow-lg hover:scale-105 hover:transform hover:-translate-y-1 transition-all duration-200">
                        <LuSquareMenu size={25} />
                        View Menu
                      </Button>
                    </Link>
                    <Link
                      href={`/admin/items/${restaurant.name}/analytics`}
                      className="flex-1"
                    >
                      <Button variant="secondary" className="w-full border border-product-primary text-product-foreground hover:bg-product-primary hover:text-product-foreground hover:shadow-lg hover:scale-105 hover:transform hover:-translate-y-1 transition-all duration-200">
                        <TbBrandGoogleAnalytics size={25} /> Analytics
                      </Button>
                    </Link>
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <FiMoreVertical
                            size={25}
                            className="text-product-foreground cursor-pointer hover:text-product-primary transition-colors duration-200"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-product-background border border-product-border">
                          <Link
                            href={`/admin/items/${restaurant.name}/edit`}
                            passHref
                          >
                            <DropdownMenuItem
                              asChild
                              className="text-product-foreground hover:bg-product-hover-background cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <FiEdit size={18} /> Edit Menu
                              </div>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            onClick={() => handleDuplicateMenu(restaurant.id)}
                            disabled={duplicatingId === restaurant.id}
                            className="text-product-foreground hover:bg-product-hover-background cursor-pointer"
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
        <TabsContent value="billing" className="text-product-foreground">
          <Billing pricingPlan={pricingPlan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
