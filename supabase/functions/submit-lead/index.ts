import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

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

  try {
    const body: LeadFormData = await req.json();
    console.log('Received lead submission request');

    // Validate required fields
    if (!body.nome || typeof body.nome !== 'string') {
      console.log('Validation failed: nome is required');
      return new Response(
        JSON.stringify({ error: 'Nome é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.email || typeof body.email !== 'string' || !isValidEmail(body.email)) {
      console.log('Validation failed: invalid email');
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (body.website && !isValidUrl(body.website)) {
      console.log('Validation failed: invalid website URL');
      return new Response(
        JSON.stringify({ error: 'Website inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.tipo_negocio || !validBusinessTypes.includes(body.tipo_negocio)) {
      console.log('Validation failed: invalid tipo_negocio');
      return new Response(
        JSON.stringify({ error: 'Tipo de negócio inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.prioridade_90_dias || !validPriorities.includes(body.prioridade_90_dias)) {
      console.log('Validation failed: invalid prioridade');
      return new Response(
        JSON.stringify({ error: 'Prioridade inválida' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.maior_gargalo || !validBottlenecks.includes(body.maior_gargalo)) {
      console.log('Validation failed: invalid gargalo');
      return new Response(
        JSON.stringify({ error: 'Gargalo inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (typeof body.autoriza_marketing !== 'boolean') {
      console.log('Validation failed: autoriza_marketing must be boolean');
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

    console.log('Data validated and sanitized, forwarding to webhook');

    // Forward to n8n webhook
    const webhookUrl = Deno.env.get('N8N_WEBHOOK_URL');
    
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL not configured');
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor incompleta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook request failed:', webhookResponse.status);
      return new Response(
        JSON.stringify({ error: 'Erro ao processar o formulário. Por favor tente novamente.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Lead submitted successfully');
    
    return new Response(
      JSON.stringify({ success: true, message: 'Formulário enviado com sucesso' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing lead submission:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
