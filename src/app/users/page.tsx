import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import EmployeeForm from "./usermgmtutils/EmployeesForm";

function UserMgmt() {
  return (
    <div className="w-full h-full flex ">
      <main className="py-4 px-2 w-full">
        <div className="w-full">
          <Tabs className="w-full gap-1 flex  flex-col" defaultValue="employee">
            <TabsList className="w-full gap-2">
              <TabsTrigger value="employee" className="w-full">
                Employees
              </TabsTrigger>
              <TabsTrigger value="designation" className="w-full">
                Designation master
              </TabsTrigger>
              <TabsTrigger value="department" className="w-full">
                Department master
              </TabsTrigger>
              <TabsTrigger value="reset" className="w-full">
                Reset
              </TabsTrigger>
            </TabsList>
            <TabsContent value="employee" className="p-3 border rounded-md">
              <EmployeeForm />
            </TabsContent>

            <TabsContent value="designation" className="p-3 border rounded-md">
              Hello world
            </TabsContent>
            <TabsContent value="department" className="p-3 border rounded-md">
              Hello world
            </TabsContent>
            <TabsContent value="reset" className="p-3 border rounded-md">
              Hello world
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
export default UserMgmt;
