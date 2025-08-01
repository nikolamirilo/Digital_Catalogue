"use client";
import { useState } from "react";
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
  FiBarChart2,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { deleteServiceCatalogue, revalidateData, duplicateServiceCatalogue } from "@/utils/server";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
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

const TABS = [
  { value: "overview", label: "Overview", icon: <FiEye className="mr-2" size={20} /> },
  { value: "billing", label: "Billing", icon: <FiCalendar className="mr-2" size={20} /> },
  { value: "reports", label: "Reports", icon: <FiBarChart2 className="mr-2" size={20} /> },
  { value: "settings", label: "Settings", icon: <FiSettings className="mr-2" size={20} /> },
  { value: "users", label: "Users", icon: <FiUsers className="mr-2" size={20} /> },
];

export default function Dashboard({
  user,
  restaurants,
  analytics,
  pricingPlan,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

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

  // Sidebar content for md+ screens
  function getSidebarButtonClass(isActive: boolean) {
    return isActive
      ? 'font-bold !bg-product-hover-background !text-navbar-button-active !border !border-product-primary shadow-sm hover:scale-[1.03] hover:transform'
      : 'font-medium';
  }

  const SidebarContent = (
    <nav className="p-4 flex md:flex-col flex-row gap-2 md:gap-3">
      {TABS.map(tab => (
        <Button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          variant="nav"
          className={`${getSidebarButtonClass(activeTab === tab.value)} flex items-center justify-start`}
          aria-current={activeTab === tab.value ? 'page' : undefined}
        >
          <span className="flex items-center justify-center">
            {tab.icon}
          </span>
          {tab.label}
        </Button>
      ))}
    </nav>
  );

  // Mobile tab bar
  const MobileTabBar = (
    <nav
      className="dashboard-tabbar-scroll md:hidden flex flex-row gap-2 overflow-x-auto py-2 px-1 bg-white/95 mb-4"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {TABS.map(tab => (
        <Button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          variant="nav"
          className={`${activeTab === tab.value
            ? '!bg-product-hover-background !text-navbar-button-active !border !border-product-primary shadow-sm font-semibold hover:scale-[1.03] hover:transform'
            : ''} flex items-center justify-start`}
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          aria-current={activeTab === tab.value ? 'page' : undefined}
        >
          <span className="flex items-center justify-center">
            {tab.icon}
          </span>
          {tab.label}
        </Button>
      ))}
    </nav>
  );

  return (
    <div className="w-full min-h-screen px-2 md:px-8 pt-24 pb-12 bg-gradient-to-br from-product-background to-hero-product-background animate-fade-in">
      <div className="container mx-auto flex flex-col md:flex-row px-4 gap-8">
        {/* Sidebar Tabs (hidden on mobile) */}
        <aside className="hidden md:block w-full md:w-56 flex-shrink-0 md:mr-0 bg-white/90 border border-product-border shadow-md rounded-2xl sticky top-24 self-start">
          {SidebarContent}
        </aside>
        {/* Main Content Section */}
        <section className="flex-1 w-full bg-white/95 border border-product-border shadow-md rounded-3xl p-4 sm:p-6 md:p-10 relative z-10 text-sm sm:text-base md:text-lg">
          {/* Mobile tab bar */}
          {MobileTabBar}
          {activeTab === "overview" && (
            <>
              {user && (
                <section className="mb-12 bg-product-background/80 rounded-3xl shadow-product-shadow border border-product-border flex flex-col md:flex-row md:items-center gap-6 md:gap-8 items-center relative overflow-hidden animate-fade-in p-4 sm:p-8 text-base sm:text-lg md:text-xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-product-primary/20 to-product-primary-accent/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-product-primary/20 to-product-primary-accent/20 rounded-full blur-2xl"></div>
                  <div className="flex flex-col items-center md:flex-row md:items-center w-full gap-6 md:gap-8 z-10">
                    <div className="relative flex-shrink-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32">
                      <img
                        src={user.imageUrl}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="rounded-full ring-4 ring-product-primary/30 shadow-lg w-24 h-24 md:w-32 md:h-32 object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-500 rounded-full border-2 border-product-background"></div>
                    </div>
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="text-lg sm:text-2xl md:text-3xl font-bold text-product-foreground mb-1" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>
                        Welcome back, {`${user.firstName} ${user.lastName}` || "User"}! <span className="align-middle">👋</span>
                      </div>
                      <div className="text-product-foreground-accent flex items-center gap-2 text-base sm:text-lg md:text-xl" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {/* Usage Overview */}
              <section className="mb-12 animate-fade-in">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 text-product-foreground flex items-center gap-3" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>
                  <FiEye className="text-product-primary" size={32} /> Usage Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-4 sm:p-6 flex flex-col items-center justify-between bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200 animate-fade-in">
                    <div className="text-base sm:text-lg font-semibold text-product-foreground mb-2 text-center">Total Page Views</div>
                    <div className="text-2xl sm:text-3xl font-bold text-product-primary">{totalPageViews}</div>
                  </Card>
                  <Card className="p-4 sm:p-6 flex flex-col items-center justify-between bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200 animate-fade-in">
                    <div className="text-base sm:text-lg font-semibold text-product-foreground mb-2 text-center">Total Visitors</div>
                    <div className="text-2xl sm:text-3xl font-bold text-product-primary">{totalUniqueVisitors}</div>
                  </Card>
                  <Card className="p-4 sm:p-6 flex flex-col items-center justify-between bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200 animate-fade-in">
                    <div className="text-base sm:text-lg font-semibold text-product-foreground mb-2 text-center">Total Items</div>
                    <div className="text-2xl sm:text-3xl font-bold text-product-primary">{totalServiceCatalogues}</div>
                  </Card>
                  <Card className="p-4 sm:p-6 flex flex-col items-center justify-between bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow transition-all duration-200 animate-fade-in">
                    <div className="text-base sm:text-lg font-semibold text-product-foreground mb-2 text-center">Engagement</div>
                    <div className="text-2xl sm:text-3xl font-bold text-product-primary">121</div>
                  </Card>
                </div>
              </section>
              {/* Service Catalogues */}
              <section className="mb-12 animate-fade-in">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 text-product-foreground flex items-center gap-3" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>
                  <LuSquareMenu className="text-product-primary" size={32} /> Your Service Catalogues
                </h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Link href="/admin/create">
                    <Button variant="cta" className="flex flex-row items-center gap-2 px-6 py-2 rounded-full">
                      <FiPlus size={24} /> Create Menu
                    </Button>
                  </Link>
                  <Link href="/admin/create/ai">
                    <Button variant="outline" className="flex flex-row items-center gap-2 px-6 py-2 rounded-full">
                      <RiSparkling2Line size={24} /> Generate Menu with AI
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {restaurants.length === 0 && (
                    <div className="col-span-full text-product-foreground-accent text-lg">No restaurants created yet.</div>
                  )}
                  {restaurants.map((restaurant) => (
                    <Card
                      key={restaurant.id}
                      className="p-6 sm:p-8 flex flex-col gap-4 relative bg-product-background border border-product-border shadow-product-shadow hover:shadow-product-hover-shadow hover:scale-[1.02] transition-all duration-200 animate-fade-in"
                    >
                      {/* Three dots menu moved to top */}
                      <div className="absolute top-4 right-4 z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-product-foreground hover:text-product-primary hover:bg-product-background/50 transition-colors duration-200">
                              <FiMoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-product-background border border-product-border rounded-xl shadow-lg">
                            <Link href={`/admin/items/${restaurant.name}/edit`} passHref>
                              <DropdownMenuItem asChild className="text-product-foreground hover:bg-product-hover-background cursor-pointer">
                                <div className="flex items-center gap-2"><FiEdit size={18} /> Edit Menu</div>
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => handleDuplicateMenu(restaurant.id)} disabled={duplicatingId === restaurant.id} className="text-product-foreground hover:bg-product-hover-background cursor-pointer">
                              <span className="flex items-center gap-2"><FiCopy size={18} />{duplicatingId === restaurant.id ? "Loading..." : "Duplicate"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteMenu(restaurant.id)} disabled={isModalOpen} className="text-red-400 hover:bg-red-50 cursor-pointer">
                              <span className="flex items-center gap-2"><FiTrash2 size={18} />Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Card content */}
                      <div className="font-bold text-lg sm:text-xl text-product-foreground pr-12" style={{ fontFamily: 'var(--font-playfair-display), var(--font-inter), serif' }}>{restaurant.name}</div>
                      <div className="text-product-foreground-accent text-sm">Theme: {restaurant.theme}</div>
                      <div className="text-product-foreground-accent text-sm">Layout: {restaurant.layout}</div>
                      <div className="text-product-foreground-accent text-sm">Created: {new Date(restaurant.created_at).toLocaleString()}</div>
                      
                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                        <Link href={`/service-catalogues/${restaurant.name}`} className="flex-1 min-w-0">
                          <Button className="w-full bg-product-primary text-product-foreground hover:bg-product-primary-accent hover:shadow-lg hover:scale-105 hover:transform hover:-translate-y-1 transition-all duration-200 font-semibold text-xs sm:text-sm px-2 sm:px-3 py-2 rounded-full">
                            <LuSquareMenu size={16} className="sm:size-18" /> 
                            <span className="ml-1">View Menu</span>
                          </Button>
                        </Link>
                        <Link href={`/admin/items/${restaurant.name}/analytics`} className="flex-1 min-w-0">
                          <Button variant="secondary" className="w-full border border-product-primary text-product-primary hover:bg-product-primary/10 hover:text-product-primary hover:shadow-lg hover:scale-105 hover:transform hover:-translate-y-1 transition-all duration-200 font-semibold text-xs sm:text-sm px-2 sm:px-3 py-2 rounded-full">
                            <TbBrandGoogleAnalytics size={16} className="sm:size-18" /> 
                            <span className="ml-1">Analytics</span>
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
              <InformModal
                isOpen={isModalOpen}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                title="Delete Menu"
                message="Are you sure you want to delete this menu? This action cannot be undone."
              />
            </>
          )}
          {activeTab === "billing" && (
            <section className="animate-fade-in">
              <Billing pricingPlan={pricingPlan} />
            </section>
          )}
        </section>
      </div>
      {/* Custom ultra-thin scrollbar for dashboard tab bar only */}
      <style jsx>{`
        .dashboard-tabbar-scroll::-webkit-scrollbar {
          height: 3px;
        }
        .dashboard-tabbar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .dashboard-tabbar-scroll::-webkit-scrollbar-thumb {
          background: rgba(229, 194, 48, 0.25); /* product-primary/40 */
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
