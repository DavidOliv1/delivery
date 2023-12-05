"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { IoMdAlert } from "react-icons/io";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

type ImageUploadProps = {
  onChange: (value: string) => void;
  value: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
};

const ImageUpload = ({ onChange, value, error }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="s7hofn6m"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <>
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Clique para enviar</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
          {error && (
            <div className="absolute z-10 top-full flex flex-row items-center text-xs p-1 mt-2 text-rose-500 gap-1">
              <IoMdAlert size={15} />
              {`${error?.message}`}
            </div>
          )}
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
