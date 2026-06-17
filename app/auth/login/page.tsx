
'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) {
      setError('Invalid credentials')
    } else {
      router.push('/shop')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '360px', padding: '32px', background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
        <h1 style={{ marginBottom: '24px' }}>Sign in</h1>
        {error && <div style={{ color: 'red', marginBottom: '12px', fontSize: '14px' }}>{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid var(--border)' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Sign In</button>
        <p style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center' }}>Don't have account? <a href="/auth/register" style={{ color: 'var(--accent)' }}>Sign up</a></p>
        <div style={{ marginTop: '20px', padding: '12px', background: '#f5f5f5', borderRadius: '8px', fontSize: '12px' }}>
          <strong>Test accounts:</strong><br/>
          Admin: jerryadewole2023@gmail.com / Sajnli25<br/>
          Customer: customer1@test.com / customer123
        </div>
      </form>
    </div>
  )
}
