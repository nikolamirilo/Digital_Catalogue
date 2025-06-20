"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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

  useEffect(() => {
    setFullURL(`${window.location.origin}${restaurantUrl}`);
  }, [restaurantUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Menu Created Successfully!</DialogTitle>
          <DialogDescription>
            Your digital menu has been created and is ready to view.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>You can access your menu at:</p>
          <Link href={restaurantUrl} passHref>
            <Button variant="link" className="px-0">
              {fullURL}
            </Button>
          </Link>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
