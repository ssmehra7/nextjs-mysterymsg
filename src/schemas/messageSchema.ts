import { z } from "zod";


export const messageSchema = z.object({
    title:z.string().min(3,'Title must be greater than 4'),
    content:z.string().min(10,'Message should be greater than 10 characters'),
    
})