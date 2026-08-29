# StudyAI — production-minded MVP

This project is a polished frontend MVP for an AI study platform.

## What is included

- Responsive landing page
- AI explanation demo
- Free / Student Pro / Exam Pro pricing
- Premium feature positioning
- Security section
- Supabase-ready database schema with Row Level Security
- Clear path for authentication, AI, subscriptions and dashboard

## Run locally

1. Install Node.js 20+.
2. Open this folder in VS Code.
3. Run:
   npm install
   npm run dev
4. Open the local address shown by Next.js.

## Production architecture

Browser
  -> Next.js UI
  -> server-side API routes
  -> AI provider / payment provider
  -> Supabase Auth + Postgres

Never put AI secret keys, payment secret keys, or Supabase service-role keys in browser code.

## Required production work

1. Create a Supabase project and enable email authentication.
2. Run `supabase/schema.sql`.
3. Add `.env.local` with only public Supabase URL + publishable key for the browser.
4. Create server-only API routes for AI calls.
5. Add rate limiting and input-length limits to AI routes.
6. Integrate your chosen payment gateway using server-side checkout creation and webhook verification.
7. Let the verified webhook change the user's plan. Never trust a client-side "premium=true" value.
8. Add email verification, password reset and optional MFA.
9. Add monitoring, backups and abuse detection.
10. Before public launch, run dependency audits, security tests and authorization/RLS tests.

## Security model

- Authentication: Supabase Auth
- Authorization: Postgres RLS
- Secrets: server environment variables
- Payment status: trusted webhook only
- AI endpoint: server-side, rate-limited
- User data: isolated by `user_id`
- Input: validate, normalize and cap lengths
- Transport: production deployment must use HTTPS/TLS

This is an MVP foundation, not a claim of security certification or a substitute for a professional penetration test.
