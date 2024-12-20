"use client";
import { DASHBOARD, USER_MANAGEMENT } from "@/utils/AppConstants";
import { useAppContext } from "@/utils/AppContext";
import { FaUserCog } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";

function AppSidebar() {
  const { selectedMenu, dispatch, menuOpen } = useAppContext();
  function handleMenuItemClick(index: number, title: string, desc: string) {
    dispatch({
      type: "setSelectedMenu",
      payload: {
        index,
        title,
        desc,
      },
    });
    dispatch({
      type:"setMenuOpen",
      payload:""
    })
  }

  return (
    <div
      className={`lg:w-[20vw] text-background py-10 px-6  flex flex-col gap-3 bg-blue-800 rounded-tr-[10vw] 
        ${menuOpen?"flex fixed lg:relative z-[999] lg:z-[100]  h-full max-h-[89vh] lg:max-h-[91vh] w-[90vw]":"hidden lg:flex"}
        
        `}
    >
      <div
        onClick={() =>
          handleMenuItemClick(
            0,
            "Dashboard",
            "Railtel Dashboard change modify users and more..."
          )
        }
        className={`text-xl flex px-1 w-fit ${
          selectedMenu?.index === 0
            ? "text-background"
            : "text-background/70  hover:text-background"
        }  items-center gap-2 cursor-pointer`}
      >
        <LuLayoutDashboard className="w-5 h-5" />
        {DASHBOARD}
      </div>

      <div
        onClick={() =>
          handleMenuItemClick(
            1,
            "User Management",
            "modify users,create,delete and reports and mre..."
          )
        }
        className={`text-xl flex px-1 w-fit ${
          selectedMenu?.index === 1
            ? "text-background"
            : "text-background/70  hover:text-background"
        }  items-center gap-2 cursor-pointer`}
      >
        <FaUserCog className="w-5 h-5" />
        {USER_MANAGEMENT}
      </div>
    </div>
  );
}
export default AppSidebar;
