import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per IP per hour

// In-memory rate limit store (resets on function cold start)
// For production with high traffic, consider using Deno KV or external store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  // Clean up expired entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  if (!record || now > record.resetTime) {
    // New window or expired record
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  // Increment count
  record.count++;
  rateLimitStore.set(ip, record);
  return { allowed: true };
}

function getClientIP(req: Request): string {
  // Try various headers that might contain the real IP
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  // Fallback to a generic identifier
  return 'unknown';
}

// Valid options for select fields
const validBusinessTypes = ["servicos", "ecommerce", "saude", "imobiliario", "industria", "outro"];
const validPriorities = ["eficiencia", "leads", "reporting", "atendimento", "outro"];
const validBottlenecks = ["leads", "tarefas", "relatorios", "integracao", "atendimento", "outro"];

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function isValidUrl(url: string): boolean {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return url.length <= 500;
  } catch {
    return false;
  }
}

function sanitizeString(str: string, maxLength: number): string {
  return str.trim().slice(0, maxLength);
}

interface LeadFormData {
  nome: string;
  email: string;
  website?: string;
  tipo_negocio: string;
  prioridade_90_dias: string;
  maior_gargalo: string;
  autoriza_marketing: boolean;
  timestamp?: string;
  source?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Rate limiting check
  const clientIP = getClientIP(req);
  const rateCheck = checkRateLimit(clientIP);
  
  if (!rateCheck.allowed) {
    console.log('[RATE_LIMIT] Request blocked');
    return new Response(
      JSON.stringify({ 
        error: 'Demasiados pedidos. Por favor aguarde antes de tentar novamente.',
        retryAfter: rateCheck.retryAfter 
      }),
      { 
        status: 429, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Retry-After': String(rateCheck.retryAfter)
        } 
      }
    );
  }

  try {
    const body: LeadFormData = await req.json();
    console.log('[LEAD] Processing new submission');

    // Validate required fields
    if (!body.nome || typeof body.nome !== 'string') {
      console.log('[VALIDATION] Failed: missing required field');
      return new Response(
        JSON.stringify({ error: 'Nome é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.email || typeof body.email !== 'string' || !isValidEmail(body.email)) {
      console.log('[VALIDATION] Failed: invalid format');
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.website && !isValidUrl(body.website)) {
      console.log('[VALIDATION] Failed: invalid format');
      return new Response(
        JSON.stringify({ error: 'Website inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.tipo_negocio || !validBusinessTypes.includes(body.tipo_negocio)) {
      console.log('[VALIDATION] Failed: invalid option');
      return new Response(
        JSON.stringify({ error: 'Tipo de negócio inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.prioridade_90_dias || !validPriorities.includes(body.prioridade_90_dias)) {
      console.log('[VALIDATION] Failed: invalid option');
      return new Response(
        JSON.stringify({ error: 'Prioridade inválida' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.maior_gargalo || !validBottlenecks.includes(body.maior_gargalo)) {
      console.log('[VALIDATION] Failed: invalid option');
      return new Response(
        JSON.stringify({ error: 'Gargalo inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof body.autoriza_marketing !== 'boolean') {
      console.log('[VALIDATION] Failed: invalid type');
      return new Response(
        JSON.stringify({ error: 'Autorização de marketing é obrigatória' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize and prepare data
    const sanitizedData = {
      nome: sanitizeString(body.nome, 100),
      email: sanitizeString(body.email, 255).toLowerCase(),
      website: body.website ? sanitizeString(body.website, 500) : null,
      tipo_negocio: body.tipo_negocio,
      prioridade_90_dias: body.prioridade_90_dias,
      maior_gargalo: body.maior_gargalo,
      autoriza_marketing: body.autoriza_marketing,
      timestamp: new Date().toISOString(),
      source: body.source ? sanitizeString(body.source, 200) : 'unknown',
    };

    console.log('[LEAD] Data validated, processing...');

    // Initialize Supabase client with service role key for database operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[CONFIG] Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor incompleta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save lead to database
    const { error: dbError } = await supabase.from('leads').insert({
      nome: sanitizedData.nome,
      email: sanitizedData.email,
      website: sanitizedData.website,
      tipo_negocio: sanitizedData.tipo_negocio,
      prioridade_90_dias: sanitizedData.prioridade_90_dias,
      maior_gargalo: sanitizedData.maior_gargalo,
      autoriza_marketing: sanitizedData.autoriza_marketing,
      source: sanitizedData.source,
      ip_address: clientIP,
    });

    if (dbError) {
      console.error('[DB] Insert failed');
      // Continue to webhook even if DB fails - we don't want to lose the lead
    } else {
      console.log('[DB] Lead saved successfully');
    }

    // Forward to n8n webhook
    const webhookUrl = Deno.env.get('N8N_WEBHOOK_URL');
    
    if (!webhookUrl) {
      console.error('[CONFIG] Webhook URL not configured');
      // If we saved to DB, still return success
      if (!dbError) {
        return new Response(
          JSON.stringify({ success: true, message: 'Formulário enviado com sucesso' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor incompleta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get webhook authentication secret
    const webhookSecret = Deno.env.get('N8N_WEBHOOK_SECRET');
    
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(webhookSecret && { 'X-Webhook-Secret': webhookSecret }),
      },
      body: JSON.stringify(sanitizedData),
    });

    if (!webhookResponse.ok) {
      console.error('[WEBHOOK] Request failed');
      // If we saved to DB, still return success
      if (!dbError) {
        console.log('[LEAD] Saved to DB (webhook unavailable)');
        return new Response(
          JSON.stringify({ success: true, message: 'Formulário enviado com sucesso' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ error: 'Erro ao processar o formulário. Por favor tente novamente.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[LEAD] Submitted successfully');
    
    return new Response(
      JSON.stringify({ success: true, message: 'Formulário enviado com sucesso' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[ERROR] Failed to process submission');
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
