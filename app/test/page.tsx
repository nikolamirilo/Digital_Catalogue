//@ts-nocheck
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.from('restaurants').select().eq("name", name)
    console.log(data)
  return (
    <h1>
        Test Page
    </h1>
  )
}
