# ⚡ QUICK START GUIDE

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Setup Environment (2 min)
```bash
# Copy template
cp .env.example .env.local

# Edit .env.local và điền:
# 1. OPENAI_API_KEY (bắt buộc) - Lấy từ platform.openai.com
# 2. DATABASE_URL (tùy chọn cho production)
# 3. NEXTAUTH_SECRET (generate với: openssl rand -base64 32)
```

### Step 3: Initialize Database (1 min)
```bash
npx prisma generate
npx prisma db push
```

### Step 4: Run Development Server (1 min)
```bash
npm run dev
```

### Step 5: Test! 🎉
Mở [http://localhost:3000](http://localhost:3000)

- ✅ Homepage loads
- ✅ Navigate to `/calculator` 
- ✅ Enter: Name = "Nguyen Van An", Birthdate = "1990-01-01"
- ✅ Click "Tính Thần Số Học"
- ✅ See AI-generated report!

## 🔑 Get OpenAI API Key (Required)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Log in
3. Click "API keys" → "Create new secret key"
4. Copy key starting with `sk-proj-...`
5. Paste into `.env.local`: `OPENAI_API_KEY=sk-proj-...`

**Cost**: ~$5 free credit, then pay-as-you-go (~$0.01 per request)

## 📋 Environment Variables Cheat Sheet

```bash
# REQUIRED - Won't work without this
OPENAI_API_KEY=sk-proj-your_key_here

# OPTIONAL - Use SQLite for development
DATABASE_URL="file:./dev.db"

# OPTIONAL - For authentication (not yet implemented)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_random_secret

# OPTIONAL - Display on website footer
NEXT_PUBLIC_BANK_NAME="Vietcombank"
NEXT_PUBLIC_BANK_ACCOUNT_NUMBER="1234567890"
NEXT_PUBLIC_BANK_ACCOUNT_HOLDER="NGUYEN VAN A"
```

## 🐛 Common Issues & Fixes

### Issue: "Module not found: Can't resolve '@prisma/client'"
```bash
npx prisma generate
```

### Issue: "Invalid API key"
- Check `.env.local` has correct `OPENAI_API_KEY`
- Restart server: Ctrl+C then `npm run dev`
- Verify key at platform.openai.com

### Issue: "Port 3000 already in use"
```bash
# Find and kill process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Issue: Database errors
```bash
# Reset database
npx prisma db push --force-reset
```

## 📱 Test All Features

### ✅ Homepage
- Hero section
- Features cards
- Call-to-action buttons

### ✅ Thần Số Học Calculator
1. Go to `/calculator`
2. Fill form: Name + Birthdate
3. Submit
4. View results with AI analysis

### ✅ Tử Vi
1. Go to `/tu-vi`
2. Fill form: Birthdate (+ optional time/place)
3. Submit
4. View horoscope results

### ✅ Premium Page
1. Go to `/premium`
2. View pricing tiers
3. See payment instructions

### ✅ Blog
1. Go to `/blog`
2. View sample articles

## 🎯 What Works Now

- ✅ Full homepage with responsive design
- ✅ Numerology calculator with AI analysis
- ✅ Horoscope/Tử vi calculator with AI
- ✅ Premium pricing page
- ✅ Blog listing page
- ✅ Responsive Navbar & Footer
- ✅ API routes for calculations
- ✅ Database schema ready

## ⏳ What's Not Implemented

- ❌ User login/register (can add later)
- ❌ Payment processing (manual verification not automated)
- ❌ Save reports to database (data not persisted)
- ❌ PDF download (premium feature)
- ❌ Admin dashboard
- ❌ Blog detail pages

**But**: The core product works! Users can use the calculator and horoscope features immediately.

## 🚀 Deploy to Vercel (5 mins)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to vercel.com → New Project
# 3. Import from GitHub
# 4. Add environment variables:
#    - OPENAI_API_KEY
#    - DATABASE_URL (if using Vercel Postgres)
#    - NEXTAUTH_URL (your production URL)
#    - NEXTAUTH_SECRET
#    - NEXT_PUBLIC_BANK_*

# 5. Deploy!
```

## 💡 Pro Tips

1. **Start simple**: Use free OpenAI tier first
2. **Use SQLite locally**: `DATABASE_URL="file:./dev.db"`
3. **Test thoroughly**: Try different names and dates
4. **Monitor costs**: Check OpenAI dashboard daily
5. **Get feedback**: Share with friends first

## 📖 Next Steps After Quick Start

1. **Read SETUP_GUIDE.md** - Detailed installation
2. **Read PROJECT_SUMMARY.md** - What's done, what's not
3. **Implement auth** - Add NextAuth for users
4. **Add payment** - Manual verification first
5. **Launch!** 🎉

## 🆘 Need Help?

1. Check `SETUP_GUIDE.md` for detailed instructions
2. Check `PROJECT_SUMMARY.md` for feature status
3. Review code comments (everything is documented)
4. Check Next.js/Prisma/OpenAI docs

## 🎉 You're Ready!

Your Vietnamese numerology & horoscope website is ready to run!

```bash
npm run dev
```

Happy coding! 🚀
