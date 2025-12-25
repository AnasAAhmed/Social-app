import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import streamServerClient from "@/lib/stream";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url') || '';
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json("Unauthorized", {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60
        const issueAt = Math.floor(Date.now() / 1000) - 60
        const token = streamServerClient.createToken(
            session.user.id!,
            expirationTime,
            issueAt
        )
        return NextResponse.json({token}, {
            status: 200,
        });
    } catch (error) {
        console.log((error as Error).message);

        return NextResponse.json({ error: "Failed to fetch stream token " + (error as Error).message }, { status: 500 });
    }
}
