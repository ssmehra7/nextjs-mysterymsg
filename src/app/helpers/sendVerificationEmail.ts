
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

import { EmailTemplate } from '@/components/email-template';
import { string } from 'zod';

export async function sendVerificationEmail(
    email:string, 
    username:string, 
    verifyCode:string,
){
    try{
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to:email,
            subject: 'Verification Code | Mystery Message',
            //@ts-ignore
            // text:null,
            react: EmailTemplate({ username,verifyCode }),
          });
    }catch(error){
        console.error("Error sending verification email",error);
        return {success:false, message:'Failed to send verification email'}
    }
}