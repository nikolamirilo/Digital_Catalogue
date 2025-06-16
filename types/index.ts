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