// "use client";
// import React, { useEffect, useState } from 'react';

// //@ts-nocheck

// interface MenuItem {
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }

// interface Menu {
//   breakfast: MenuItem[];
//   lunch: MenuItem[];
//   snacks: MenuItem[];
//   drinks: MenuItem[];
//   alcoholic_drinks: MenuItem[];
//   desserts: MenuItem[];
// }

// interface MenuData {
//   menu: Menu;
// }

// const MenuEditor = () => {
//   const [menuData, setMenuData] = useState<MenuData>({
//     menu: {
//       breakfast: [],
//       lunch: [],
//       snacks: [],
//       drinks: [],
//       alcoholic_drinks: [],
//       desserts: [],
//     },
//   });
//   const [selectedVariant, setSelectedVariant] = useState<string>('breakfast');
//   const [selectedTheme, setSelectedTheme] = useState<string>('light');
//   const [logo, setLogo] = useState<string>('');

//   // Extract restaurant name from URL
//   const restaurant = window.location.pathname.split('/')[2];

//   // Fetch menu data when component is mounted
//   useEffect(() => {
//     const fetchMenuData = async () => {
//       try {
//         const response = await fetch(`/api/restaurants/${restaurant}`);
//         if (response.status === 202) {
//           alert('There is no data for the selected restaurant');
//         } else {
//           const parsedRes = await response.json();
//           setMenuData(parsedRes.data[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching menu data:', error);
//       }
//     };
//     fetchMenuData();
//   }, [restaurant]);

//   // Update a specific menu item and trigger reactivity
//   const updateMenuItem = (
//     category: keyof Menu,
//     index: number,
//     field: keyof MenuItem,
//     value: string | number
//   ) => {
//     const updatedMenu = { ...menuData };
//     updatedMenu.menu[category][index][field] = value;
//     setMenuData(updatedMenu); // Trigger reactivity by updating state
//   };

//   // Handle logo upload
//   const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setLogo(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className={`container mx-auto p-4 ${selectedTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
//       <h1 className="text-3xl font-bold mb-4">Restaurant Menu Editor</h1>

//       {/* Theme Selector */}
//       <div className="mb-4">
//         <label htmlFor="theme-selector" className="block mb-2">Select Theme:</label>
//         <select
//           id="theme-selector"
//           value={selectedTheme}
//           onChange={(e) => setSelectedTheme(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//         </select>
//       </div>

//       {/* Menu Variant Selector */}
//       <div className="mb-4">
//         <label htmlFor="variant-selector" className="block mb-2">Select Menu Variant:</label>
//         <select
//           id="variant-selector"
//           value={selectedVariant}
//           onChange={(e) => setSelectedVariant(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           {Object.keys(menuData.menu).map((variant) => (
//             <option key={variant} value={variant}>{variant}</option>
//           ))}
//         </select>
//       </div>

//       {/* Logo Upload */}
//       <div className="mb-4">
//         <label htmlFor="logo-upload" className="block mb-2">Upload Logo:</label>
//         <input
//           id="logo-upload"
//           type="file"
//           accept="image/*"
//           onChange={handleLogoUpload}
//           className="w-full p-2 border rounded"
//         />
//         {logo && (
//           <img
//             src={logo}
//             alt="Restaurant Logo"
//             className="mt-2 w-32 h-32 object-contain"
//           />
//         )}
//       </div>

//       {/* Menu Items Editor */}
//       <div className="mb-4">
//         <h2 className="text-2xl font-bold mb-2">Edit {selectedVariant} Menu Items:</h2>
//         {menuData.menu[selectedVariant]?.length ? (
//           menuData.menu[selectedVariant].map((item, index) => (
//             <div key={index} className="mb-4 p-4 border rounded">
//               <label htmlFor={`item-name-${index}`} className="sr-only">Item Name</label>
//               <input
//                 id={`item-name-${index}`}
//                 className="w-full p-2 mb-2 border rounded"
//                 type="text"
//                 placeholder="Item Name"
//                 value={item.name}
//                 onChange={(e) => updateMenuItem(selectedVariant as keyof Menu, index, 'name', e.target.value)}
//               />
//               <label htmlFor={`item-description-${index}`} className="sr-only">Item Description</label>
//               <textarea
//                 id={`item-description-${index}`}
//                 className="w-full p-2 mb-2 border rounded"
//                 placeholder="Item Description"
//                 rows={3}
//                 value={item.description}
//                 onChange={(e) => updateMenuItem(selectedVariant as keyof Menu, index, 'description', e.target.value)}
//               />
//               <label htmlFor={`item-price-${index}`} className="sr-only">Price</label>
//               <input
//                 id={`item-price-${index}`}
//                 className="w-full p-2 mb-2 border rounded"
//                 type="number"
//                 placeholder="Price"
//                 step="0.01"
//                 value={item.price}
//                 onChange={(e) => updateMenuItem(selectedVariant as keyof Menu, index, 'price', parseFloat(e.target.value))}
//               />
//               <label htmlFor={`item-image-${index}`} className="sr-only">Image URL</label>
//               <input
//                 id={`item-image-${index}`}
//                 className="w-full p-2 mb-2 border rounded"
//                 type="text"
//                 placeholder="Image URL"
//                 value={item.image}
//                 onChange={(e) => updateMenuItem(selectedVariant as keyof Menu, index, 'image', e.target.value)}
//               />
//               {item.image && (
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-32 h-32 object-cover rounded"
//                 />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No items available for the selected menu variant.</p>
//         )}
//       </div>

//       {/* Preview Section */}
//       <div className="mt-4">
//         <h2 className="text-2xl font-bold mb-2">Preview:</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {menuData.menu[selectedVariant]?.map((item, index) => (
//             <div key={index} className="p-4 border rounded">
//               <h3 className="text-xl font-bold">{item.name}</h3>
//               <p className="text-sm">{item.description}</p>
//               <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
//               {item.image && (
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="mt-2 w-full h-40 object-cover rounded"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuEditor;
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page