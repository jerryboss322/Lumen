import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

const prisma = new PrismaClient()

export default async function ShopPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/login')

  const products = await prisma.product.findMany({
    orderBy: { featured: 'desc' },
  })

  const isAdmin = (session.user as any).role === 'ADMIN'

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>LUMEN</Link>
        <nav style={styles.nav}>
          {isAdmin && (
            <Link href="/admin" style={styles.navLink}>Admin</Link>
          )}
          <span style={styles.userEmail}>{session.user?.email}</span>
          <SignOutButton />
        </nav>
      </header>

      {/* Page title */}
      <main style={styles.main}>
        <h1 style={styles.title}>Shop</h1>
        <p style={styles.count}>{products.length} products</p>

        {products.length === 0 ? (
          <div style={styles.empty}>
            <p>No products yet.</p>
            {isAdmin && (
              <Link href="/admin" style={styles.ctaLink}>Go to Admin to add products</Link>
            )}
          </div>
        ) : (
          <div style={styles.grid}>
            {products.map(product => (
              <div key={product.id} style={styles.card}>
                <div style={styles.imageWrapper}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={styles.image} />
                  ) : (
                    <div style={styles.imagePlaceholder} />
                  )}
                  {product.featured && (
                    <span style={styles.badge}>Featured</span>
                  )}
                </div>
                <div style={styles.cardBody}>
                  <p style={styles.category}>{product.category}</p>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.description}>{product.description}</p>
                  <div style={styles.cardFooter}>
                    <span style={styles.price}>
                      &#x20A6;{product.price.toLocaleString()}
                    </span>
                    <span style={styles.stock}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#fafafa' },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: 64,
    background: 'white',
    borderBottom: '1px solid #E5E5E5',
  },
  logo: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#1A1A1A',
    textDecoration: 'none',
  },
  nav: { display: 'flex', alignItems: 'center', gap: 20 },
  navLink: { fontSize: 14, color: '#C9873A', textDecoration: 'none', fontWeight: 500 },
  userEmail: { fontSize: 13, color: '#6B6B6B' },
  main: { maxWidth: 1200, margin: '0 auto', padding: '40px 24px' },
  title: { fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 },
  count: { fontSize: 14, color: '#6B6B6B', marginBottom: 32 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 24,
  },
  card: {
    background: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid #E5E5E5',
  },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 260, objectFit: 'cover', display: 'block' },
  imagePlaceholder: { width: '100%', height: 260, background: '#F8F8F6' },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    background: '#C9873A',
    color: 'white',
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 6,
    letterSpacing: '0.04em',
  },
  cardBody: { padding: 20 },
  category: { fontSize: 11, fontWeight: 600, color: '#C9873A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 },
  productName: { fontSize: 17, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 },
  description: { fontSize: 13, color: '#6B6B6B', marginBottom: 16, lineHeight: 1.5 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 18, fontWeight: 700, color: '#1A1A1A' },
  stock: { fontSize: 12, color: '#6B6B6B' },
  empty: { textAlign: 'center', padding: '80px 0', color: '#6B6B6B' },
  ctaLink: { display: 'inline-block', marginTop: 16, color: '#C9873A', textDecoration: 'none', fontWeight: 500 },
}
