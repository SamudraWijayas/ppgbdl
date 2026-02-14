import { cn } from "@/utils/cn";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useId, useRef } from "react";
import { Upload, Trash2, Loader2 } from "lucide-react";

interface PropTypes {
  className?: string;
  errorMessage?: string;
  isDeleting?: boolean;
  isDropable?: boolean;
  isInvalid?: boolean;
  isUploading?: boolean;
  label?: ReactNode;
  name: string;
  onUpload?: (files: FileList) => void;
  onDelete?: (url: string) => void;
  preview?: string[];
}

const InputMultipleFile = ({
  className,
  errorMessage,
  isDropable = false,
  isInvalid,
  isUploading,
  isDeleting,
  label,
  name,
  onUpload,
  onDelete,
  preview = [],
}: PropTypes) => {
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  // 🧲 Handle drag-drop
  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && onUpload) onUpload(files);
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);
      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, [handleDragOver, handleDrop]);

  // 📤 Handle manual file input
  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) onUpload(files);
  };

  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE

  return (
    <div className="w-full">
      {label && <label className="block font-medium mb-1">{label}</label>}

      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors duration-200",
          className,
          { "border-red-500": isInvalid },
        )}
      >
        {/* 🖼️ Preview Section */}
        {preview.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 w-full">
            {preview.map((url) => (
              <div
                key={url}
                className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={`${BASE_URL}${url}`}
                  alt="preview"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => onDelete && onDelete(url)}
                  disabled={isDeleting}
                  type="button"
                  className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-colors p-2"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : !isUploading ? (
          // 📤 Upload prompt
          <div className="flex flex-col items-center justify-center py-6 px-3 text-gray-500">
            <Upload className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-medium">
              {isDropable
                ? "Drag & drop or click to upload multiple images"
                : "Click to upload multiple images"}
            </p>
          </div>
        ) : (
          // ⏳ Upload Spinner
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-gray-500">Uploading...</p>
          </div>
        )}

        {/* Hidden Input */}
        <input
          name={name}
          type="file"
          multiple
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          onClick={(e) => {
            // reset input biar bisa upload file sama berulang kali
            e.currentTarget.value = "";
          }}
        />
      </label>

      {/* 🚨 Error Message */}
      {isInvalid && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default InputMultipleFile;
