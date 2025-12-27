# 🚀 Deployment Guide (Vercel + Sanity)

Your project is ready to be deployed! Follow these steps to ensure a smooth deployment on Vercel.

## 1. Prepare Environment Variables
When you create your project on Vercel, you must add the following **Environment Variables** in the Vercel Dashboard (Settings -> Environment Variables).

| Variable Name | Value (Copy from your `.env.local`) |
|--------------|--------------------------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | *Your Sanity Project ID* |
| `NEXT_PUBLIC_SANITY_DATASET` | *Your Sanity Dataset (e.g., production)* |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | *Your Clerk Publishable Key* |
| `CLERK_SECRET_KEY` | *Your Clerk Secret Key (if used)* |
| `GMAIL_USER` | `binitegga2019@gmail.com` |
| `GMAIL_PASS` | *Your 16-char App Password* |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-10-15` (or check sanity/env.ts) |

**Important:** Do NOT commit your `.env.local` file to GitHub.

## 2. Sanity CORS Configuration (Crucial!)
For your deployed website to fetch data from Sanity, you must allow the Vercel domain.

1. Go to [sanity.io/manage](https://www.sanity.io/manage).
2. Select your project.
3. Go to **API** -> **CORS Origins**.
4. Click **Add CORS Origin**.
5. Content:
   - **Origin**: `https://your-project-name.vercel.app` (You'll get this URL after deploying)
   - **Allow credentials**: ✅ Yes
6. Save.

*Tip: You can also add `http://localhost:3000` here if it's not already added.*

## 3. Deploy to Vercel
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/new).
3. Import your GitHub repository.
4. **Build command**: `npm run build` (or leave default `next build`)
5. **Install command**: `npm install` (default)
6. **Environment Variables**: Add the variables from Step 1.
7. Click **Deploy**.

## 4. Post-Deployment Check
- Visit your new Vercel URL.
- **Test the Contact Form**: Send a message and check your email.
- **Check Sanity Content**: Verify that your portfolio items are loading.
- **Check Images**: Verify that images from Sanity are displaying correctly.
