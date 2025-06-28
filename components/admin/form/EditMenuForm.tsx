"use client";
import type React from "react";
import { RestaurantFormData } from "@/types";
import MenuForm from "./components/MenuForm";

interface EditMenuFormProps {
  initialData: RestaurantFormData;
  onSuccess?: (restaurantUrl: string) => void;
}

const EditMenuForm: React.FC<EditMenuFormProps> = ({ initialData, onSuccess }) => {
  return <MenuForm type="edit" initialData={initialData} onSuccess={onSuccess} />;
};

export default EditMenuForm; 