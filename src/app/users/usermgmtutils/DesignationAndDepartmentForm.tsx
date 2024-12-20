"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddDesignationAndDepartment } from "@/app/hooks/userMgmHooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  DEPARTMENT_LONG_ERROR,
  DEPARTMENT_SHORT_ERROR,
  DESIGNATION_LONG_ERROR,
  DESIGNATION_SHORT_ERROR,
  SUBMIT,
} from "@/utils/AppConstants";
import AppSpinner from "@/utils/AppSpinner";
import { useForm } from "react-hook-form";

interface DesignationAndDepartmentInterface {
  method: "DES" | "DEP";
}

function DesignationAndDepartmentForm({
  method,
}: DesignationAndDepartmentInterface) {
  const { formState, register, handleSubmit, watch, reset } = useForm();
  const { errors } = formState;
  const { toast } = useToast();

  const { addDesignation, isPending } = useAddDesignationAndDepartment();
  function handleSubmitClick(e: any) {
    addDesignation(
      {
        longDesc: method === "DES" ? e.desLongDesc : e.depLongDesc,
        shortDesc: method === "DES" ? e.desShortDesc : e.depShortDesc,
        method: method,
      },
      {
        onSuccess(data) {
          console.log(data);
          if (data?.message === "SUCCESS") {
            toast({
              variant: "constructive",
              title: "SUCCESS",
              description: `${
                method === "DES" ? "Designation" : "Department"
              } added Successfully.`,
            });
            reset();
          } else if (data?.message === "ALREADY_EXISTS") {
            toast({
              variant: "destructive",
              title: "ERROR",
              description: `${
                method === "DES" ? "Designation" : "Department"
              } already exists`,
            });
            reset();
          } else {
            toast({
              variant: "destructive",
              title: "ERROR",
              description: `${
                method === "DES" ? "Designation" : "Department"
              } added Failed.`,
            });
          }
        },
      }
    );
  }

  return (
    <div>
      <form
        className="flex flex-col items-center justify-center gap-6"
        onSubmit={handleSubmit(handleSubmitClick)}
      >
        <div className="flex gap-20 w-full">
          <div className="h-12 w-full">
            <Input
              mandatory={true}
              about={`${
                method === "DES" ? "Designation" : "Department"
              } Short Disc`}
              icon="firstName"
              value={
                watch(method === "DES" ? "desShortDesc" : "depShortDesc") ?? ""
              }
              {...register(method === "DES" ? "desShortDesc" : "depShortDesc", {
                required:
                  method === "DES"
                    ? DESIGNATION_SHORT_ERROR
                    : DEPARTMENT_SHORT_ERROR,
                min: 3,
                onChange(event) {
                  if (/^[A-Z]+$/i.test(event?.target?.value)) {
                    watch("desShortDesc", event?.target?.value);
                  }
                },
              })}
            />
            {errors[method === "DES" ? "desShortDesc" : "depShortDesc"]
              ?.message && (
              <label className="text-destructive text-xs pl-3 relative -top-1">
                {
                  errors[method === "DES" ? "desShortDesc" : "depShortDesc"]
                    ?.message as never
                }
              </label>
            )}
          </div>
          <div className="h-12 w-full">
            <Input
              mandatory={true}
              about={`${
                method === "DES" ? "Designation" : "Department"
              }  Long Disc`}
              icon="lastName"
              value={
                watch(method === "DES" ? "desLongDesc" : "depLongDesc") ?? ""
              }
              {...register(method === "DES" ? "desLongDesc" : "depLongDesc", {
                required:
                  method === "DES"
                    ? DESIGNATION_LONG_ERROR
                    : DEPARTMENT_LONG_ERROR,
                min: 3,
                onChange(event) {
                  if (/^[A-Z]+$/i.test(event?.target?.value)) {
                    watch("desLongDesc", event?.target?.value);
                  }
                },
              })}
            />
            {errors?.[method === "DES" ? "desLongDesc" : "depLongDesc"]
              ?.message && (
              <label className="text-destructive text-xs pl-3 relative -top-1">
                {
                  errors?.[method === "DES" ? "desLongDesc" : "depLongDesc"]
                    ?.message as never
                }
              </label>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center  ">
          <Button className="w-[20vw]">{SUBMIT}</Button>
        </div>
      </form>
      {isPending && <AppSpinner />}
    </div>
  );
}

export default DesignationAndDepartmentForm;
