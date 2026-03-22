import { db } from "@/db/clint";
import { sections } from "@/db/schema";
import { isLogin } from "@/lib/isLogin";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const user = await isLogin();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();

        const { name, description, tone, sourceIds } = body;

        if (!name || !description || !tone) {
            return NextResponse.json({ error: 'Missing requred fields' }, { status: 400 });
        }

        if (!sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0) {
            return NextResponse.json({ error: 'At least one source is required' }, { status: 400 });
        }

        const section = await db.insert(sections).values({
            userEmail: user.email,
            name,
            description,
            sourceIds,
            tone,
            status: 'active',
        });
        return NextResponse.json({ message: 'Secton Created Successfully', section }, { status: 201 });
    } catch (error) {
        console.error("error creating section:" ,error);
        return NextResponse.json(
            {error:'faled to create section'},
            { status: 500 }
        );
    }
}