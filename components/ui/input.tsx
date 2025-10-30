import * as React from "react";
import { Images } from "lucide-react";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-8 w-full min-w-0 rounded-md border bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-6 py-1 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

function FileDropInput() {
  const BrowseButton = () => {
    return (
      <span className="inline-flex">
        <Label htmlFor="file" className="hover:cursor-pointer underline">
          Browse
        </Label>
        <Input
          id="file"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
        />
      </span>
    );
  };

  return (
    <div className="h-full w-full flex flex-col justify-between items-center  rounded-md border-2 border-dashed border-accent p-5">
      <div className="flex items-center h-full">
        <div className="flex items-center space-x-2">
          <Images />
          <p>
            Drag & drop images/folder or <BrowseButton />
          </p>
        </div>
      </div>
    </div>
  );
}
export { Input, FileDropInput };
