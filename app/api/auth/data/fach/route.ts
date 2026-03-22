import { db } from "@/db/clint";
import { isLogin } from "@/lib/isLogin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { webdata } from "@/db/schema";

export async function GET(req: Request) {
    try {
        const user = await isLogin();
        if (!user) {
            return NextResponse.json({ error: "unauthrizred" }, { status: 401 });
        }

        const cookieStore = await cookies();
        const webdataCookie = cookieStore.get("webdata");

        if (webdataCookie?.value) {
            return NextResponse.json({
                exists: true,
                source: "cookie",
                date: JSON.parse(webdataCookie.value)
            }, { status: 200 });
        }

        const [isInital] = await db
            .select()
            .from(webdata)
            .where(eq(webdata.userEmail, user.email))
        

        if (isInital) {
            cookieStore.set(
                "webdata",
                JSON.stringify({ businessName: isInital.businessName }),
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 24 * 30, // 1 month
                    path:'/'
                }
            );

            return NextResponse.json(
                {
                    exists: true,
                    source: "database",
                    data: isInital
                },
                { status: 200 }
            )
        }

        return NextResponse.json({exists:false , data:null }, {status:200});
    } catch (error) {
        console.error("webdata fetch error:" , error);
        return NextResponse.json(
            {error:"Internal server error"},
            {status:500}
        )
    }
}