import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  await prisma.user.deleteMany()
  await prisma.product.deleteMany()
  
  await prisma.user.create({
    data: {
      email: 'jerryadewole2023@gmail.com',
      name: 'Jerry Adewole',
      password: await bcrypt.hash('Sajnli25', 12),
      role: 'ADMIN'
    }
  })
  
  await prisma.user.createMany({
    data: [
      { email: 'customer1@test.com', name: 'Customer One', password: await bcrypt.hash('customer123', 12), role: 'CUSTOMER' },
      { email: 'customer2@test.com', name: 'Customer Two', password: await bcrypt.hash('customer456', 12), role: 'CUSTOMER' }
    ]
  })

  await prisma.product.createMany({
    data: [
      { name: 'Camden Tote', slug: 'camden-tote', description: 'Minimal leather tote', price: 85000, category: 'Bags', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e', featured: true },
      { name: 'Mercer Backpack', slug: 'mercer-backpack', description: 'Everyday carry', price: 122000, category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', featured: true },
      { name: 'Heritage Chronograph', slug: 'heritage-chrono', description: 'Precision watch', price: 125000, category: 'Watches', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49', featured: true },
      { name: 'Wool Overcoat', slug: 'wool-overcoat', description: 'Winter essential', price: 195000, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea', featured: false },
    ]
  })
  console.log('✓ Seeded: 1 admin, 2 customers, 4 products')
}
main()
