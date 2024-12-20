/* eslint-disable @typescript-eslint/no-explicit-any */
"use client ";
import { useAddUser } from "@/app/hooks/userMgmHooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clientQuery from "@/database/database";
import { useToast } from "@/hooks/use-toast";
import {
  departmentType,
  designationType,
  genderEnum,
} from "@/types/userMgmtDataTypes";
import {
  DEPARTMENT,
  DEPARTMENT_ERROR,
  DESIGNATION,
  DESIGNATION_ERROR,
  EMAIL_ID_ERROR,
  EMAIL_ID_VALID_ERROR,
  FEMALE,
  FIRST_NAME_ERROR,
  GENDER,
  MALE,
  SUBMIT,
  USER_ALREADY_EXISTS_ERROR,
} from "@/utils/AppConstants";
import { useAppContext } from "@/utils/AppContext";
import AppSpinner from "@/utils/AppSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaBlackTie } from "react-icons/fa";
import { IoDesktopSharp } from "react-icons/io5";

interface EmployeeFormInterface {
  designations: designationType[];
  departments: departmentType[];
}

function EmployeeForm({ departments, designations }: EmployeeFormInterface) {
  const {
    formState,
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setValue,
    reset,
  } = useForm();

  const { isPending: isLoading, addUser } = useAddUser();

  const { errors } = formState;

  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const { toast } = useToast();
  const { dispatch } = useAppContext();

  function handleSubmitClick() {
    if (!watch("des")) {
      setError("des", {
        type: "manual",
        message: DESIGNATION_ERROR,
      });
    }

    if (!watch("dep")) {
      setError("dep", {
        type: "manual",
        message: DEPARTMENT_ERROR,
      });
    }
  }

  function handleGenderSelect(value: "male" | "female") {
    setValue("gender", value);
  }

  async function checkEmailId(emailId: string) {
    const findedUser =
      await clientQuery`SELECT "emailId" FROM public.users WHERE "emailId" = ${emailId} `;
    if (findedUser?.length > 0) {
      setError("emailid", {
        type: "manual",
        message: USER_ALREADY_EXISTS_ERROR,
      });
    }
    else{
      clearErrors("emailid")
    }
  }

  function handleEmailIdChange(event: any) {
    const value = event?.target?.value;
    const emailIDRegex = /^\S+@\S+\.\S+$/;

    if (!emailIDRegex.test(value)) {
      clearErrors("emailid");
      setTimeout(() => {
        setError("emailid", {
          type: "manual",
          message: EMAIL_ID_VALID_ERROR,
        });
      }, 0);
    } else {
      clearErrors("emailid");
      checkEmailId(value);
    }
  }

  function handleDesignationSelect(value: any) {
    const designation = value?.target?.value;
    setValue("des", designation);
    clearErrors("des");
    setDesignation(designation);
  }

  function handleDepartmentSelect(value: any) {
    const department = value?.target?.value;
    setValue("dep", department);
    clearErrors("dep");
    setDepartment(department);
  }

  function handleAddUser(e: any) {
    addUser(
      {
        department: e.dep,
        designation: e?.des,
        emailId: e?.emailid,
        firstName: e?.firstname,
        lastName: e?.lastname,
        gender:
          e?.gender === "male" || !e?.gender
            ? genderEnum?.MALE
            : genderEnum?.FEMALE,
      },
      {
        onSuccess(data) {
          if (data?.message === "SUCCESS") {
            toast({
              variant: "constructive",
              title: "SUCCESS",
              description: `User Added Successfully.`,
            });
            reset();
            setDepartment("");
            setDesignation("");
            dispatch({
              type: "setRefreshData",
              payload: "",
            });
          } else if (data?.message === "USER_ALREADY_EXISTS") {
            toast({
              variant: "destructive",
              title: "ERROR",
              description: `User already exists.`,
            });
            setDepartment("");
            setDesignation("");   
            reset();
          } else {
            toast({
              variant: "destructive",
              title: "ERROR",
              description: `Error occured while adding user!`,
            });
          }
        },
      }
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleAddUser)}
        className="gap-4 flex flex-col  "
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-12 w-full">
            <Input
              mandatory={true}
              about="First Name"
              icon="firstName"
              value={watch("firstname")?.replace(/[^a-zA-Z]+/g, "") ?? ""}
              {...register("firstname", {
                required: FIRST_NAME_ERROR,
                min: 3,
                onChange(event) {
                  if (/^[A-Z]+$/i.test(event?.target?.value)) {
                    watch("firstname", event?.target?.value);
                  }
                },
              })}
            />
            {errors?.firstname?.message && (
              <label className="text-destructive text-xs pl-3 relative -top-1">
                {errors?.firstname?.message as never}
              </label>
            )}
          </div>

          <div className="h-12 w-full">
            <Input
              about="Last Name"
              icon="lastName"
              value={watch("lastname") ?? ""}
              {...register("lastname", {
                required: false,
              })}
            />
            {errors?.lastname?.message && (
              <label className="text-destructive text-xs pl-3 relative -top-1">
                {errors?.lastname?.message as never}
              </label>
            )}
          </div>

          <div className="flex h-12 gap-3  w-full flex-col ">
            <div className="flex items-center gap-3">
              <div className="bg-muted px-3 rounded-md font-semibold h-10 flex items-center">
                {GENDER}
              </div>
              <div className="flex items-center gap-5">
                <RadioGroup
                  className="flex items-center"
                  defaultValue="male"
                  onValueChange={handleGenderSelect}
                >
                  <div className="flex items-center gap-1 text-xs lg:text-md">
                    <RadioGroupItem value="male" id="male" />
                    <label className="cursor-pointer" htmlFor="male">
                      {MALE}
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="female" id="female" />
                    <label className="cursor-pointer" htmlFor="female">
                      {FEMALE}
                    </label>
                  </div>
                </RadioGroup>
                <FaAsterisk className="w-2 h-2 text-destructive" />
              </div>
            </div>
          </div>
          <div className="flex h-12  gap-1 relative ">
            <div className="absolute left-2 top-3">
              <FaBlackTie className="w-4 h-4" />
            </div>
            <div className="w-full">
              <div className="w-full flex items-center gap-1">
                <select
                  onChange={handleDesignationSelect}
                  className="border h-10 w-full rounded-md px-2 pl-6"
                  value={designation}
                >
                  <option value={""} disabled hidden>
                    {DESIGNATION}
                  </option>
                  {designations?.map((item: designationType, index: number) => (
                    <option key={index} value={item?.desShortDesc}>
                      {item?.desLongDesc}
                    </option>
                  ))}
                </select>
                <FaAsterisk className="w-2 h-2 text-destructive" />
              </div>
              {errors?.des?.message && (
                <label className="text-destructive text-xs pl-3 relative -top-1">
                  {errors?.des?.message as never}
                </label>
              )}
            </div>
          </div>

          <div className="flex h-12  gap-1 relative ">
            <div className="absolute left-2 top-3">
              <IoDesktopSharp className="w-4 h-4" />
            </div>
            <div className="w-full">
              <div className="w-full flex items-center gap-1">
                <select
                  onChange={handleDepartmentSelect}
                  className="border h-10 w-full rounded-md px-2 pl-6"
                  value={department}
                >
                  <option value={""} disabled hidden>
                    {DEPARTMENT}
                  </option>
                  {departments?.map((item: departmentType, index: number) => (
                    <option key={index} value={item?.depShortDesc}>
                      {item?.depLongDesc}
                    </option>
                  ))}
                </select>
                <FaAsterisk className="w-2 h-2 text-destructive" />
              </div>
              {errors?.dep?.message && (
                <label className="text-destructive text-xs pl-3 relative -top-1">
                  {errors?.dep?.message as never}
                </label>
              )}
            </div>
          </div>

          <div className="h-12">
            <Input
              about="Email Id"
              icon="emailId"
              mandatory={true}
              value={watch("emailid") ?? ""}
              {...register("emailid", {
                required: EMAIL_ID_ERROR,
                pattern: /^\S+@\S+\.\S+$/,
                onChange(event) {
                  handleEmailIdChange(event);
                },
              })}
            />
            {errors?.emailid?.message && (
              <label className="text-destructive text-xs pl-3 relative -top-1">
                {errors?.emailid?.message as never}
              </label>
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <Button
            onClick={handleSubmitClick}
            type="submit"
            className="w-[20vw]"
          >
            {SUBMIT}
          </Button>
        </div>
      </form>
      {isLoading && <AppSpinner />}
    </div>
  );
}

export default EmployeeForm;
