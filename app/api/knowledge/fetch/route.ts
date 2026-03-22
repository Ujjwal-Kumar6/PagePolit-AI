import { db } from "@/db/clint";
import { knowledge_source } from "@/db/schema";
import { isLogin } from "@/lib/isLogin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
    const user = await isLogin();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const source = await db
        .select()
        .from(knowledge_source)
        .where(eq(knowledge_source.userEmail, user.email));
    return NextResponse.json({source}, { status: 200 });
}