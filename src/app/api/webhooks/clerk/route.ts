import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload =await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new NextResponse('Error occured', {
            status: 400
        })
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.updated') {
        try {
            await prisma.user.update({
                where: {
                    id: evt.data.id,
                },
                data: {
                    username: JSON.parse(body).data.username,
                    avatar: JSON.parse(body).data.image_url || '/noAvatar.png',
                }
            });
            return new NextResponse("User has been created", { status: 200 })
        } catch (error) {
            console.log(error);
            return new NextResponse("Failed to created user", { status: 500 })
        }

    }
    if (eventType === 'user.deleted') {
        try {
            await prisma.user.delete({
                where: {
                    id: evt.data.id,
                }
            });

            return new NextResponse("User has been deleted", { status: 200 });
        } catch (error) {
            console.log(error);
            return new NextResponse("Failed to delete user", { status: 500 });
        }
    }

    return new NextResponse('', { status: 200 })
}