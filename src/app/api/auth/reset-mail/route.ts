import { NextResponse } from 'next/server';
import { MailtrapClient } from 'mailtrap';
import { z } from 'zod';
import { PASSWORD_RESET_REQUEST_TEMPLATE } from '@/lib/utils';
import prisma from '@/lib/client';

const TOKEN = process.env.MAILTRAP_TOKEN!;

const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 3126243,
  accountId: 2047102,
});

const sender = {
  email: "mailtrap@example.com",
  name: "next-auth",
};

const recipients = [
  {
    email: "anasahmedd244@gmail.com",
  }
];
export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  const parsedCredentials = z
    .object({
      email: z.string().email(),
    })
    .safeParse({
      email,
    });

  if (!parsedCredentials.success) {
    return NextResponse.json({
      type: 'error',
      resultCode: parsedCredentials.error.message as string
    });
  }

  const token = crypto.randomUUID();
  const tokenExpirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now, in seconds

  try {
    const user = await prisma.user.update({
      where: {
        email: parsedCredentials.data.email,
      },
      data: {
        resetToken: token,
        resetTokenExpiry: tokenExpirationTime,
      },
      select: {
        id: true,
      },
    });
    
    if (user) {
      const resetUrl = `${process.env.DOMAIN_URL}/reset-password?token=${token}&id=${user.id}`

      const res = await client.send({
        from: sender,
        to: recipients,//for testing its only an owner email
        subject: "Password Reset Request",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
        category: "Reset Token",
      });
      if (res.success) {
        return NextResponse.json({
          type: 'succes',
          resultCode: 'Reset password email sent.'
        });
      } else {
        return NextResponse.json({
          type: 'error',
          resultCode: 'Error sending mail'
        });
      }
    } else {
      return NextResponse.json({
        type: 'error',
        resultCode: 'Invalid Email'
      });
    }
  } catch (error) {
    const typeErr = error as Error;
    return NextResponse.json({
      type: 'error',
      resultCode: typeErr.message
    });
  }
}
//   const { emailsToSend,userId, token } = body;

//   if (!recipients || !token) {
//     return NextResponse.json({ error: 'Recipients and reset token are required' }, { status: 400 });
//   }
//   // const emailRecipients = emailsToSend.map((email: string) => ({ email }));
//   const resetUrl = `${process.env.DOMAIN_URL}/reset-password?token=${token}&id=${userId}`

//   const response = await client.testing.send({
//     from: sender,
//     to: recipients,//for testing its only an owner email
//     subject: "Password Reset Request",
//     html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
//     category: "Reset Token",
//   });

//   return NextResponse.json({ success: true, response });
// } catch (error) {
//   console.error('Error sending email:', error);
//   return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
// }


