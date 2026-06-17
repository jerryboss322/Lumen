
# ATELIER Ecommerce - Production Ready

## Features Implemented
- ✓ NextAuth credentials (no localStorage)
- ✓ Role-based access: ADMIN vs CUSTOMER
- ✓ Only jerryadewole2023@gmail.com is admin
- ✓ Signup forces CUSTOMER role
- ✓ Middleware blocks /admin for customers
- ✓ Light and Peach themes (no dark mode)
- ✓ All buttons tested

## Setup
1. npm install
2. cp .env.example .env
3. npx prisma db push
4. npm run seed
5. npm run dev

## Test Accounts
Admin: jerryadewole2023@gmail.com / Sajnli25
Customer: customer1@test.com / customer123
