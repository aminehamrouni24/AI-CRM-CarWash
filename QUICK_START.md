# Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to finish setting up (2-3 minutes)
4. Go to Project Settings > API
5. Copy:
   - Project URL
   - Anon public key

### Step 3: Configure Environment

Create `.env` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Database is Ready!

The database has been automatically set up with:
- ✅ All tables created
- ✅ Security policies configured
- ✅ 8 services pre-loaded (Oil Change, Diagnostics, AC Repair, etc.)

### Step 5: Create Admin User

1. In Supabase dashboard, go to Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Click "Create user"

### Step 6: Run the App

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## Test the System

### Public Side:
1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "احجز الآن" (Book Now)
3. Fill the form and submit
4. You'll get a booking reference ID

### Admin Side:
1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Login with your admin credentials
3. View the dashboard to see your new lead
4. Click on the lead to manage it

## Common Issues

### "Cannot connect to Supabase"
- Check your `.env` file has correct values
- Make sure your Supabase project is active

### "Login not working"
- Make sure you created an admin user in Supabase Auth
- Check email and password are correct

### "Build errors"
- Delete `.next` folder: `rm -rf .next`
- Try again: `npm run build`

## Next Steps

- Customize branding in `/lib/i18n/translations.ts`
- Update contact information in public pages
- Add your real WhatsApp number in components
- Deploy to Vercel (see README.md)

## Need Help?

Check the full [README.md](./README.md) for detailed documentation.
