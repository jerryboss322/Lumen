
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Shop() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')
  
  const products = await prisma.product.findMany()

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Shop</h1>
      <p>Logged in as: {session.user?.email} ({(session.user as any).role})</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px', marginTop: '24px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '16px' }}>
            <h3>{p.name}</h3>
            <p style={{ color: '#666' }}>₦{p.price.toLocaleString()}</p>
            <p style={{ fontSize: '13px', color: '#999' }}>{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
