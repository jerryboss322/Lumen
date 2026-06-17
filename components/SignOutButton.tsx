'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/auth/login' })}
      style={{
        padding: '8px 16px',
        background: 'transparent',
        border: '1px solid #E5E5E5',
        borderRadius: 8,
        fontSize: 13,
        color: '#6B6B6B',
        cursor: 'pointer',
        fontWeight: 500,
      }}
    >
      Sign out
    </button>
  )
}
