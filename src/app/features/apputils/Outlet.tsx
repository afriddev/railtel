import Dashboard from "@/app/dashboard/page";
import AppMenu from "./AppMenu";
import { useAppContext } from "@/utils/AppContext";
import UserMgmt from "../users/page";

function Outlet() {
  const { selectedMenu } = useAppContext();
  return (
    <div className="bg-background flex flex-col shadow-2xl drop-shadow-xl backdrop-blur-xl border w-full rounded-md ">
      <div className="pl-4 pt-2">
        <AppMenu />
      </div>

      {selectedMenu?.index === 0 && <div className="h-full">{<Dashboard />}</div>}
      {selectedMenu?.index === 1 && <div className="h-full">{<UserMgmt />}</div>}
    </div>
  );
}

export default Outlet;
