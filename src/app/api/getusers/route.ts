import clientQuery from "@/database/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await clientQuery`SELECT * FROM public.users`;
    return NextResponse.json(
      {
        message: "SUCCESS",
        data,
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
        status: 200,
      }
    );
  }
}
