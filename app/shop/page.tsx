import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
const prisma=new PrismaClient()
export default async function Shop(){
  const s=await getServerSession(authOptions);if(!s)redirect('/auth/login')
  const products=await prisma.product.findMany()
  return(<div style={{maxWidth:1200,margin:'0 auto',padding:40}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:24}}><h1>Shop</h1><div style={{fontSize:14,color:'#666'}}>{s.user?.email} • {(s.user as any).role}</div></div><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:24}}>{products.map(p=>(<div key={p.id} style={{border:'1px solid #eee',borderRadius:16,overflow:'hidden'}}><img src={p.image} alt={p.name} style={{width:'100%',height:280,objectFit:'cover'}}/><div style={{padding:16}}><h3 style={{marginBottom:4}}>{p.name}</h3><p style={{color:'#666',fontSize:14,marginBottom:8}}>{p.category}</p><p style={{fontWeight:600}}>₦{p.price.toLocaleString()}</p></div></div>))}</div></div>)
}