# Hanzi Check

A mobile-first Progressive Web App for scanning Chinese handwriting worksheets, grading the expected words, and showing red-pen style feedback.

## Stack

Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase (Postgres + Storage), Gemini 3.6 Flash, and a small manual PWA service worker.

## Run locally

1. Copy `.env.example` to `.env.local` and add the Supabase and Gemini credentials. Use the current `sb_publishable_…` and `sb_secret_…` keys from Supabase Settings → API Keys; never expose the secret key to browser code.
2. Create a public `worksheets` bucket in Supabase, then run `supabase/schema.sql` in its SQL editor.
3. Run `npm install` and `npm run dev`.

Without environment variables, the app deliberately stays demoable: uploads and grading use a safe mocked fallback, while the UI still follows the full capture → upload → grade → result pipeline. With configured keys, images are stored in Supabase and Gemini is used for image grading (with the same fallback if its response is unavailable).

## Deployment

Deploy to Vercel and set the four environment variables from `.env.example`. Add the Vercel URL here before submitting the assignment.

## Implementation notes

- The correction layer is deliberately approximate; it places readable red-pen correction labels over the captured worksheet rather than attempting fragile handwriting coordinates.
- Static dashboard metrics, payment, sharing, printing, and several nav destinations are presentation stubs, as allowed by the brief.
