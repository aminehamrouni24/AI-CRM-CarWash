# Smart Garage System | نظام الكراج الذكي

A production-ready bilingual (Arabic/English) web application for Kuwait car workshops. This system converts WhatsApp chaos into structured leads and bookings, featuring a complete CRM pipeline and admin dashboard.

## Features

- **Bilingual Support**: Full Arabic (RTL) and English (LTR) support with language switcher
- **Public Website**: Marketing pages with services, booking form, and contact information
- **Lead Management**: Complete CRM pipeline with status tracking
- **Admin Dashboard**: Statistics, lead management, notes, and follow-up system
- **WhatsApp Integration**: Placeholder for WhatsApp Cloud API notifications
- **Secure Authentication**: Supabase Auth with Row Level Security (RLS)
- **Mobile-First Design**: Responsive design that works on all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works fine)

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. The database schema has already been created via migrations
3. Note your project's:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public Key

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: Replace the placeholder values with your actual Supabase credentials.

### 4. Database Setup

The database schema has been automatically created via Supabase migrations with the following tables:

#### Tables

1. **services** - Available garage services (8 services pre-seeded)
   - Oil Change, Diagnostics, AC Repair, Brakes, Battery, Tires, Suspension, Car Detailing

2. **leads** - Customer booking requests
   - Includes customer info, service selection, preferred date/time, and status tracking

3. **lead_notes** - Admin notes on leads
   - Timeline of communications and updates

#### Row Level Security (RLS)

RLS policies are already configured:
- **Public users** can view active services and submit booking requests
- **Authenticated admins** have full access to all data
- All sensitive operations require authentication

### 5. Create Admin User

To access the admin dashboard, create an admin user:

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Add user" and create an account with email/password
4. Use these credentials to log in at `/login`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### 7. Build for Production

```bash
npm run build
npm start
```

## Application Structure

### Public Pages

- **/** - Home page with hero, benefits, testimonials, and FAQ
- **/services** - Service listing with booking options
- **/book** - Booking form for customers
- **/contact** - Contact information and location
- **/privacy** - Privacy policy

### Admin Pages (Authentication Required)

- **/login** - Admin login
- **/admin** - Dashboard with statistics and recent leads
- **/admin/leads** - Lead management with search and filtering
- **/admin/leads/[id]** - Individual lead details with notes and status updates
- **/admin/settings** - Garage and WhatsApp settings (placeholder)

## Usage Guide

### For Customers

1. Visit the website and browse services
2. Click "Book Now" or select a specific service
3. Fill out the booking form with:
   - Full name and phone number (+965 format)
   - Car make/model (optional)
   - Service required
   - Preferred date and time (optional)
   - Additional notes (optional)
4. Submit the form and receive a booking reference ID
5. Contact via WhatsApp for confirmation

### For Admins

1. Log in at `/login` with your admin credentials
2. View dashboard statistics:
   - New leads today and this week
   - Conversion rate
   - Average response time
3. Manage leads:
   - View all leads with search and filtering
   - Update lead status through the pipeline:
     - NEW → CONTACTED → QUOTED → BOOKED → COMPLETED (or LOST)
   - Add notes and set follow-up reminders
   - Track the complete timeline of each lead
4. Configure settings:
   - Update garage information
   - Set WhatsApp notification templates (placeholder)

## Lead Status Pipeline

The CRM pipeline includes the following statuses:

1. **NEW** - Fresh lead from booking form
2. **CONTACTED** - Admin has reached out to the customer
3. **QUOTED** - Price quote provided to customer
4. **BOOKED** - Appointment confirmed
5. **COMPLETED** - Service completed successfully
6. **LOST** - Lead did not convert

## WhatsApp Integration

The system includes a placeholder API endpoint for WhatsApp notifications:

- Endpoint: `/api/notify-new-lead`
- Currently logs to console
- Ready for WhatsApp Cloud API integration
- Configurable message templates in admin settings

To integrate WhatsApp Cloud API:
1. Set up a WhatsApp Business Account
2. Obtain API credentials
3. Update the API endpoint with WhatsApp sending logic
4. Configure message templates in settings

## Localization

The application supports Arabic (default) and English:

- **Translation System**: Centralized in `/lib/i18n/translations.ts`
- **Language Switcher**: Available in all page headers
- **RTL Support**: Automatic direction switching
- **Persistent Preference**: Language choice saved to localStorage

To add or modify translations:
1. Edit `/lib/i18n/translations.ts`
2. Add keys to both `ar` and `en` objects
3. Use via `useLanguage()` hook: `const { t } = useLanguage()`

## Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Deploying to Other Platforms

The application is a standard Next.js app and can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted VPS

## Security Considerations

- **RLS Enabled**: All tables have Row Level Security enabled
- **Authentication Required**: Admin operations require valid session
- **Input Validation**: All forms validated with Zod
- **No Exposed Secrets**: Environment variables handled securely
- **Secure Sessions**: Handled by Supabase Auth

## Customization

### Branding

Update branding in:
- `/lib/i18n/translations.ts` - Site name and text content
- `/components/layout/Header.tsx` - Logo and header
- `/components/layout/Footer.tsx` - Footer content
- `/app/layout.tsx` - Page metadata and title

### Services

Services are stored in the database. To add/modify:
1. Go to Supabase Dashboard > Table Editor > services
2. Add or edit service entries with Arabic and English names/descriptions
3. Changes reflect immediately on the website

### Design

The application uses TailwindCSS. Customize colors and styling in:
- `/tailwind.config.ts` - Theme configuration
- `/app/globals.css` - Global styles
- Component files - Component-specific styles

## Troubleshooting

### Build Issues

If you encounter build errors:
1. Delete `.next` folder: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Run build: `npm run build`

### Database Connection Issues

If you can't connect to Supabase:
1. Verify environment variables are set correctly
2. Check Supabase project status in dashboard
3. Ensure anon key matches your project

### Authentication Issues

If admin login fails:
1. Verify admin user exists in Supabase Auth
2. Check email/password are correct
3. Ensure RLS policies are applied correctly

## Contributing

This is a production-ready MVP. To extend functionality:
1. Add new pages in `/app` directory
2. Create new components in `/components`
3. Extend database schema via Supabase migrations
4. Add new translations to `/lib/i18n/translations.ts`

## License

This project is proprietary software for Kuwait car workshops.

## Support

For issues or questions:
- Check the troubleshooting section
- Review Supabase documentation
- Check Next.js documentation

---

Built with ❤️ for Kuwait car workshops
