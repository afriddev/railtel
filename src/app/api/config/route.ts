/* eslint-disable @typescript-eslint/no-explicit-any */
import clientQuery from "@/database/database";
import { addDesignatonPayload } from "@/types/userMgmtDataTypes";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload: addDesignatonPayload = await req.json();
  if (!(payload?.shortDesc && payload?.longDesc && payload?.method)) {
    return NextResponse.json(
      {
        message: "BAD_REQUEST",
      },
      { status: 401 }
    );
  }

  if (payload.method === "DES") {
    const checkTable = await clientQuery`SELECT to_regclass('designation')`;
    if (checkTable[0]["to_regclass"] === null) {
      await clientQuery`CREATE TABLE public.designation(
    id SERIAL PRIMARY KEY,
    designation JSONB
    )`;
    }

    try {
      delete (payload as any)?.method;

      const designations =
        await clientQuery`SELECT "designation"  FROM public.designation WHERE LOWER("designation"->>${`desShortDesc`}) ILIKE LOWER(${
          payload.shortDesc
        }) `;

      if (designations?.length > 0) {
        return NextResponse.json({
          message: "ALREADY_EXISTS",
        });
      }

      const designationValues = {
        desShortDesc: payload?.shortDesc,
        desLongDesc: payload?.longDesc,
      };

      await clientQuery`INSERT INTO public.designation("designation") VALUES(${designationValues})`;
      return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        {
          message: "SERVER_ERROR",
        },
        { status: 500 }
      );
    }
  } else {
    const checkTable = await clientQuery`SELECT to_regclass('department')`;
    if (checkTable[0]["to_regclass"] === null) {
      await clientQuery`CREATE TABLE public.department(
    id SERIAL PRIMARY KEY,
    department JSONB
    )`;
    }

    try {
      delete (payload as any)?.method;
      const designations =
        await clientQuery`SELECT "department"  FROM public.department WHERE LOWER("department"->>${`desShortDesc`}) ILIKE LOWER(${
          payload.shortDesc
        }) `;

      if (designations?.length > 0) {
        return NextResponse.json({
          message: "ALREADY_EXISTS",
        });
      }

      const departmentValues = {
        depShortDesc: payload?.shortDesc,
        depLongDesc: payload?.longDesc,
      };

      await clientQuery`INSERT INTO public.department("department") VALUES(${departmentValues})`;
      return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        {
          message: "SERVER_ERROR",
        },
        { status: 500 }
      );
    }
  }
}
