/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { MdEmail } from "react-icons/md";

import { FaUserPen } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaBlackTie } from "react-icons/fa";
import { IoDesktopSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";

import { FaAsterisk } from "react-icons/fa";

interface InputInterface extends React.ComponentProps<"input"> {
  mandatory?: boolean;
  icon: string;
}

const Input = React.forwardRef<HTMLInputElement, InputInterface>(
  ({ className, type, icon, mandatory, ...props }, ref) => {

    function getIcon(): React.ReactNode {
      switch (icon) {
        case "emailId":
          return <MdEmail className="w-4 h-4" />;

        case "firstName":
          return <FaUserPen className="w-4 h-4" />;

        case "lastName":
          return <FaUserPlus className="w-4 h-4" />;

        case "des":
          return <FaBlackTie className="w-4 h-4" />;

        case "dep":
          return <IoDesktopSharp className="w-4 h-4" />;

        case "pass":
          return <FaLock className="w-4 h-4" />;
      }
    }

    
    return (
      <div
        className="relative flex items-center gap-1"
        >
        <div className="absolute top-3 left-2">{getIcon()}</div>

        <input 
          ref={ref}
          type={type}
          placeholder={props?.about}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pr-3 pl-7 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          {...props}
        />
        <div className="w-2">{mandatory && <FaAsterisk className="w-2 h-2 text-destructive" />}</div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
