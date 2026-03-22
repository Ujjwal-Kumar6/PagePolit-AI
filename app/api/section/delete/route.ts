import { db } from "@/db/clint";
import { sections } from "@/db/schema";
import { isLogin } from "@/lib/isLogin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try{
        const user = await isLogin();
        if(!user) {
            return NextResponse.json({error: 'Unuthorized'}, {status: 401});
        }

        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({error: 'Section Id is required'}, { status:400});
        }

        const section = await db.select().from(sections).where(eq(sections.userEmail, user.email));

        if (!section) {
            return NextResponse.json({error:'Section is Required'} , {status:405});
        }

        const response = await db.delete(sections).where(eq(sections.id, id));
        
        return NextResponse.json(response);
    }catch (error) {
        console.error("error Delete section:" ,error);
        return NextResponse.json(
            {error:'faled to create section'},
            { status: 500 }
        );
    }
}