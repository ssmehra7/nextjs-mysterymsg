import prisma from "@/lib/db";
import { NEXT_AUTH } from "@/lib/nextauth";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const session = await getServerSession(NEXT_AUTH);
    const user = session?.user;

    if (!user){
        return NextResponse.json({
            success: false,
            message: "User is not authorized",
        },{
            status: 400,
        });
    }

    const userData = await prisma.user.findFirst({
        where: {
            id: user.id,
        }, 
        include:{
            messages:true,
        }
    });

    if (!userData){
        return NextResponse.json({
            success: false,
            message: "User is not found",
        },{
            status: 400,
        });
    }

    const Message = userData.messages;

    console.log(Message);
    return NextResponse.json({
        success: true,
        message: "All message received",
        Message
    },{
        status: 200,
    });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Something went wrong while fetching the messages"
            
        },{
            status:500
        })
    }
}
