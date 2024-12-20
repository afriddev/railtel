export type addDesignatonPayload = {
  shortDesc: string;
  longDesc: string;
  method?: "DES" | "DEP";
};

export type designationType = {
  desShortDesc: string;
  desLongDesc: string;
};

export type departmentType = {
  depShortDesc: string;
  depLongDesc: string;
};

export enum genderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export type userType = {
  emailId: string;
  firstName: string;
  lastName: string;
  gender: genderEnum;
  designation: string;
  department: string;
  pasword?: string;
  id?:number
};
