import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/client"; // assumes this is your Prisma client

export async function POST(req: Request) {
  const body = await req.json();
  const { token, userId, password, ConfirmPassword } = body;

  try {
    const parsedCredentials = z
      .object({
        token: z.string().uuid(),
        userId: z.string().min(30, "Invalid userId"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        ConfirmPassword: z.string().min(6, "ConfirmPassword must be at least 6 characters long"),
      })
      .safeParse({ token, userId, password, ConfirmPassword });

    if (!parsedCredentials.success) {
      return NextResponse.json({
        type: "error",
        resultCode: parsedCredentials.error.message,
      });
    }

    const { token: parsedToken, userId: parsedUserId, password: parsedPassword, ConfirmPassword: parsedConfirmPassword } = parsedCredentials.data;

    if (parsedPassword !== parsedConfirmPassword) {
      return NextResponse.json({
        type: "error",
        resultCode: "Passwords do not match",
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
      select: {
        id: true,
        resetToken: true,
        resetTokenExpiry: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        type: "error",
        resultCode: "User not found",
      });
    }

    const isValidToken = user.resetToken === parsedToken;
    const isTokenNotExpired = user.resetTokenExpiry && user.resetTokenExpiry > Math.floor(Date.now() / 1000);

    if (!isValidToken || !isTokenNotExpired) {
      return NextResponse.json({
        type: "error",
        resultCode: "Invalid or expired token",
      });
    }

    const hashedPassword = await hash(parsedPassword, 10);

    await prisma.user.update({
      where: { id: parsedUserId },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({
      type: "success",
      resultCode: "Password successfully reset",
    });
  } catch (error) {
    const typeErr = error as Error;
    return NextResponse.json({
      type: "error",
      resultCode: typeErr.message,
    });
  }
}
