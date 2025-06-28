"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { BiDish } from "react-icons/bi";
import { MenuItem, MenuCategory } from "@/types";
import ImageDropzone from "@/components/common/ImageDropzone";
import { IoClose } from "react-icons/io5";

interface Step3MenuItemsProps {
  formData: {
    menu: MenuCategory[];
  };
  handleAddItem: (categoryIndex: number) => void;
  handleRemoveItem: (categoryIndex: number, itemIndex: number) => void;
  handleItemChange: (
    categoryIndex: number,
    itemIndex: number,
    field: keyof MenuItem,
    value: string | number
  ) => void;
  imagePreviews: { [key: string]: string };
  setImagePreviews: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const Step3MenuItems: React.FC<Step3MenuItemsProps> = ({
  formData,
  handleAddItem,
  handleRemoveItem,
  handleItemChange,
  imagePreviews,
  setImagePreviews,
}) => {
  return (
    <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <BiDish className="text-indigo-600" size={30} />
        Add Menu Items
      </h2>
      {formData.menu.length === 0 ? (
        <p className="text-center text-gray-600">Please add categories in Step 2 first.</p>
      ) : (
        formData.menu.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="p-4 space-y-4 shadow-md bg-white">
            <h3 className="text-xl font-semibold text-gray-700">Category: {category.name || "Unnamed Category"}</h3>
            <Button
              type="button"
              onClick={() => handleAddItem(categoryIndex)}
              className="ml-auto"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Item to {category.name || "this Category"}
            </Button>

            {category.items.map((item, itemIndex) => (
              <Card key={itemIndex} className="p-4 space-y-3 border shadow-sm bg-white">
                <div className="flex justify-between items-center">
                  <h5 className="text-md font-semibold text-gray-600">Item {itemIndex + 1}</h5>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveItem(categoryIndex, itemIndex)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`item-name-${categoryIndex}-${itemIndex}`}>Item Name</Label>
                    <Input
                      id={`item-name-${categoryIndex}-${itemIndex}`}
                      type="text"
                      placeholder="e.g., Pancakes"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(categoryIndex, itemIndex, "name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`item-price-${categoryIndex}-${itemIndex}`}>Price</Label>
                    <Input
                      id={`item-price-${categoryIndex}-${itemIndex}`}
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={item.price || ""}
                      onChange={(e) =>
                        handleItemChange(
                          categoryIndex,
                          itemIndex,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-full">
                    <Label htmlFor={`item-description-${categoryIndex}-${itemIndex}`}>Description</Label>
                    <Textarea
                      id={`item-description-${categoryIndex}-${itemIndex}`}
                      placeholder="Describe the dish, ingredients, etc."
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(categoryIndex, itemIndex, "description", e.target.value)
                      }
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-full">
                    <Label htmlFor={`item-image-${categoryIndex}-${itemIndex}`}>Image</Label>
                    {(imagePreviews[`${categoryIndex}-${itemIndex}`] || item.image) ? (
                                  <div className="relative mt-2 w-48 h-48 rounded-md border overflow-hidden flex items-center justify-center bg-gray-100">
                                  <div
                                    className="absolute inset-0 bg-center bg-cover bg-no-repeat w-full h-full"
                                    style={{
                                      backgroundImage: `url('${imagePreviews[`${categoryIndex}-${itemIndex}`] || item.image}')`,
                                      objectFit: "cover",
                                    }}
                                  />
                                  <IoClose
                                    size={25}
                                    className="absolute top-0 right-0 z-10 bg-red-500 text-white rounded-full cursor-pointer"
                                    onClick={() => {
                                      setImagePreviews(prev => {
                                        const newPreviews = { ...prev };
                                        delete newPreviews[`${categoryIndex}-${itemIndex}`];
                                        return newPreviews;
                                      });
                                      handleItemChange(categoryIndex, itemIndex, "image", "");
                                    }}
                                  />
                                </div>
                    ):
                    <div className="cursor-pointer h-48">
                    <ImageDropzone
                    onUploadComplete={(url) => {
                      handleItemChange(categoryIndex, itemIndex, "image", url);
                      setImagePreviews(prev => ({ ...prev, [`${categoryIndex}-${itemIndex}`]: url }));
                    }}
                    onError={(error) => alert(`ERROR! ${error.message}`)}
                    maxDim={512}
                    maxSizeMB={1}
                  />
                  </div>
                  }
                  </div>
                </div>
              </Card>
            ))}
          </Card>
        ))
      )}
    </div>
  );
};

export default Step3MenuItems;
