import { db } from "@/db/clint";
import { sections } from "@/db/schema";
import { isLogin } from "@/lib/isLogin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
    try{
        const user = await isLogin();
        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 400});

        }

        const response = await db.select().from(sections).where(eq(sections.userEmail, user.email));
        return NextResponse.json(response);
    }catch (error) {
        console.error("error Fetch section:" ,error);
        return NextResponse.json(
            {error:'faled to create section'},
            { status: 500 }
        );
    }
}