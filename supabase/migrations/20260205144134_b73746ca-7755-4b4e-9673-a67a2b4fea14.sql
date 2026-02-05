-- Remove the existing policy that may be causing confusion
DROP POLICY IF EXISTS "Service role can manage leads" ON public.leads;

-- With RLS enabled and no permissive policies, only service_role (which bypasses RLS) can access
-- This is the secure state - leads are only managed by the edge function

-- Add an explicit deny-all policy for extra clarity (optional but documents intent)
CREATE POLICY "No public access to leads"
ON public.leads
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);