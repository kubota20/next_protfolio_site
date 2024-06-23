import { useState, useEffect } from "react";
import Image from "next/image";

import { ImagePlus, Trash } from "lucide-react";

import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onRemove: (value: string) => void;
  onUploadSuccess: (url: string) => void;
  value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onUploadSuccess,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={(result) => {
          if (typeof result.info === "object" && "secure_url" in result.info) {
            onUploadSuccess(result.info.secure_url);
          }
          // Error
          // onUploadSuccess(result?.info);  undefinedの型をstringを入れられない
        }}
        signatureEndpoint="/api/admin/sign-cloudinary-params"
        options={{
          // アップロードする画像は 1 枚だけなのでアップロードが完了するとアップロード ウィジェットが閉じる
          singleUploadAutoClose: true,
        }}
        uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRSET}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              画像アップロード
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};
