import { useAppContext } from "@/utils/AppContext";

function AppMenu() {
  const { selectedMenu } = useAppContext();
  return (
    <div className="flex items-center gap-3">
      <div className="text-xl ">{selectedMenu?.title}</div>
      <div className="text-md">- {selectedMenu?.desc}</div>
    </div>
  );
}
export default AppMenu;
