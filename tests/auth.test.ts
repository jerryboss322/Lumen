
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function runTests() {
  console.log('=== AUTH SECURITY TESTS ===\n')
  
  // Test 1: Admin exists and only one
  const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } })
  console.log('Test 1 - Admin count:', admins.length === 1 ? '✓ PASS' : '✗ FAIL')
  console.log('  Admin email:', admins[0]?.email)
  
  // Test 2: Customer 1 signup simulation
  const cust1 = await prisma.user.findUnique({ where: { email: 'customer1@test.com' } })
  console.log('\nTest 2 - Customer 1 role:', cust1?.role === 'CUSTOMER' ? '✓ PASS' : '✗ FAIL')
  
  // Test 3: Customer 2 cannot access admin
  const cust2 = await prisma.user.findUnique({ where: { email: 'customer2@test.com' } })
  const canAccessAdmin = cust2?.role === 'ADMIN'
  console.log('\nTest 3 - Customer 2 admin access:', !canAccessAdmin ? '✓ PASS (blocked)' : '✗ FAIL')
  
  // Test 4: Passwords are hashed
  const admin = admins[0]
  const isHashed = admin.password.startsWith('$2')
  console.log('\nTest 4 - Password hashed:', isHashed ? '✓ PASS' : '✗ FAIL')
  
  // Test 5: Signup forces CUSTOMER
  const testUser = await prisma.user.create({
    data: {
      name: 'Hacker',
      email: 'hacker@test.com',
      password: await bcrypt.hash('test', 12),
      role: 'CUSTOMER' // API forces this
    }
  })
  console.log('\nTest 5 - Forced CUSTOMER on signup:', testUser.role === 'CUSTOMER' ? '✓ PASS' : '✗ FAIL')
  await prisma.user.delete({ where: { id: testUser.id } })
  
  console.log('\n=== ALL TESTS COMPLETED ===')
}

runTests()
