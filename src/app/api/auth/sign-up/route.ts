import { signIn } from "@/auth";
import { createUser } from "@/lib/user.action";
import { ResultCode } from "@/lib/utils";
import { genSalt, hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
    const body = await req.json();
    const {username, email, password } = body;

    const parsedCredentials = z
        .object({
            username: z
                .string()
                .min(3)
                .regex(/^[a-z0-9]+$/, {
                    message: "Username must be lowercase, no spaces, and no symbols.",
                }),
            email: z.string().email(),
            password: z.string().min(6)
        })
        .safeParse({
            username,
            email,
            password
        })

    if (parsedCredentials.success) {
        const salt = await genSalt(10);

        const hashedPassword = await hash(parsedCredentials.data.password, salt);

        try {
            const result = await createUser(parsedCredentials.data.username, parsedCredentials.data.email, hashedPassword);

            if (result.resultCode === ResultCode.UserCreated) {
                await signIn('credentials', {
                    email,
                    username,
                    password,
                    redirect: false
                });
            }
            return NextResponse.json(result);
        } catch (error) {
            console.error("Error in signup process:", error); // Log detailed error to the console

            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        return NextResponse.json({ type: 'error', resultCode: ResultCode.InvalidCredentials });
                    default:
                        return NextResponse.json({ type: 'error', resultCode: error.message });
                }
            } else {
                const typeErr = error as Error
                return NextResponse.json({ type: 'error', resultCode: typeErr.message });
            }
        }
    } else {
        return NextResponse.json({ type: 'error', resultCode: ResultCode.InvalidSubmission });
    }
}
