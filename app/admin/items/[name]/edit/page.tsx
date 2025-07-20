import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import {
  ServicesFormData,
  ServicesCategory,
  ServicesItem,
  ContactInfo,
} from "@/types";
import EditServicesForm from "@/components/admin/form/EditServicesForm";
import Navbar from "@/components/navigation/Navbar";

export default async function EditServicesPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("service_catalogues")
    .select("*")
    .eq("name", name)
    .single();

  if (error || !data) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load restaurant data.
      </div>
    );
  }

  // Transform DB data to ServicesFormData shape
  const servicesObj = data.services || {};
  const services: ServicesCategory[] = Object.entries(servicesObj).map(
    ([name, section]: [string, { layout: string; items: ServicesItem[] }]) => ({
      name,
      layout: section.layout || "variant_1",
      items: section.items || [],
    })
  );
  let contact: ContactInfo[] = [];
  if (Array.isArray(data.contact)) {
    contact = data.contact;
  } else if (data.contact && typeof data.contact === "object") {
    contact = Object.entries(data.contact).map(([type, value]) => ({
      type,
      value: String(value),
    }));
  }
  const initialData: ServicesFormData = {
    name: data.name || "",
    theme: data.theme || "",
    logo: data.logo || "",
    layout: data.layout || "",
    title: data.title || "",
    currency: data.currency || "",
    legal_name: data.legal_name || "",
    contact,
    subtitle: data.subtitle || "",
    services,
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 py-32">
        <EditServicesForm initialData={initialData} />
      </div>
    </>
  );
}
