"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    // Cas des uploads multiples
    if (result?.event === "success") {
      if (Array.isArray(result.info)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result.info.forEach((file: any) => {
          onChange(file.secure_url);
        });
      } 
      // Cas d'un upload unique
      else if (result.info?.secure_url) {
        onChange(result.info.secure_url);
      }
      
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                disabled={disabled}
                variant={"destructive"}
                size={"icon"}
                type="button"
                onClick={() => onRemove(url)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Image
              // unoptimized
              fill
              className="object-cover"
              alt="image"
              src={url}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1920px"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset="pgdxnbjl"
        options={{
          multiple: true,
          maxFiles: 10,
          sources: ["local"],
          clientAllowedFormats: ["png", "jpg", "jpeg"]
        }}
      >
        {({ open }) => (
          <Button 
            type="button" 
            disabled={disabled}
            variant="secondary" 
            onClick={() => open()}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Ajouter des images
          </Button>
        )}
      </CldUploadWidget>

    </div>
  );
};

export default ImageUpload;
