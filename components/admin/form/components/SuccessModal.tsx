"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { IoMdOpen } from "react-icons/io";
import { QRCodeSVG } from "qrcode.react";
import { IoQrCode } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantUrl: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  restaurantUrl,
}) => {
  const [fullURL, setFullURL] = useState("");
  const router = useRouter();
  const codeRef = useRef<HTMLDivElement>(null);
  const iframeCode = `<iframe src="${fullURL}" style="width:100vw;height:100vh;border:none;position:fixed;top:0;left:0;z-index:9999;background:#fff;"></iframe>`;
  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(iframeCode);
    if (codeRef.current) {
      codeRef.current.classList.add("ring-2", "ring-green-400");
      setTimeout(() => codeRef.current?.classList.remove("ring-2", "ring-green-400"), 1000);
    }
  };
  const handleDownloadPng = () => {
    const svg = document.querySelector("#success-modal-qr svg");
    if (!svg) {
      console.error('QR SVG not found!');
      return;
    }
    // Clone the SVG node to avoid React/DOM issues
    const clone = svg.cloneNode(true) as SVGSVGElement;
    // Set width/height attributes for clarity
    clone.setAttribute("width", "512");
    clone.setAttribute("height", "512");
    // Serialize the SVG
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(clone);
    // Create a Blob from the SVG
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new window.Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx!.fillStyle = "#fff";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create PNG blob from canvas!');
          return;
        }
        const url2 = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const restaurantName = restaurantUrl.split("/")[2];
        a.download = `${restaurantName}.png`;
        a.href = url2;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url2);
        URL.revokeObjectURL(url);
      }, "image/png");
    };
    img.onerror = function () {
      console.error('Failed to load SVG as image!');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };
  useEffect(() => {
    setFullURL(`${window.location.origin}${restaurantUrl}`);
  }, [restaurantUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] w-full !p-6 bg-product-background">
        <DialogHeader className="flex flex-col">
          <div className="flex flex-row gap-1 items-center justify-left">
          <DialogTitle className="text-product-foreground">Digital Menu Created Successfully!</DialogTitle>
          <FaCheckCircle size={25} color="green" />
          </div>
          <DialogDescription className="text-product-foreground">
            Your digital menu has been created and is ready to view.
          </DialogDescription>
        </DialogHeader>
        {/* QR Code Section */}
        <div className="flex flex-col items-start gap-2 w-full">
          <h4 className="font-semibold mb-2 text-product-foreground">Add QR code as your menu</h4>
          <div id="success-modal-qr">
            <QRCodeSVG value={fullURL} size={180} bgColor="#fff" fgColor="#000" />
          </div>
          <div className="flex flex-row mt-1 w-full">
            <Button className="flex gap-1" onClick={handleDownloadPng}>
              <IoQrCode size={22}/> Download QR code
            </Button>
          </div>
        </div>
        {/* Embeddable Iframe Section */}
        <div className="text-product-foreground w-full mt-2">
          <h4 className="font-semibold mb-2">Embed in your website</h4>
          <div
            ref={codeRef}
            className="bg-[#1e1e1e] rounded-lg p-4 text-xs overflow-x-auto font-[Fira_Mono,JetBrains_Mono,Source_Code_Pro,monospace] border border-[#333] shadow-inner mb-2 transition-all duration-200"
            style={{ fontFamily: 'Fira Mono, JetBrains Mono, Source Code Pro, monospace', color: '#d4d4d4', lineHeight: '1.6', minWidth: 0 }}
          >
            <pre className="whitespace-pre-wrap break-all m-0" style={{ background: 'none', padding: 0, margin: 0 }}>{iframeCode}</pre>
          </div>
          <div className="flex flex-row gap-2 w-full">
            <Button
              onClick={handleCopyCode}
              className="flex gap-1 items-center justify-center"
            >
              <MdContentCopy  size={25}/> Copy code
            </Button>
            <Button
              onClick={() => {
                const html = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Embedded Menu</title>\n  <style>\n    html, body { margin: 0; padding: 0; height: 100%; width: 100%; background: #fff; }\n    iframe { width: 100vw; height: 100vh; border: none; position: fixed; top: 0; left: 0; z-index: 9999; background: #fff; }\n  </style>\n</head>\n<body>\n  <iframe src=\"${fullURL}\"></iframe>\n</body>\n</html>`;
                const blob = new Blob([html], { type: "text/html" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                const restaurantName = restaurantUrl.split("/")[2];
                a.download = `${restaurantName}.html`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              variant="outline"
              className="flex gap-1 items-center justify-center"
            >
              <FaCode size={25}/> Download full HTML code
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="flex gap-1"
            onClick={() => {
              window.open(fullURL, '_blank');
            }}
          >
            <IoMdOpen size={25} /> View
          </Button>
          <Button onClick={onClose} variant="destructive">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
