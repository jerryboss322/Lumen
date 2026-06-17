
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const prisma = new PrismaClient()

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = schema.parse(body)
    
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }
    
    const hashed = await bcrypt.hash(password, 12)
    
    // FORCE CUSTOMER ROLE - never trust client
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: 'CUSTOMER'
      }
    })
    
    return NextResponse.json({ id: user.id, email: user.email, role: user.role })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }
}
