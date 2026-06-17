import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
export const authOptions: NextAuthOptions = {
  providers: [Credentials({
    name: 'credentials',
    credentials: { email: {}, password: {} },
    async authorize(creds) {
      if (!creds?.email || !creds?.password) return null
      const user = await prisma.user.findUnique({ where: { email: creds.email } })
      if (!user) return null
      const ok = await bcrypt.compare(creds.password, user.password)
      if (!ok) return null
      return { id: user.id, email: user.email, name: user.name, role: user.role }
    }
  })],
  callbacks: {
    jwt: async ({ token, user }) => { if (user) token.role = (user as any).role; return token },
    session: async ({ session, token }) => { (session.user as any).role = token.role; return session }
  },
  pages: { signIn: '/auth/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET
}
