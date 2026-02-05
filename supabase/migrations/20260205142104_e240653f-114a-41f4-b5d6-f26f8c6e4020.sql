-- Create leads table to store form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  tipo_negocio TEXT NOT NULL,
  prioridade_90_dias TEXT NOT NULL,
  maior_gargalo TEXT NOT NULL,
  autoriza_marketing BOOLEAN NOT NULL DEFAULT false,
  source TEXT DEFAULT 'unknown',
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting leads (allows service role only - edge function uses service role)
-- No public insert policy since submissions go through the edge function
CREATE POLICY "Service role can manage leads"
ON public.leads
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Add index on email for faster lookups
CREATE INDEX idx_leads_email ON public.leads(email);

-- Add index on created_at for time-based queries
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);