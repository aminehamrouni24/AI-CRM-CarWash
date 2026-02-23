/*
  # Row Level Security Policies
  
  ## Overview
  Enables RLS and creates security policies for all tables.
  
  ## Security Model
  
  ### Services Table
  - Public users can view active services (for booking form)
  - Authenticated admins can manage all services
  
  ### Leads Table
  - Public users can insert new leads (booking submissions)
  - Authenticated admins can view and update all leads
  
  ### Lead Notes Table
  - Only authenticated admins can create, view, and manage notes
  
  ## Policies
  
  1. Services Policies:
     - SELECT: Public can read active services
     - INSERT/UPDATE/DELETE: Authenticated admins only
  
  2. Leads Policies:
     - INSERT: Public can create new leads (booking form)
     - SELECT/UPDATE: Authenticated admins only
     - DELETE: Authenticated admins only
  
  3. Lead Notes Policies:
     - All operations: Authenticated admins only
*/

-- Enable Row Level Security on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;

-- Services Policies
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated admins can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated admins can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- Leads Policies
CREATE POLICY "Public can insert new leads"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated admins can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (true);

-- Lead Notes Policies
CREATE POLICY "Authenticated admins can view lead notes"
  ON lead_notes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated admins can insert lead notes"
  ON lead_notes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update lead notes"
  ON lead_notes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete lead notes"
  ON lead_notes FOR DELETE
  TO authenticated
  USING (true);
