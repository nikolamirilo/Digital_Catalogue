'use client';

import React, { useState } from 'react';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

interface RestaurantFormData {
  name: string;
  theme?: string;
  logo?: string;
  layout?: string;
  title?: string;
  currency?: string;
  legal_name?: string;
  contact?: any; // You might want to define a more specific type for contact
  subtitle?: string;
  menu: MenuCategory[];
}

const CreateMenuForm: React.FC = () => {
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: '',
    theme: '',
    logo: '',
    layout: '',
    title: '',
    currency: '',
    legal_name: '',
    contact: '', // Initialize as empty string, will need parsing
    subtitle: '',
    menu: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCategory = () => {
    setFormData({ ...formData, menu: [...formData.menu, { name: '', items: [] }] });
  };

  const handleCategoryNameChange = (index: number, value: string) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[index].name = value;
    setFormData({ ...formData, menu: updatedMenu });
  };

  const handleAddItem = (categoryIndex: number) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[categoryIndex].items.push({ name: '', description: '', price: 0, image: '' });
    setFormData({ ...formData, menu: updatedMenu });
  };

  const handleItemChange = (categoryIndex: number, itemIndex: number, field: keyof MenuItem, value: string | number) => {
    const updatedMenu = [...formData.menu];
    // @ts-ignore
    updatedMenu[categoryIndex].items[itemIndex][field] = value;
    setFormData({ ...formData, menu: updatedMenu });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    try {
      // Assuming you have a way to get the created_by user ID, maybe from auth context
      // For now, using a placeholder UUID
      const created_by_placeholder = '550e8400-e29b-41d4-a716-446655440000'; // Replace with actual user ID logic

      // Parse contact if it's meant to be JSONB
      let contactData = formData.contact;
      try {
        contactData = JSON.parse(formData.contact);
      } catch (error) {
        console.error('Failed to parse contact JSON:', error);
        alert('Invalid Contact JSON format.');
        return; // Prevent submission if JSON is invalid
      }

      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, created_by: created_by_placeholder, contact: contactData }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Menu created successfully:', result);
        alert('Menu created successfully!');
        // Optionally reset the form or redirect
      } else {
        const errorData = await response.json();
        console.error('Failed to create menu:', errorData);
        alert(`Failed to create menu: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Restaurant Details */}
      <div className="border p-4 rounded-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Restaurant Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-2 border rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
            <input
              type="text"
              name="theme"
              id="theme"
              value={formData.theme}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input
              type="text"
              name="logo"
              id="logo"
              value={formData.logo}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="layout" className="block text-sm font-medium text-gray-700">Layout</label>
            <input
              type="text"
              name="layout"
              id="layout"
              value={formData.layout}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
            <input
              type="text"
              name="currency"
              id="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="legal_name" className="block text-sm font-medium text-gray-700">Legal Name</label>
            <input
              type="text"
              name="legal_name"
              id="legal_name"
              value={formData.legal_name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md text-gray-800"
            />
          </div>
           <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact (JSON format)</label>
            <textarea
              name="contact"
              id="contact"
              value={formData.contact}
              onChange={handleInputChange}
               className="mt-1 block w-full p-2 border rounded-md text-gray-800"
               rows={3}
            />
          </div>
           <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
            <textarea
              name="subtitle"
              id="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
               className="mt-1 block w-full p-2 border rounded-md text-gray-800"
               rows={3}
            />
          </div>
        </div>
      </div>

      {/* Menu Structure */}
      <div className="border p-4 rounded-md space-y-4">
        <h2 className="text-2xl font-bold mb-4">Menu Structure</h2>
         <button type="button" onClick={handleAddCategory} className="mb-4 bg-green-500 text-white px-4 py-2 rounded-md">Add Category</button>
        {formData.menu.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border p-4 mb-4 rounded-md space-y-4">
            <label htmlFor={`category-name-${categoryIndex}`} className="block text-sm font-medium text-gray-700 sr-only">Category Name</label>
            <input
              type="text"
              placeholder="Category Name"
              id={`category-name-${categoryIndex}`}
              value={category.name}
              onChange={(e) => handleCategoryNameChange(categoryIndex, e.target.value)}
              className="block w-full p-2 border rounded-md text-gray-800"
            />
            <button type="button" onClick={() => handleAddItem(categoryIndex)} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">Add Item</button>
            
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="border p-4 mb-2 rounded-md space-y-2">
                <h3 className="text-xl font-semibold">Item {itemIndex + 1}</h3>
                <label htmlFor={`item-name-${categoryIndex}-${itemIndex}`} className="block text-sm font-medium text-gray-700 sr-only">Item Name</label>
                <input
                  type="text"
                  placeholder="Item Name"
                  id={`item-name-${categoryIndex}-${itemIndex}`}
                  value={item.name}
                  onChange={(e) => handleItemChange(categoryIndex, itemIndex, 'name', e.target.value)}
                  className="block w-full p-2 border rounded-md text-gray-800"
                />
                 <label htmlFor={`item-description-${categoryIndex}-${itemIndex}`} className="block text-sm font-medium text-gray-700 sr-only">Description</label>
                <textarea
                  placeholder="Description"
                  id={`item-description-${categoryIndex}-${itemIndex}`}
                  value={item.description}
                  onChange={(e) => handleItemChange(categoryIndex, itemIndex, 'description', e.target.value)}
                  className="block w-full p-2 border rounded-md text-gray-800"
                />
                 <label htmlFor={`item-price-${categoryIndex}-${itemIndex}`} className="block text-sm font-medium text-gray-700 sr-only">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                   id={`item-price-${categoryIndex}-${itemIndex}`}
                  value={item.price}
                  onChange={(e) => handleItemChange(categoryIndex, itemIndex, 'price', parseFloat(e.target.value))}
                  className="block w-full p-2 border rounded-md text-gray-800"
                />
                 <label htmlFor={`item-image-${categoryIndex}-${itemIndex}`} className="block text-sm font-medium text-gray-700 sr-only">Image URL</label>
                 <input
                  type="text"
                  placeholder="Image URL"
                   id={`item-image-${categoryIndex}-${itemIndex}`}
                  value={item.image}
                  onChange={(e) => handleItemChange(categoryIndex, itemIndex, 'image', e.target.value)}
                  className="block w-full p-2 border rounded-md text-gray-800"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Create Menu</button>
    </form>
  );
};

export default CreateMenuForm; 