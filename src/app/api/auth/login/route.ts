import { signIn } from "@/auth";
import { ResultCode } from "@/lib/utils";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
        const body = await req.json();
        const { email,password } = body;

        try {

            const parsedCredentials = z
                .object({
                    email: z.string().email(),
                    password: z.string().min(6)
                })
                .safeParse({
                    email,
                    password
                })

            if (parsedCredentials.error) {
                return NextResponse.json({ type: 'error', resultCode: ResultCode.InvalidSubmission });

            }
            await signIn('credentials', {
                email,
                password,
                redirect: false
            })

            return NextResponse.json({ type: 'success', resultCode: ResultCode.UserLoggedIn });


        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        return NextResponse.json({ type: 'error', resultCode: ResultCode.InvalidCredentials });

                    default:
                        return NextResponse.json({ type: 'error', resultCode: ResultCode.UnknownError });

                }
            }
        }
}
