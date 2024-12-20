"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import EmployeeForm from "./usermgmtutils/EmployeesForm";
import DesignationAndDepartmentForm from "./usermgmtutils/DesignationAndDepartmentForm";
import UserTable from "./usertable/UserTable";
import { useEffect, useState } from "react";
import {
  departmentType,
  designationType,
  userType,
} from "@/types/userMgmtDataTypes";

import AppSpinner from "@/utils/AppSpinner";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/utils/AppContext";
import { useGetDesignatinsAndDepartments, useGetUsers } from "@/app/hooks/userMgmHooks";




function UserMgmt() {
  const { isPending, getDesignationsAndDepartments } =
    useGetDesignatinsAndDepartments();

  const [designations, setDesignations] = useState<
    undefined | designationType[]
  >(undefined);
  const [departments, setDepartments] = useState<undefined | departmentType[]>(
    undefined
  );
  const { getUsers, isPending: isLoading } = useGetUsers();
  const [users, setUsers] = useState<undefined | userType[]>(undefined);
  const { toast } = useToast();
  const { refreshData } = useAppContext();

  useEffect(() => {
    getData();
  }, [refreshData]);

  function getData() {
    if (!designations || !departments) {
      getDesignationsAndDepartments(undefined, {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            setDesignations(data?.data?.designations ?? []);
            setDepartments(data?.data?.departmemts ?? []);
          }
        },
      });
    }

    getUsers(undefined, {
      onSuccess(data) {
        if (data?.message === "SUCCESS") {
          setUsers(data?.data);
        } else {
          toast({
            variant: "destructive",
            title: "ERROR",
            description: "Something went wrong!",
          });
        }
      },
      onError() {
        toast({
          variant: "destructive",
          title: "ERROR",
          description: "Something went wrong!",
        });
      },
    });
  }


  return (

    <div className="w-full h-full flex ">
      <main className="py-4 px-2 w-full flex  flex-col  gap-6">
        <div className="w-full border p-2 rounded-md border-foreground">
          <Tabs className="w-full gap-1 flex  flex-col" defaultValue="employee">
            <TabsList className="w-full gap-2 border border-foreground/20">
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
            <TabsContent
              value="employee"
              className="p-3 border rounded-md mt-3"
            >
              <EmployeeForm
                departments={departments as never}
                designations={designations as never}
              />
            </TabsContent>

            <TabsContent
              value="designation"
              className="p-3 border rounded-md mt-3"
            >
              <DesignationAndDepartmentForm method="DES" />
            </TabsContent>
            <TabsContent
              value="department"
              className="p-3 border rounded-md mt-3"
            >
              <DesignationAndDepartmentForm method="DEP" />
            </TabsContent>
            <TabsContent value="reset" className="p-3 border rounded-md mt-3">
              Hello world
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <UserTable users={users as never} />
        </div>
      </main>
      {(isPending || isLoading) && <AppSpinner />}
    </div> 
  );
}
export default UserMgmt;
