import { z } from "zod";



export const singinSchame = z.object({
    username :z.string().min(2,"Username must be atleast 2 characters"),
    password:z.string().min(6,'Password must be more than 6 ')
})