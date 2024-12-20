import Dashboard from "@/app/dashboard/page";
import AppMenu from "./AppMenu";
import { useAppContext } from "@/utils/AppContext";
import UserMgmt from "../users/UserPage";

function Outlet() {
  const { selectedMenu } = useAppContext();
  return (
    <div className="bg-background ml-2 lg:ml-0 flex flex-col shadow-2xl drop-shadow-xl backdrop-blur-xl border w-full rounded-md h-fit lg:h-full">
      <div className="pl-4 pt-2">
        <AppMenu />
      </div>

      {selectedMenu?.index === 0 && <div className="h-full">{<Dashboard />}</div>}
      {selectedMenu?.index === 1 && <div className="h-fit">{<UserMgmt />}</div>}
    </div>
  );
}

export default Outlet;
