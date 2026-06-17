import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.logo}>LUMEN</span>
        <div style={styles.headerLinks}>
          <Link href="/auth/login" style={styles.headerLink}>Sign In</Link>
          <Link href="/auth/register" style={styles.headerLinkPrimary}>Get Started</Link>
        </div>
      </header>

      <main style={styles.hero}>
        <p style={styles.eyebrow}>Quiet luxury, made to last</p>
        <h1 style={styles.headline}>Crafted for those<br />who know the difference</h1>
        <p style={styles.sub}>
          Timeless pieces, exceptional quality. No noise — just substance.
        </p>
        <div style={styles.actions}>
          <Link href="/auth/register" style={styles.primaryBtn}>
            Create Account
          </Link>
          <Link href="/auth/login" style={styles.secondaryBtn}>
            Sign In
          </Link>
        </div>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#FFFFFF', fontFamily: 'inherit' },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: 64,
    borderBottom: '1px solid #E5E5E5',
  },
  logo: { fontSize: 20, fontWeight: 700, letterSpacing: '0.1em', color: '#1A1A1A' },
  headerLinks: { display: 'flex', gap: 12, alignItems: 'center' },
  headerLink: { fontSize: 14, color: '#6B6B6B', textDecoration: 'none', fontWeight: 500 },
  headerLinkPrimary: {
    fontSize: 14,
    color: 'white',
    textDecoration: 'none',
    fontWeight: 600,
    background: '#C9873A',
    padding: '8px 18px',
    borderRadius: 8,
  },
  hero: {
    maxWidth: 680,
    margin: '0 auto',
    padding: '120px 24px 80px',
    textAlign: 'center',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#C9873A',
    marginBottom: 20,
  },
  headline: {
    fontSize: 'clamp(36px, 6vw, 60px)',
    fontWeight: 700,
    color: '#1A1A1A',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    marginBottom: 20,
  },
  sub: {
    fontSize: 17,
    color: '#6B6B6B',
    lineHeight: 1.6,
    marginBottom: 40,
  },
  actions: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
  primaryBtn: {
    padding: '14px 32px',
    background: '#C9873A',
    color: 'white',
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 15,
    textDecoration: 'none',
  },
  secondaryBtn: {
    padding: '14px 32px',
    border: '1px solid #E5E5E5',
    color: '#1A1A1A',
    borderRadius: 12,
    fontWeight: 500,
    fontSize: 15,
    textDecoration: 'none',
  },
}
