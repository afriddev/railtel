import clientQuery from "@/database/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const checkDesignationTable =
      await clientQuery`SELECT to_regclass('designation')`;
    if (checkDesignationTable[0]["to_regclass"] === null) {
      await clientQuery`CREATE TABLE public.designation(
    id SERIAL PRIMARY KEY,
    designation JSONB
    )`;
    }

    const checkDepartmentTable =
      await clientQuery`SELECT to_regclass('department')`;
    if (checkDepartmentTable[0]["to_regclass"] === null) {
      await clientQuery`CREATE TABLE public.department(
    id SERIAL PRIMARY KEY,
    department JSONB
    )`;
    }

    const [designation, department] = await clientQuery.transaction([
      clientQuery`SELECT "designation"->>${`desShortDesc`} AS "desShortDesc","designation"->>${`desLongDesc`} AS "desLongDesc" FROM public.designation `,
      clientQuery`SELECT "department"->>${`depShortDesc`} AS "depShortDesc","department"->>${`depLongDesc`} AS "depLongDesc" FROM public.department `,
    ]);

    return NextResponse.json(
      {
        message: "SUCCESS",
        data: {
          designations: designation,
          departmemts: department,
        },
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
