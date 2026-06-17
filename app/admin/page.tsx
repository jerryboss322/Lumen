
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Admin() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'ADMIN') {
    redirect('/auth/login?error=admin')
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {(session.user as any).name} (ADMIN)</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/admin/products" style={{ padding: '10px 16px', background: '#C9873A', color: 'white', borderRadius: '8px', marginRight: '10px' }}>Manage Products</a>
      </div>
    </div>
  )
}
