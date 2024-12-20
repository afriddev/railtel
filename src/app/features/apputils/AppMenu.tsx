import { useAppContext } from "@/utils/AppContext";

function AppMenu() {
  const { selectedMenu } = useAppContext();
  return (
    <div className="flex lg:flex-row flex-col lg:items-center gap-3 w-full">
      <div className="lg:text-xl font-semibold text-nowrap text-xs ">{selectedMenu?.title}</div>
      <div className="lg:text-md text-xs">- {selectedMenu?.desc}</div>
    </div>
  );
}
export default AppMenu;
