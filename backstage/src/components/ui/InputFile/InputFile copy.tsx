"use client";

import { cn } from "@/utils/cn";
import { UploadCloud, X } from "lucide-react";
import { useState, DragEvent, ChangeEvent, useEffect } from "react";
import Image from "next/image";

interface PropsTypes {
  name: string;
  className?: string;
  onFileSelect?: (file: File) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  previews?: string;
  isUploading?: boolean;
  isDeleting?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const InputFile = ({
  name,
  className,
  onFileSelect,
  onChange,
  isInvalid,
  errorMessage,
  onUpload,
  onDelete,
  isUploading,
  isDeleting,
  previews,
}: PropsTypes) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Cleanup object URL saat komponen unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const truncateFileName = (filename: string, maxLength = 20) => {
    if (filename.length <= maxLength) return filename;
    const ext = filename.split(".").pop();
    return (
      filename.slice(0, maxLength - (ext?.length ?? 0) - 3) + "... ." + ext
    );
  };

  const handleFileChange = (file?: File, e?: ChangeEvent<HTMLInputElement>) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFileName(file.name);
      onFileSelect?.(file);
    }
    // Panggil juga onChange dari props (untuk react-hook-form)
    if (onChange && e) {
      onChange(e);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={`dropzone-${name}`}
        className={cn(
          "flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:bg-gray-100",
          isDragging && "border-blue-500 bg-blue-50",
          isInvalid && "border-red-500 bg-red-50",
          className,
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative flex flex-col items-center">
            <Image
              src={preview}
              alt="Preview"
              width={112}
              height={112}
              className="rounded-lg object-cover shadow"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (preview) URL.revokeObjectURL(preview);
                setPreview(null);
                setFileName("");
              }}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
            <p className="mt-2 max-w-[200px] truncate text-xs text-gray-500">
              {truncateFileName(fileName)}
            </p>
          </div>
        ) : (
          <>
            <UploadCloud className="mb-2 h-8 w-8 text-gray-500" />
            <p className="text-sm text-gray-500">
              <span className="font-medium text-blue-600">
                Klik untuk upload
              </span>{" "}
              atau seret file ke sini
            </p>
          </>
        )}

        <input
          type="file"
          id={`dropzone-${name}`}
          name={name}
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0], e)}
        />
      </label>
      {isInvalid && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
