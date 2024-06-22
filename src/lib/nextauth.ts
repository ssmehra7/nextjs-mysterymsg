import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './db';
import { sendVerificationEmail } from '@/app/helpers/sendVerificationEmail';
import bcrypt from 'bcrypt';
// import { headers } from 'next/headers';

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
      },
      async authorize(credentials: any) {
        try {
          const { email, password } = credentials;

          // Find user by email
          const user = await prisma.user.findFirst({
            where: { email },
          });

          // Check if user is found
          if (!user) {
            throw new Error("User not found");
          }

          // Check if user is verified
          if (!user.isVerified) {
            await sendVerificationEmail(email, user.username, user.verifyCode);
            console.log({
              email,
              message: "The user is not verified",
            });
            const error = new Error("User is not verified");
            error.name = 'UnverifiedUser';
            throw error;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          console.log("User signed in successfully:", user);
          return user;

        } catch (error) {
          console.error("Error during sign-in:", error);
          throw new Error(error.message || "An unknown error occurred");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // headers: Object.fromEntries(headers()),
  callbacks: {
    jwt: async ({ token, user }:any) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      console.log('JWT token is:', token);
      return token;
    },
    session: async ({ session, token }:any) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      console.log('Session is:', session);
      return session;
    },
  },
};
