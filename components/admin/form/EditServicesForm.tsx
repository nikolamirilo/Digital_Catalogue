"use client";
import type React from "react";
import { ServicesFormData } from "@/types";
import ServicesForm from "./components/ServicesForm";

interface EditServicesFormProps {
  initialData: ServicesFormData;
  onSuccess?: (restaurantUrl: string) => void;
}

const EditServicesForm: React.FC<EditServicesFormProps> = ({ initialData, onSuccess }) => {
  return <ServicesForm type="edit" initialData={initialData} onSuccess={onSuccess} />;
};

export default EditServicesForm; 