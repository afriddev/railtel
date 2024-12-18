"use client"
import * as React from "react";

import { cn } from "@/lib/utils";
import { MdEmail } from "react-icons/md";

interface InputInterface extends React.ComponentProps<"input"> {
  mandatory?: boolean;
  icon: string;
}

const Input = React.forwardRef<HTMLInputElement, InputInterface>(
  ({ className, type, icon, mandatory, ...props }, ref) => {
    const [clicked, setClicked] = React.useState<boolean>(false);
    const inputRef = React.useRef(null)

    function getIcon(): React.ReactNode {
      switch (icon) {
        case "emailId":
          return <MdEmail className="w-4 h-4" />;
      }
    }

    function handleInputClick() {
      setClicked(true);
      inputRef.current.focus();

    }

    function handleInputBlur() {
      setClicked(false);
    }

    return (
      <div
        className="relative"
        onBlur={handleInputBlur}
        onClick={handleInputClick}
      >
        <div className="absolute top-3 left-2">{getIcon()}</div>
        <div
          className={`absolute transition-all duration-300 ease-in-out  text-xs ${
            !clicked
              ? "left-8 top-3"
              : "-top-2 left-8 bg-background px-2  rounded-md"
          } `}
        >
          {props.about}
        </div>
        <input
          ref={inputRef}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pr-3 pl-7 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
