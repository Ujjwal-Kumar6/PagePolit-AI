import { db } from "@/db/clint";
import scalekit from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";
import { user as User, webdata } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');

    if (error) {
        return NextResponse.json({ error, error_description }, { status: 401 });
    }

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 401 });
    }

    try {
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
        const authres = await scalekit.authenticateWithCode(code, redirectUri);
        const { user, idToken, accessToken } = authres;

        // Decode JWT
        const tokenParts = idToken.split('.');
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
        const organizationId = payload.oid;

        if (!organizationId) {
            return NextResponse.json(
                { error: "Organization ID not found in token" },
                { status: 401 }
            );
        }

        // ---------- CHECK USER ----------
        const existingUsers = await db
            .select()
            .from(User)
            .where(eq(User.email, user.email));

        if (existingUsers.length === 0) {
            await db.insert(User).values({
                organization_id: organizationId,
                name: user.name || 'User',
                email: user.email,
            });
        }

        // ---------- CREATE RESPONSE ----------
        const response = NextResponse.redirect(new URL('/dashboard', req.url));

        const userSession = {
            email: user.email,
            organizationId: organizationId,
            name: user.name,
            roles: payload.roles || [],
        };

        response.cookies.set('user_session', JSON.stringify(userSession), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });

        response.cookies.set('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });

        // ---------- WEB DATA LOGIC ----------
        const [userWebdata] = await db
            .select()
            .from(webdata)
            .where(eq(webdata.userEmail, user.email));

        if (userWebdata) {
            // Set cookie if exists
            response.cookies.set(
                "webdata",
                JSON.stringify({
                    businessName: userWebdata.businessName,
                }),
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 24 * 30, // 1 month
                    path:'/'
                }
            );
        } else {
            // Delete cookie if not exists
            response.cookies.delete("webdata");
        }

        return response;

    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json(
            {
                error: "Authentication failed",
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}