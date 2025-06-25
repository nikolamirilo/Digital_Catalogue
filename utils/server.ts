"use server"
import { revalidatePath, revalidateTag } from "next/cache"
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function revalidateData() {
  revalidatePath("/", "layout")
}
export async function revalidateTagCustom(tag: string) {
  revalidateTag(tag)
}

export async function deleteRestaurantServer(name: string): Promise<boolean> {
  const supabase = createClient(cookies());
  const { error } = await supabase.from('restaurants').delete().eq('name', name);
  return !error;
}