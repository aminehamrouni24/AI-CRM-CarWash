/*
  # Smart Garage System - Initial Database Schema

  ## Overview
  Creates the core database structure for the Smart Garage booking and CRM system.
  
  ## New Tables
  
  ### 1. services
  Stores available garage services (Oil Change, Diagnostics, AC Repair, etc.)
  - `id` (uuid, primary key) - Unique service identifier
  - `name_ar` (text) - Service name in Arabic
  - `name_en` (text) - Service name in English
  - `description_ar` (text) - Service description in Arabic
  - `description_en` (text) - Service description in English
  - `is_active` (boolean) - Whether service is currently offered
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### 2. leads
  Stores customer booking requests and lead information
  - `id` (uuid, primary key) - Unique lead identifier
  - `full_name` (text, required) - Customer full name
  - `phone` (text, required) - Customer phone number
  - `car_make_model` (text) - Car make and model
  - `service_id` (uuid, foreign key) - References services table
  - `preferred_date` (date) - Customer's preferred service date
  - `preferred_time` (text) - Customer's preferred service time
  - `message` (text) - Additional message from customer
  - `status` (text) - Lead status: NEW, CONTACTED, QUOTED, BOOKED, COMPLETED, LOST
  - `follow_up_at` (timestamptz) - Follow-up reminder date
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### 3. lead_notes
  Stores admin notes and comments on leads
  - `id` (uuid, primary key) - Unique note identifier
  - `lead_id` (uuid, foreign key) - References leads table
  - `note` (text, required) - Note content
  - `created_by` (text) - Admin email who created the note
  - `created_at` (timestamptz) - Note creation timestamp
  
  ## Security
  - RLS will be enabled on all tables (policies in next migration)
  - Foreign key constraints ensure data integrity
  - Cascade delete on lead_notes when lead is deleted
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar text NOT NULL,
  name_en text NOT NULL,
  description_ar text NOT NULL,
  description_en text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  car_make_model text,
  service_id uuid REFERENCES services(id),
  preferred_date date,
  preferred_time text,
  message text,
  status text DEFAULT 'NEW',
  follow_up_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create lead_notes table
CREATE TABLE IF NOT EXISTS lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  note text NOT NULL,
  created_by text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
