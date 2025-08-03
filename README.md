# NextAuth.js Authentication System

A complete authentication system built with Next.js 15 and NextAuth.js v5, featuring user registration, login, role-based access control, and middleware protection.

## Features

- **Multiple Authentication Methods**
  - Email/Password credentials
  - Google OAuth
  - GitHub OAuth
- **User Management**
  - User registration with validation
  - Secure password hashing with bcrypt
  - MongoDB integration with Mongoose
- **Role-Based Access Control**
  - User and Admin roles
  - Protected routes with middleware
  - Admin-only areas
- **Security Features**
  - JWT session management
  - Password field exclusion from queries
  - Middleware route protection

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Password Hashing**: bcryptjs
- **TypeScript**: Full type safety

## Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd next-auth
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
NEXTAUTH_SECRET=your-secret-key
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret
MONGODB_URI=your-mongodb-connection-string
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth API routes
│   │   └── register/               # User registration API
│   ├── login/                      # Login page
│   └── provider/                   # Session provider
├── auth.ts                         # NextAuth configuration
├── middleware.js                   # Route protection
├── userModel.js                    # MongoDB user schema
└── utils/
    └── checkUtils.ts              # Authentication utilities
```

## API Routes

- `POST /api/register` - User registration
- `GET/POST /api/auth/*` - NextAuth endpoints

## Authentication Flow

1. **Registration**: Users register via `/api/register`
2. **Login**: Multiple options via NextAuth providers
3. **Session**: JWT-based session management
4. **Protection**: Middleware guards protected routes
5. **Authorization**: Role-based access control

## Deployment

Deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

MIT License