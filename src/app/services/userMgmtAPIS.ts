import { addDesignatonPayload, userType } from "@/types/userMgmtDataTypes";

export async function addDesignationAPI(data: addDesignatonPayload) {
  const server = await fetch("/api/config", {
    method: "post",
    body: JSON.stringify(data),
  });
  const serverResonse = await server.json();
  return serverResonse;
}

export async function getDesignationsAndDepartmentsAPI() {
  const server = await fetch("/api/getdesdep");
  const response = await server.json();
  return response;
}

export async function addUserAPI(data: userType) {
  const server = await fetch("/api/adduser", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const response = await server.json();
  return response;
}
