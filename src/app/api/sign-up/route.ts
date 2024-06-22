import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";
import prisma from "@/lib/db";


import bcrypt from 'bcrypt';
import { stat } from "fs";



export async function POST(request:Request){
    try{
       const {username, email, password}= await request.json();
       const verifyCode = Math.floor(100000+Math.random()*90000).toString();

       //checking for username 
       const existingUsername = await prisma.user.findFirst({
        where:{
            username,
        }
       }) ; 

       if (existingUsername){
        if (existingUsername.isVerified){
            return Response.json({
                message:"This username is already taken please use other username",
            })
        }else {
            const emailResponse = await sendVerificationEmail(email,username,verifyCode);

            console.log(emailResponse, 'hi from email response');

            return Response.json({
                message:"This username is already taken but not verified please verify from the registered email"
            })
        }
       }
    
       //checking for email
       const existingEmail = await prisma.user.findFirst({
        where:{
            email
        }
       });

      
       if (existingEmail){
        if(!existingEmail.isVerified){
            // send an email to the people for verification code.

            const emailResponse = await sendVerificationEmail(email,username,verifyCode);

            console.log(emailResponse);

            return Response.json({
                message:"The email is not verified , email is send for verification"
            })

            return Response.json({
                message:'This email is already existed and verified'
            })
        }else{
            return Response.json({
                message:"This email is already registered",
            })
        } //todo we have to do something with this
       }else {
        const hashedpassword = await bcrypt.hash(password,10);
        const response = await prisma.user.create({
            data:{
                username,
                email,
                password:hashedpassword,
                verifyCode
            }
        })
        const emailResponse = await sendVerificationEmail(email,username,verifyCode);
        console.log(response,emailResponse);

        return Response.json({
            message:"Email registered successfully and verification email is send ",
        })
       }

     
    }catch(error){
        console.error('Error registring user',error);
        return Response.json({
            success:false,
            message:"Error registring user"
        },{
            status:500
        })
    }
}