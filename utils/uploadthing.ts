import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/menu/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>({
  url: "/api/menu/uploadthing",
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
  url: "/api/menu/uploadthing",
});
