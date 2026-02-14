import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useId, useRef } from "react";
import { UploadCloud, X } from "lucide-react";

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
  onDelete?: () => void;
  preview?: string;
  
}

const InputFile = (props: PropTypes) => {
  const {
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
    preview,
  } = props;

  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && onUpload) {
      onUpload(files);
    }
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
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div className="w-full">
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "hover:border-primary relative flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 transition hover:from-gray-100 hover:to-gray-200",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-4">
            <div className="relative h-40 w-40 overflow-hidden rounded-xl shadow-md ring-1 ring-gray-200">
              <Image
                fill
                src={preview}
                alt="Preview"
                className="object-cover"
              />
            </div>
            <Button
              isIconOnly
              onPress={onDelete}
              disabled={isDeleting}
              className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
            >
              {isDeleting ? (
                <Spinner size="sm" color="white" />
              ) : (
                <X size={16} />
              )}
            </Button>
          </div>
        )}

        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
            <UploadCloud className="mb-2 h-12 w-12 text-gray-400" />
            <p className="text-center text-sm font-medium">
              {isDropable
                ? "Drag & Drop or Click to Upload"
                : "Click to Upload"}
            </p>
            <span className="text-xs text-gray-400">
              PNG, JPG or JPEG • Max 5MB
            </span>
          </div>
        )}

        {isUploading && (
          <div className="flex flex-col items-center justify-center p-8">
            <Spinner size="lg" color="primary" />
            <p className="mt-2 text-xs text-gray-400">Uploading...</p>
          </div>
        )}

        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          disabled={!!preview}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>

      {isInvalid && (
        <p className="text-danger-500 mt-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
