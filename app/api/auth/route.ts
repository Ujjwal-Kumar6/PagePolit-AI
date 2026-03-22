import scalekit from '@/lib/scalekit';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const state = crypto.randomBytes(16).toString('hex');
        (await cookies()).set("sk_state", state, { 
            httpOnly: true, 
            sameSite: 'lax', 
            path: '/',
        });
        
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!;

        const options = {
            scopes: ['openid','profile','email','offline_access'],
            state: state,
            prompt: "login"
        }

        const authUrl = scalekit.getAuthorizationUrl(redirectUri, options);

        return NextResponse.redirect(authUrl);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: `Internal Server Error${error}` },
            { status: 500 }
        );
    }
}