import prisma from "@/lib/db";





export async function POST(request:Request){
    try {
        const {username, title, content} = await request.json();

    const user = await prisma.user.findFirst({
        where:{
            username
        }
    });

    if (!user?.isVerified){
        return Response.json({
            status:false,
            message:"This user is not verified",
        })
    }
    if (!user?.isacceptingMessage){
        return Response.json({
            status:false,
            message:"This user is not accepting any message",
        })
    }

    const messageResponse = await prisma.message.create({
        data:{
            title,
            content,
            userId:user.id,
        }
    })

    return Response.json({
        status:true,
        message:"Message is send successfully",
    })
    } catch (error) {
        console.error(error);

        return Response.json({
            success:false,
            message:"Something went wrong while seding the message"
        })
    }

}