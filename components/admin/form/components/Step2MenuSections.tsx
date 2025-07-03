"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { MdRestaurantMenu } from "react-icons/md";

import { MenuCategory } from "@/types";

interface Step2MenuSectionsProps {
  formData: {
    menu: MenuCategory[];
  };
  handleAddCategory: () => void;
  handleRemoveCategory: (index: number) => void;
  handleCategoryNameChange: (index: number, value: string) => void;
}

const Step2MenuSections: React.FC<Step2MenuSectionsProps> = ({
  formData,
  handleAddCategory,
  handleRemoveCategory,
  handleCategoryNameChange,
}) => {
  return (
    <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
      <MdRestaurantMenu className="text-orange-600" size={30} />
        Menu Categories
      </h2>
      <Button
        type="button"
        onClick={handleAddCategory}
        className="ml-auto"
      >
        <Plus className="mr-2 h-4 w-4" /> Add New Category
      </Button>

      {formData.menu.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="p-4 space-y-4 shadow-md bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Category {categoryIndex + 1}</h3>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveCategory(categoryIndex)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`category-name-${categoryIndex}`}>Category Name</Label>
            <Input
              id={`category-name-${categoryIndex}`}
              type="text"
              placeholder="e.g., Breakfast, Main Courses"
              value={category.name}
              onChange={(e) => handleCategoryNameChange(categoryIndex, e.target.value)}
              required
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Step2MenuSections;
