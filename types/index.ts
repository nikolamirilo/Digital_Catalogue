export type Record = {
    name: string;
    description: String;
    price: number;
    image?:string
};

export type NavbarProps = {
  restaurantData?:any;
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}
export interface Restaurant {
  id: string;
  name: string;
  created_by: string;
  theme?: string;
  logo?: string;
  layout?: string;
  title?: string;
  currency?: string;
  legal_name?: string;
  contact?: any;
  subtitle?: string;
  menu?: any;
  created_at: string;
  updated_at: string;
}
export interface Analytics {
  date: string;
  hour: string;
  current_url: string;
  pageview_count: number;
  unique_visitors: number;
}
export interface SupabaseUser {
  id: string;
  email: string | null;
  name: string | null;
  created_at: string;
  image: string | null;
  plan_id: string | null;
}
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_cycle: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  features: string[] | null;
}

export interface ContactInfo {
  type: string;
  value: string;
}

export interface RestaurantFormData {
  name: string;
  theme?: string;
  logo?: string;
  layout?: string;
  title?: string;
  currency?: string;
  legal_name?: string;
  contact: ContactInfo[];
  subtitle?: string;
  menu: MenuCategory[];
}

export const contactTypes = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "website", label: "Website" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
];