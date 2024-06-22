import { NEXT_AUTH } from "@/lib/nextauth";
import NextAuth from "next-auth/next";

const handler = NextAuth(NEXT_AUTH);

export { handler as GET, handler as POST }