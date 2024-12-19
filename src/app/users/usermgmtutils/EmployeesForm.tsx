/* eslint-disable @typescript-eslint/no-explicit-any */
"use client ";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DEPARTMENT_ERROR,
  DESIGNATION_ERROR,
  FEMALE,
  FIRST_NAME_ERROR,
  GENDER,
  GENDER_ERROR,
  MALE,
  PASSWORD_ERROR,
  SUBMIT,
} from "@/utils/AppConstants";
import { useForm } from "react-hook-form";
import { FaAsterisk, FaBlackTie } from "react-icons/fa";
import { IoDesktopSharp } from "react-icons/io5";

function EmployeeForm() {
  const {
    formState,
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setValue,
  } = useForm();

  // {
  //   defaultValues:{
  //     // "gender":"male"
  //   }
  // }

  const { errors } = formState;

  function handleSubmitClick() {
    if (!watch("gender")) {
      setError("gender", {
        type: "manual",
        message: GENDER_ERROR,
      });
    }

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
    clearErrors("gender");
    setValue("gender", value);
  }

  function handlePasswordChange(event: any) {
    const value = event?.target?.value;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!passwordRegex.test(value)) {
      clearErrors("password");
      setTimeout(() => {
        setError("password", {
          type: "manual",
          message: PASSWORD_ERROR,
        });
      }, 0);
    } else {
      clearErrors("password");
    }
  }

  function handleDesignationSelect(value: any) {
    setValue("des", value?.target?.value);
    clearErrors("des");
  }

  function handleDepartmentSelect(value: any) {
    setValue("dep", value?.target?.value);
    clearErrors("dep");
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit((e) => {
          console.log(e);
        })}
        className="gap-4 flex flex-col  "
      >
        <div className="grid grid-cols-3 gap-6">
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
                  <div className="flex items-center gap-1">
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
            {errors?.gender?.message && (
              <label className="text-destructive text-xs pl-3 relative -top-2">
                {errors?.gender?.message as never}
              </label>
            )}
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
                  value={""}
                >
                  <option disabled hidden>
                    Designation
                  </option>
                  <option value={"1"}>Designation </option>
                  <option value={"2"}>Designation </option>
                  <option value={"3"}>Designation </option>
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
                  value={""}
                >
                  <option disabled hidden>
                    Department
                  </option>
                  <option value={"1"}>Department 1 </option>
                  <option value={"2"}>Department 2 </option>
                  <option value={"3"}>Department 3 </option>
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
              about="Password"
              icon="pass"
              type="password"
              mandatory={true}
              value={watch("password") ?? ""}
              {...register("password", {
                required: PASSWORD_ERROR,
                onChange(event) {
                  handlePasswordChange(event);
                },
              })}
            />
            {errors?.password?.message && (
              <label className="text-destructive text-xs pl-3 relative -top-1">
                {errors?.password?.message as never}
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
    </div>
  );
}

export default EmployeeForm;
