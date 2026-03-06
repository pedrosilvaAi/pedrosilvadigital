import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const SUBMIT_LEAD_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`;
const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

interface FormData {
  nome: string;
  email: string;
  autorizaMarketing: boolean;
}

export function GuideForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    autorizaMarketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.autorizaMarketing) {
      setError("Por favor, autorize o contacto para prosseguir.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SUBMIT_LEAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          website: null,
          tipo_negocio: "whatsapp-guide",
          prioridade_90_dias: "whatsapp-agent",
          maior_gargalo: "whatsapp-response",
          autoriza_marketing: formData.autorizaMarketing,
          source: window.location.origin,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro ao enviar formulário");
      }

      setIsSuccess(true);
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
      setError(err instanceof Error ? err.message : "Ocorreu um erro. Por favor tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="guia" className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <AnimatedSection animation="zoom-in">
              <div className="bg-card p-8 md:p-12 rounded-2xl border border-border shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-glow">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    ✅ Obrigado!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    O teu guia foi enviado para <strong className="text-foreground">{formData.email}</strong>.
                  </p>
                  <Button
                    variant="hero"
                    size="lg"
                    className="hover-glow whitespace-normal h-auto py-3"
                    onClick={() => window.open(CALENDLY_URL, "_blank")}
                  >
                    <span className="flex flex-col items-center leading-tight">
                      <span>Quero ver como funciona</span>
                      <span className="text-xs opacity-80 font-normal">15 minutos • Sem compromisso</span>
                    </span>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="guia" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm text-primary">Guia Gratuito</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Descobre se o teu negócio está a perder clientes pelo{" "}
              <span className="text-gradient">WhatsApp</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Descarrega o guia gratuito: Os 5 sinais que os donos de negócio ignoram — e quanto lhes custam por mês.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="zoom-in" delay={200}>
            <form onSubmit={handleSubmit} className="bg-card p-6 md:p-10 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              
              <div className="space-y-6 relative z-10">
                {/* Nome */}
                <div className="space-y-2 group">
                  <Label htmlFor="nome" className="group-focus-within:text-primary transition-colors">Nome *</Label>
                  <Input
                    id="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="O teu nome"
                    className="transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                  <Label htmlFor="email" className="group-focus-within:text-primary transition-colors">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@exemplo.pt"
                    className="transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]"
                  />
                </div>

                {/* Checkbox de Marketing */}
                <div className="flex items-start space-x-3 pt-2 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <Checkbox
                    id="autorizaMarketing"
                    checked={formData.autorizaMarketing}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, autorizaMarketing: checked === true })
                    }
                    className="mt-1"
                  />
                  <Label 
                    htmlFor="autorizaMarketing" 
                    className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                  >
                    Autorizo o envio do guia e contactos relacionados *
                  </Label>
                </div>

                {error && (
                  <p className="text-destructive text-sm animate-fade-in">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full group hover-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      A enviar...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                      Enviar o guia gratuito
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Sem spam. Cancelas quando quiseres.
                </p>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
