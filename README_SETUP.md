# 🌿 HairGrow App - Setup Guide

Your personal hair regrowth tracker app is ready! Follow these steps to get it running.

---

## ✅ What's Already Done

- ✅ Vite + React project setup
- ✅ All components built (Today, Yoga, Week, Progress tabs)
- ✅ Authentication screens (Login/Signup)
- ✅ Supabase client configured
- ✅ Dark theme with green accents
- ✅ Mobile-first design (max-width 430px)
- ✅ PWA manifest for iPhone installation

---

## 📋 Next Steps

### 1. Set Up Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in:
   - **Name**: HairGrow
   - **Database Password**: (choose a strong password - save it!)
   - **Region**: Choose closest to you
4. Click "Create new project" (takes ~2 minutes)

### 2. Get Your Supabase Credentials

1. Once project is ready, click on "Settings" (⚙️ icon in sidebar)
2. Click "API" in the settings menu
3. You'll see:
   - **Project URL** (starts with `https://xxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
4. Copy both values

### 3. Update Your Environment Variables

1. Open `.env.local` file in your project
2. Replace the placeholder values with your actual Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Set Up Database Tables

1. In Supabase dashboard, click "SQL Editor" in the sidebar
2. Click "New query"
3. Open the `database-setup.sql` file in this project
4. Copy ALL the SQL code
5. Paste it into the Supabase SQL Editor
6. Click "Run" (bottom right)
7. You should see success messages for all tables

### 5. Enable Google Authentication (Optional)

If you want Google login:

1. In Supabase, go to "Authentication" → "Providers"
2. Find "Google" and toggle it on
3. Follow the setup instructions (you'll need Google Cloud Console)
4. Or skip this and just use email/password authentication

### 6. Run the App Locally

In your terminal, navigate to the project folder:

```bash
cd ~/Downloads/Personal/Hair/hairgrow
npm run dev
```

The app should open at `http://localhost:5173`

---

## 🧪 Testing Your App

1. **Sign Up**: Create a new account with email + password
2. **Check Email**: Supabase will send a confirmation email
3. **Confirm Email**: Click the link in the email
4. **Sign In**: Go back to the app and sign in
5. **Test Features**:
   - Click tasks in Today tab to check them off
   - Mark yoga poses as done
   - View the weekly schedule
   - Add progress scores for Month 1

---

## 📱 Installing on iPhone

Once the app works locally, you can deploy it and install on your iPhone:

1. **Deploy to Vercel** (free):
   - Push code to GitHub
   - Connect GitHub repo to Vercel
   - Add environment variables in Vercel settings
   - Deploy!

2. **Install on iPhone**:
   - Open the deployed URL in Safari
   - Tap the Share button
   - Tap "Add to Home Screen"
   - The app will appear as a native app icon

---

## 🗂️ Project Structure

```
hairgrow/
├── src/
│   ├── components/
│   │   ├── Auth/           # Login & Signup screens
│   │   ├── Today/          # Daily checklist tab
│   │   ├── Yoga/           # Yoga poses tab
│   │   ├── Week/           # Weekly schedule tab
│   │   ├── Progress/       # Monthly progress tab
│   │   └── Layout/         # Header, TipBanner, BottomNav
│   ├── hooks/
│   │   ├── useAuth.js      # Authentication logic
│   │   ├── useChecks.js    # Daily tasks logic
│   │   ├── useYoga.js      # Yoga sessions logic
│   │   └── useProgress.js  # Progress scores logic
│   ├── lib/
│   │   └── supabase.js     # Supabase client
│   ├── constants/
│   │   └── data.js         # All static data (poses, tips, schedule)
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .env.local              # Your Supabase credentials (NOT committed to git)
├── database-setup.sql      # Database schema for Supabase
└── README_SETUP.md         # This file
```

---

## 🎨 Theme Colors

- **Primary Green**: `#2ecc71`
- **Dark Green**: `#1a7a4a`
- **Background**: `#0a1628`
- **Muted**: `#718fa0`
- **Text**: `#e8f4f0`

---

## 🧘 Weekly Schedule (Hardcoded)

- **Monday**: Oil Night (Rosemary + Coconut)
- **Tuesday**: Head Bath + Onion Juice
- **Wednesday**: Oil Night (Rosemary + Coconut)
- **Thursday**: Head Bath (Light massage only)
- **Friday**: Oil Night (Castor Oil)
- **Saturday**: Head Bath + Onion Juice
- **Sunday**: Rest Day (Gentle dry massage)

---

## 🆘 Troubleshooting

### App won't start
- Make sure you ran `npm install` first
- Check that `.env.local` has correct Supabase credentials

### Can't sign in
- Check if you confirmed your email
- Verify database tables were created (step 4)
- Check Supabase logs in dashboard

### Tasks not saving
- Check browser console for errors
- Verify RLS policies were created in database
- Make sure you're signed in

### Need help?
- Check HAIRGROW_BRIEF.md for full context
- Review the code in each component
- Check Supabase logs for database errors

---

## 🚀 What's Next?

After you get it working:
1. Use it daily for at least 1 month
2. Track your progress with monthly photos
3. Deploy to Vercel
4. Install on your iPhone home screen
5. Stay consistent with the routine!

Good luck on your hair regrowth journey! 🌿💪
