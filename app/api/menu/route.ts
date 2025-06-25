import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { name, created_by, menu, theme, logo, layout, title, currency, legal_name, contact, subtitle } = await request.json();

    // Insert the new restaurant record with menu data
    const { data, error } = await supabase
      .from('restaurants')
      .insert([
        {
          name,
          created_by,
          menu,
          theme,
          logo,
          layout,
          title,
          currency,
          legal_name,
          contact,
          subtitle,
        },
      ])
      .select();

    if (error) {
      console.error('Error inserting menu:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ data }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('Request error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { name, menu, theme, logo, layout, title, currency, legal_name, contact, subtitle } = await request.json();

    // Update the restaurant record with the new menu data
    const { data, error } = await supabase
      .from('restaurants')
      .update({
        menu,
        theme,
        logo,
        layout,
        title,
        currency,
        legal_name,
        contact,
        subtitle,
        updated_at: new Date().toISOString(),
      })
      .eq('name', name)
      .select();

    if (error) {
      console.error('Error updating menu:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ error: 'Restaurant not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('Request error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
} 