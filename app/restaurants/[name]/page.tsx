//@ts-nocheck
import React from "react"
import MenuSection from "@/components/sections/MenuSection";
import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import Navbar from "@/components/navigation/RestaurantNavbar";

const page = async ({ params }: { params: Promise<{name: string}> }) => {
  const { name } = await params
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.from('restaurants').select().eq("name", name)
  if(data[0]){
  let restaurant: any = data[0]
    return (
      <>
      <Navbar restaurantData={restaurant}/>
      <main>
        <div className="pt-24 text-center flex flex-col justify-center items-center gap-4">
          <h1 className="text-4xl font-bold text-navigationMain">{restaurant.title}</h1>
          <p className="text-txtTertiary text-lg 2xl:text-xl px-5 max-w-[1000px]">
            {restaurant.subtitle}
          </p>
        </div>
        {restaurant && <MenuSection menuData={restaurant.menu} currency={restaurant.currency} layout={restaurant.layout} type="restaurant" />}
      </main>
      </>

    )}
};

export default page;
