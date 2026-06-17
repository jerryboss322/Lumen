
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>ATELIER</h1>
      <p>Quiet luxury, made to last.</p>
      <div style={{ marginTop: '30px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/auth/login" style={{ padding: '12px 24px', background: '#C9873A', color: 'white', borderRadius: '8px' }}>Login</Link>
        <Link href="/shop" style={{ padding: '12px 24px', border: '1px solid #ddd', borderRadius: '8px' }}>Shop</Link>
      </div>
    </main>
  )
}
