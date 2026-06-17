'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Register(){
  const [f,setF]=useState({name:'',email:'',password:''}),[err,setErr]=useState('')
  const r=useRouter()
  const submit=async(ev:React.FormEvent)=>{ev.preventDefault();const res=await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)});if(!res.ok){setErr((await res.json()).error)}else{r.push('/auth/login')}}
  return(<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fafafa'}}><form onSubmit={submit} style={{width:360,padding:32,background:'white',borderRadius:16}}><h1 style={{marginBottom:24}}>Create account</h1>{err&&<div style={{color:'red',marginBottom:12}}>{err}</div>}<input placeholder="Name" value={f.name} onChange={e=>setF({...f,name:e.target.value})} required style={{width:'100%',padding:12,marginBottom:12,border:'1px solid #ddd',borderRadius:8}}/><input type="email" placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} required style={{width:'100%',padding:12,marginBottom:12,border:'1px solid #ddd',borderRadius:8}}/><input type="password" placeholder="Password" value={f.password} onChange={e=>setF({...f,password:e.target.value})} required style={{width:'100%',padding:12,marginBottom:16,border:'1px solid #ddd',borderRadius:8}}/><button style={{width:'100%',padding:12,background:'#C9873A',color:'white',border:'none',borderRadius:8}}>Create</button></form></div>)
}