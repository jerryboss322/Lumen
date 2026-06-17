import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

const prisma = new PrismaClient()

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  // Double-check role server-side — middleware also guards this
  if (!session || (session.user as any).role !== 'ADMIN') {
    redirect('/auth/login')
  }

  const [userCount, productCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
  ])

  const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } })

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  })

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>LUMEN</Link>
        <nav style={styles.nav}>
          <Link href="/shop" style={styles.navLink}>Shop</Link>
          <SignOutButton />
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.titleRow}>
          <div>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={styles.welcome}>Welcome, {session.user?.name}</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={styles.kpiGrid}>
          <div style={styles.kpiCard}>
            <div style={styles.kpiValue}>{userCount}</div>
            <div style={styles.kpiLabel}>Total Users</div>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiValue}>{adminCount}</div>
            <div style={styles.kpiLabel}>Admins</div>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiValue}>{productCount}</div>
            <div style={styles.kpiLabel}>Products</div>
          </div>
          <div style={styles.kpiCard}>
            <div style={styles.kpiValue}>{userCount - adminCount}</div>
            <div style={styles.kpiLabel}>Customers</div>
          </div>
        </div>

        {/* Recent Users Table */}
        <h2 style={styles.sectionTitle}>Recent Users</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(user => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.roleBadge,
                      background: user.role === 'ADMIN' ? '#FEF3C7' : '#F3F4F6',
                      color: user.role === 'ADMIN' ? '#92400E' : '#374151',
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  logo: { fontSize: 20, fontWeight: 700, letterSpacing: '0.08em', color: '#1A1A1A', textDecoration: 'none' },
  nav: { display: 'flex', alignItems: 'center', gap: 20 },
  navLink: { fontSize: 14, color: '#C9873A', textDecoration: 'none', fontWeight: 500 },
  main: { maxWidth: 1100, margin: '0 auto', padding: '40px 24px' },
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 },
  welcome: { fontSize: 14, color: '#6B6B6B' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 },
  kpiCard: {
    background: 'white',
    border: '1px solid #E5E5E5',
    borderRadius: 12,
    padding: 24,
  },
  kpiValue: { fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 },
  kpiLabel: { fontSize: 13, color: '#6B6B6B' },
  sectionTitle: { fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 16 },
  tableWrapper: { background: 'white', border: '1px solid #E5E5E5', borderRadius: 12, overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#F8F8F6' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: 12, fontWeight: 600, color: '#6B6B6B', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '1px solid #E5E5E5' },
  tr: { borderBottom: '1px solid #F5F5F5' },
  td: { padding: '14px 16px', fontSize: 14, color: '#1A1A1A' },
  roleBadge: { padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600 },
}
