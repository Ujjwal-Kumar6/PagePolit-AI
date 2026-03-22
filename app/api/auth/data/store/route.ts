import { db } from "@/db/clint";
import { webdata } from "@/db/schema";
import { isLogin } from "@/lib/isLogin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    const user = await isLogin();

    if(!user){
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const {businessName , websiteUrl , externalLinks} = await req.json();

    if (!businessName || !websiteUrl) {
        return NextResponse.json({error:"Business name and website URL are required"},{status:400})
    }

    const webdataResponse = await db.insert(webdata).values({
        userEmail: user.email,
        businessName,
        websiteUrl,
        externalLinks
    });

    (await cookies()).set("webdata", JSON.stringify({businessName}));

    return NextResponse.json({webdataResponse},{status:200})
}