'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Login(){
  const [e,setE]=useState(''),[p,setP]=useState(''),[err,setErr]=useState('')
  const r=useRouter()
  const submit=async(ev:React.FormEvent)=>{ev.preventDefault();const res=await signIn('credentials',{email:e,password:p,redirect:false});if(res?.error)setErr('Invalid');else r.push('/shop')}
  return(<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fafafa'}}><form onSubmit={submit} style={{width:360,padding:32,background:'white',borderRadius:16,boxShadow:'0 4px 24px rgba(0,0,0,.06)'}}><h1 style={{marginBottom:24}}>Welcome back</h1>{err&&<div style={{color:'red',marginBottom:12,fontSize:14}}>{err}</div>}<input type="email" placeholder="Email" value={e} onChange={ev=>setE(ev.target.value)} required style={{width:'100%',padding:12,marginBottom:12,border:'1px solid #ddd',borderRadius:8}}/><input type="password" placeholder="Password" value={p} onChange={ev=>setP(ev.target.value)} required style={{width:'100%',padding:12,marginBottom:16,border:'1px solid #ddd',borderRadius:8}}/><button style={{width:'100%',padding:12,background:'#C9873A',color:'white',border:'none',borderRadius:8}}>Sign In</button><p style={{marginTop:16,fontSize:14,textAlign:'center'}}>No account? <a href="/auth/register" style={{color:'#C9873A'}}>Sign up</a></p><div style={{marginTop:20,fontSize:12,padding:12,background:'#f9f9f9',borderRadius:8}}>Admin: jerryadewole2023@gmail.com / Sajnli25<br/>Customer: customer1@test.com / customer123</div></form></div>)
}