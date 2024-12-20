import clientQuery from "@/database/database";
import { userType } from "@/types/userMgmtDataTypes";
import { encodeString } from "@/utils/authUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload: userType = await req.json();

  if (
    !(
      payload?.firstName &&
      payload?.department &&
      payload?.department &&
      payload?.gender &&
      payload?.emailId
    )
  ) {
    return NextResponse.json(
      {
        message: "INVALID_PAYLOAD",
      },
      { status: 401 }
    );
  }

  try {
    const checkUserTable = await clientQuery`SELECT to_regclass('users')`;
    if (checkUserTable[0]["to_regclass"] === null) {
      await clientQuery`CREATE TABLE public.users(
        id SERIAL PRIMARY KEY,
        "emailId" VARCHAR(50),
        "firstName" VARCHAR(50),
        "lastName" VARCHAR(50),
        gender VARCHAR(50),
        designation VARCHAR(50),
        department VARCHAR(50),
        password VARCHAR(300)
    
    )`;
    }
    const password = "hello world";
    const encodedPassword = encodeString(password);
    const findUser =
      await clientQuery`SELECT "emailId" FROM public.users WHERE "emailId" = ${payload.emailId.toString()} `;

    if (findUser?.length > 0) {
      return NextResponse.json(
        {
          message: "USER_ALREADY_EXISTS",
        },
        {
          status: 200,
        }
      );
    }

    await clientQuery`INSERT INTO public.users("emailId","firstName","lastName","gender","designation","department","password") values(${
      payload?.emailId
    },${payload?.firstName},${payload?.lastName ?? ""},${payload?.gender},${
      payload?.designation
    },${payload?.department},${encodedPassword})`;
    return NextResponse.json(
      {
        message: "SUCCESS",
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "SERVER_ERROR",
    });
  }
}
