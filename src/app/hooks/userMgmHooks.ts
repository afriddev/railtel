import { useMutation } from "@tanstack/react-query";
import { addDesignationAPI, addUserAPI, getDesignationsAndDepartmentsAPI, getUsersAPI } from "../services/userMgmtAPIS";
import { addDesignatonPayload, userType } from "@/types/userMgmtDataTypes";

export function useAddDesignationAndDepartment() {
  const {
    isPending,
    data,
    mutate: addDesignation,
  } = useMutation({
    mutationFn: (data: addDesignatonPayload) => addDesignationAPI(data),
  });
  return { isPending, data, addDesignation };
}

export function useGetDesignatinsAndDepartments() {
  const {
    data,
    isPending,
    mutate: getDesignationsAndDepartments,
  } = useMutation({
    mutationFn: () => getDesignationsAndDepartmentsAPI(),
  });
  return {
    getDesignationsAndDepartments,
    data,
    isPending,
  };
}

export function useAddUser(){
  const {isPending,mutate:addUser} = useMutation({
    mutationFn:(data:userType)=>addUserAPI(data)
  })
  return{isPending,addUser}
}

export function useGetUsers(){
  const {isPending,data,mutate:getUsers} = useMutation({
    mutationFn:()=>getUsersAPI()
  })
  return {getUsers,isPending,data}
}