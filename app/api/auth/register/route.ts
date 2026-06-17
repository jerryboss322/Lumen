import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
export async function POST(req: Request) {
  const { name, email, password } = await req.json()
  if (!name || !email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return NextResponse.json({ error: 'Email exists' }, { status: 400 })
  const user = await prisma.user.create({
    data: { name, email, password: await bcrypt.hash(password, 12), role: 'CUSTOMER' }
  })
  return NextResponse.json({ id: user.id, role: user.role })
}
