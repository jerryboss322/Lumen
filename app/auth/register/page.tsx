'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong.')
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.heading}>Create account</h1>
        <p style={styles.sub}>Join LUMEN today</p>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>Full name</label>
        <input
          placeholder="Jane Doe"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link href="/auth/login" style={styles.link}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fafafa',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    padding: 36,
    background: 'white',
    borderRadius: 16,
    boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 4,
    color: '#1A1A1A',
  },
  sub: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 24,
  },
  error: {
    background: '#FEF2F2',
    color: '#B91C1C',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: '#1A1A1A',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    marginBottom: 16,
    border: '1px solid #E5E5E5',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    background: '#F8F8F6',
  },
  button: {
    width: '100%',
    padding: '13px',
    background: '#C9873A',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 4,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
    color: '#6B6B6B',
  },
  link: {
    color: '#C9873A',
    textDecoration: 'none',
    fontWeight: 500,
  },
}
