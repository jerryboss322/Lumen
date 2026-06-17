
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
    } else {
      router.push('/auth/login?registered=1')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '360px', padding: '32px', background: 'white', borderRadius: '16px', border: '1px solid #eee' }}>
        <h1 style={{ marginBottom: '24px' }}>Create account</h1>
        {error && <div style={{ color: 'red', marginBottom: '12px' }}>{error}</div>}
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <input type="password" placeholder="Password (min 6)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#C9873A', color: 'white', border: 'none', borderRadius: '8px' }}>Create Account</button>
        <p style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center' }}>Already have account? <a href="/auth/login" style={{ color: '#C9873A' }}>Sign in</a></p>
      </form>
    </div>
  )
}
