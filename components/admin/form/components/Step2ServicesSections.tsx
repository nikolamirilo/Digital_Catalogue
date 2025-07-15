"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { MdRestaurant } from "react-icons/md";

import { ServicesCategory } from "@/types";
import { layouts } from "@/constants/client";

interface Step2ServicesSectionsProps {
  formData: {
    services: ServicesCategory[];
  };
  handleAddCategory: () => void;
  handleRemoveCategory: (index: number) => void;
  handleCategoryChange: (index: number, field: 'name' | 'layout', value: string) => void;
}


const Step2ServicesSections: React.FC<Step2ServicesSectionsProps> = ({
  formData,
  handleAddCategory,
  handleRemoveCategory,
  handleCategoryChange,
}) => {
  return (
     <Card className="space-y-6 p-6" type="form">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
      <MdRestaurant className="text-orange-600" size={30} />
        Services Categories
      </h2>
      <Button
        type="button"
        onClick={handleAddCategory}
        className="ml-auto"
      >
        <Plus className="h-4 w-4" /> Add New Category
      </Button>

      {formData.services.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="space-y-6 p-6" type="form">
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
              onChange={(e) => handleCategoryChange(categoryIndex, 'name', e.target.value)}
              required
            />
          </div>
          {/* Layout Selection for this category */}
          <div className="space-y-2">
            <Label htmlFor={`category-layout-${categoryIndex}`}>Layout: {layouts.find((l) => l.value === category.layout)?.label || "Not Selected"}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {layouts.map((layoutOption) => (
                <div
                  key={layoutOption.value}
                  className={`relative cursor-pointer rounded-lg border-2 p-1 ${
                    category.layout === layoutOption.value
                      ? "border-orange-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleCategoryChange(categoryIndex, 'layout', layoutOption.value)}
                >
                  <img
                    src={layoutOption.image}
                    alt={layoutOption.label}
                    className="w-full h-fit object-cover object-top rounded-md"
                  />
                  <p className="text-center text-sm mt-1">{layoutOption.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </Card>
  );
};

export default Step2ServicesSections;
