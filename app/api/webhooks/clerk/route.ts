import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
export async function POST(req: NextRequest) {
    try {
        const payload = await req.text();
        const header = {
            'svix-id': req.headers.get('svix-id') || '',
            'svix-timestamp': req.headers.get('svix-timestamp') || '',
            'svix-signature': req.headers.get('svix-signature') || '',
        }
        const webhookSecret = process.env.CLLERK_WEBHOOK_SECRET ;
        if (webhookSecret) {
            const wh = new Webhook(webhookSecret);
            try{
                wh.verify(payload, header);
                
            }catch(err){
                return new NextResponse('Unvalid signature', { status: 400 });
            }
        }
        const event = JSON.parse(payload);
        console.log("Clerk Webhook resived", event.type)
        if (event.type === "user.created") {
            const { id, email_addresses,first_name, last_name} = event.data;
            const primaryEmail = email_addresses?.find((email: any) => email.id === event.data.primary_email_address_id)?.email_address;
         const newUser = await prisma.user.create({
                data: {
                    id:id,
                    clerkId: id,
                    email: primaryEmail || null,
                    firstName: first_name,  
                    lastName: last_name,
                },
         })
             console.log("New user created:", newUser.id ,newUser.email);
             return NextResponse.json({ message: 'User created' }, { status: 200 });
        }
        return NextResponse.json({ message: 'wbehook received' });
    } catch (error) {
        console.error("Error processing Clerk webhook:", error);
        return new NextResponse('wbehook processing failed', { status: 500 });
    }
}