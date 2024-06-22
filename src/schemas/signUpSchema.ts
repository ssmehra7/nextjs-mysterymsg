import {z} from 'zod';



export const signUpSchema = z.object({
    username :z.string().min(2,"Username must be atleast 2 characters"),
    email: z.string().email(),
    password:z.string().min(6,'Password must be more than 6 ')
})