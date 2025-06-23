import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { RestaurantFormData, MenuCategory, MenuItem, ContactInfo } from '@/types';
import EditMenuForm from '@/components/admin/EditMenuForm';

export default async function EditMenuPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('name', name)
    .single();

  if (error || !data) {
    return <div className="p-8 text-center text-red-600">Failed to load restaurant data.</div>;
  }

  // Transform DB data to RestaurantFormData shape
  const menuObj = data.menu || {};
  const menu: MenuCategory[] = Object.entries(menuObj).map(([name, items]: [string, MenuItem[]]) => ({
    name,
    items: items || [],
  }));
  let contact: ContactInfo[] = [];
  if (Array.isArray(data.contact)) {
    contact = data.contact;
  } else if (data.contact && typeof data.contact === 'object') {
    contact = Object.entries(data.contact).map(([type, value]) => ({ type, value: String(value) }));
  }
  const initialData: RestaurantFormData = {
    name: data.name || '',
    theme: data.theme || '',
    logo: data.logo || '',
    layout: data.layout || '',
    title: data.title || '',
    currency: data.currency || '',
    legal_name: data.legal_name || '',
    contact,
    subtitle: data.subtitle || '',
    menu,
  };

  return (
    <div className="container mx-auto p-4">
      <EditMenuForm initialData={initialData} />
    </div>
  );
}