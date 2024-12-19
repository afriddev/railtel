"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EDIT_PROFILE, LOGOUT, NAME } from "@/utils/AppConstants";
import { LuUserRound } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

function AppNavBar() {
  return (
    <div className="w-full h-fit py- px-10 flex justify-between items-center">
      <div className="cursor-pointer">
        <img src="logo.png" className="w-[5vw]" />
      </div>
      <div className="text-2xl font-semibold">{NAME}</div>
      <div>
        <Popover>
          <PopoverTrigger>
            <div>
              <LuUserRound className="w-10 cursor-pointer h-10 border p-2 rounded-full " />{" "}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[10vw] h-[20vh] mr-2 mt-3 p-2">
            <div className="flex flex-col gap-2">
              <div className=" cursor-pointer border rounded-md flex items-center gap-3 px-3">
                <FaUserEdit className="w-4 h-4" />
                {EDIT_PROFILE}
              </div>
              
              <div className=" cursor-pointer border rounded-md flex items-center gap-3 px-3 bg-destructive text-background">
                <AiOutlineLogout className="w-4 h-4" />
                {LOGOUT}
              </div>

            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
export default AppNavBar;
