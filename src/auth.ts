import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { getUser } from './lib/user.action';
import { User } from '@prisma/client';
import { extractNameFromEmail } from './lib/utils';
import prisma from './lib/client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    newUser: 'sign-up',
    signIn: 'login',
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text', placeholder: 'john doe' },
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user: User | null = await getUser(email);

        if (!user) {
          return null
        }
        if (!user.password) {
          return null
        }
        const isMatched = await compare(password, user.password);
        if (!isMatched) {
          return null
        }

        return { id: user.id, image: user.avatar, name: user.username, email: user.email };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const googleUser = await getUser(user.email!);

          if (!googleUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                username: extractNameFromEmail(user.email!),
                googleId: user.id,
                avatar: user.image!,
                userInfo: {
                  create: {
                    createdAt: new Date(),
                  },
                },
              }
            });
            (user as any).dbId = newUser.id;
          } else {
            (user as any).dbId = googleUser.id;
          }
          return true;
        } catch (error) {
          throw new Error('Erro while creating user');
        }
      }
      if (account?.provider === 'credentials') return true;
      return false
    },
    jwt({ token, user }) {
      if (user) {
        token.id = (user as any).dbId || user.id; // fallback for credentials
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});