# LUMEN Ecommerce - Ready to Deploy

## Deploy to Vercel (3 minutes)

1. Push to GitHub:
```bash
git add .
git commit -m "Deploy ready"
git push
```

2. Go to vercel.com → Add New Project → Import jerryboss322/Lumen

3. Add Environment Variables:
- DATABASE_URL = (Vercel will auto-create Neon DB, or paste your Neon URL)
- NEXTAUTH_SECRET = any random 32-char string
- NEXTAUTH_URL = https://your-app.vercel.app

4. Deploy → Vercel runs build automatically

5. After deploy, run seed once:
```bash
vercel env pull
npx prisma db push
npm run seed
```

## Test Accounts
- Admin: jerryadewole2023@gmail.com / Sajnli25
- Customer: customer1@test.com / customer123

## Features
✓ No dark mode (light + peach only)
✓ NextAuth with roles
✓ Only you are admin
✓ Customers cannot access /admin
✓ All buttons tested
