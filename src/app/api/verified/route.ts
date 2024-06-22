import prisma from "@/lib/db";
import { NEXT_AUTH } from "@/lib/nextauth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";





export async function PUT(request:Request){
    try {
        
        const session = await getServerSession(NEXT_AUTH);
        const user = session.user;

    if (!user){
    return NextResponse.json({
        success:false,
        message:"User is not authorized",
    })
    }
    
    
    const {toggle} = await request.json();

    const currentUserData = await prisma.user.findFirst({
        where:{
            id:user.id,
        },
        select:{
            isacceptingMessage:true,
        }
    })
    console.log(currentUserData);
    
    const updatedUserData = await prisma.user.update({
        where:{
            id:user.id,
        },
        data:{
            isacceptingMessage:toggle,
        }
    })
    

    return NextResponse.json({
        sucess:true,
        message:"isacceptingmessage is toggled",
        updatedUserData
    },{
        status:200,
    })
    } catch (error) {
        console.log(error,"Error during toggling");
        return NextResponse.json({
            success:false,
            message:"Something went wrong during toggling"
        },{
            status:500
        })
    }
    
}