
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear
  await prisma.user.deleteMany()
  await prisma.product.deleteMany()

  // Admin - ONLY YOU
  const adminPassword = await bcrypt.hash('Sajnli25', 12)
  await prisma.user.create({
    data: {
      email: 'jerryadewole2023@gmail.com',
      name: 'Jerry Adewole',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  // Test customers
  const cust1 = await bcrypt.hash('customer123', 12)
  await prisma.user.create({
    data: {
      email: 'customer1@test.com',
      name: 'Test Customer 1',
      password: cust1,
      role: 'CUSTOMER'
    }
  })

  const cust2 = await bcrypt.hash('customer456', 12)
  await prisma.user.create({
    data: {
      email: 'customer2@test.com',
      name: 'Test Customer 2',
      password: cust2,
      role: 'CUSTOMER'
    }
  })

  // Products
  const products = [
    { name: 'Camden Tote', slug: 'camden-tote', description: 'Minimal leather tote', price: 85000, category: 'Bags', image: '/products/tote.jpg', featured: true },
    { name: 'Mercer Backpack', slug: 'mercer-backpack', description: 'Everyday carry', price: 122000, category: 'Bags', image: '/products/backpack.jpg', featured: true },
    { name: 'Heritage Chronograph', slug: 'heritage-chrono', description: 'Precision watch', price: 125000, category: 'Watches', image: '/products/watch.jpg', featured: true },
    { name: 'Wool Overcoat', slug: 'wool-overcoat', description: 'Winter essential', price: 195000, category: 'Outerwear', image: '/products/coat.jpg', featured: false },
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  console.log('✓ Seed complete: 1 admin, 2 customers, 4 products')
}

main()
