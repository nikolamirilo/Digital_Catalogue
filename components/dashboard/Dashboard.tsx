"use client"
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FiPlus, FiMoreVertical } from 'react-icons/fi';
import { deleteMenu, revalidateData, duplicateMenu } from '@/utils/server';
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useState } from 'react';
import InformModal from './InformModal';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { LuSquareMenu  } from 'react-icons/lu';

export default function Dashboard({user, restaurants}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState<string | null>(null);
    const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

    async function handleDeleteMenu(id:string){
        setMenuToDelete(id);
        setIsModalOpen(true);
    }

    async function confirmDelete() {
        if (menuToDelete) {
            await deleteMenu(menuToDelete);
            revalidateData()
            setMenuToDelete(null);
            setIsModalOpen(false);
        }
    }

    async function handleDuplicateMenu(id: string) {
        setDuplicatingId(id);
        try {
            await duplicateMenu(id);
            await revalidateData();
            // Optionally show a toast or alert
            // alert('Menu duplicated!');
        } catch (e) {
            alert('Failed to duplicate menu.');
        } finally {
            setDuplicatingId(null);
        }
    }

    function cancelDelete() {
        setMenuToDelete(null);
        setIsModalOpen(false);
    }

  return (
    <div className="container mx-auto py-20 px-4 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user && (
        <div className="mb-8 p-6 bg-white rounded shadow flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
          <img src={user.imageUrl} alt="Logo" width={100} height={100} className='rounded-full' />
            <div className="text-lg font-semibold text-gray-900">Welcome, {`${user.firstName} ${user.lastName}` || 'User'}!</div>
            <div className="text-gray-900">Email: {user.email}</div>
            <div className="text-gray-900">User ID: {user.id}</div>
            
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Restaurants</h2>
        <div className="flex justify-start mb-4">
          <Link href="/admin/create-menu">
            <Button variant="primary-inverted" className="border border-white flex items-center gap-2 text-lg font-bold px-6 py-3 rounded-xl shadow-lg">
              <FiPlus size={30} />
              Create Menu
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.length === 0 && (
            <div className="col-span-full text-gray-500">No restaurants created yet.</div>
          )}
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="p-6 flex flex-col gap-2 relative">
              <div className="font-bold text-lg text-gray-900">{restaurant.name}</div>
              <div className="text-gray-800">Theme: {restaurant.theme}</div>
              <div className="text-gray-800">Layout: {restaurant.layout}</div>
              <div className="text-gray-800">Created: {new Date(restaurant.created_at).toLocaleString()}</div>
              <div className="flex flex-row-reverse gap-2 mt-2 items-center">
                <Link href={`/restaurants/${restaurant.name}`} className="flex-1">
                  <Button className="w-full"><LuSquareMenu  size={25} />View Menu</Button>
                </Link>
                <Link href={`/admin/restaurants/${restaurant.name}/analytics`} className="flex-1">
                  <Button variant="secondary" className="w-full"><TbBrandGoogleAnalytics size={25}/> Analytics</Button>
                </Link>
                <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <FiMoreVertical size={25} className='text-gray-900 cursor-pointer'/>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDuplicateMenu(restaurant.id)} disabled={duplicatingId === restaurant.id} className="text-gray-900 hover:bg-gray-900/10 cursor-pointer">
                      {duplicatingId === restaurant.id ? 'Loading...' : 'Duplicate'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteMenu(restaurant.id)} disabled={isModalOpen} className="text-red-400 hover:bg-red-50 cursor-pointer">
                      Delete
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
    </div>
  );
}
