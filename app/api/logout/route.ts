import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete({ name: "access_token", path: "/" });
  cookieStore.delete({ name: "user_session", path: "/" });
  cookieStore.delete({ name: "sk_state", path: "/" });
  cookieStore.delete({ name: "webdata", path: "/" });

  return NextResponse.redirect(new URL("/?logout=true", process.env.NEXT_PUBLIC_BASE_URL));
}