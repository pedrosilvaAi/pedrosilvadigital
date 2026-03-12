import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

// Secure edge function endpoint
const SUBMIT_LEAD_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`;
const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

const businessTypes = [
  { value: "servicos", label: "Serviços" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "saude", label: "Saúde & Bem-estar" },
  { value: "imobiliario", label: "Imobiliário" },
  { value: "industria", label: "Indústria" },
  { value: "outro", label: "Outro" },
];

const priorities = [
  { value: "eficiencia", label: "Poupar tempo/eficiência" },
  { value: "leads", label: "Aumentar leads ou vendas" },
  { value: "reporting", label: "Melhorar controlo e reporting" },
  { value: "atendimento", label: "Melhorar atendimento/tempo de resposta" },
  { value: "outro", label: "Outro" },
];

const bottlenecks = [
  { value: "leads", label: "Gestão de leads e follow-up" },
  { value: "tarefas", label: "Tarefas repetitivas internas" },
  { value: "relatorios", label: "Relatórios e visibilidade" },
  { value: "integracao", label: "Comunicação entre ferramentas" },
  { value: "atendimento", label: "Atendimento ao cliente" },
  { value: "outro", label: "Outro" },
];

interface FormData {
  nome: string;
  email: string;
  website: string;
  tipoNegocio: string;
  prioridade: string;
  gargalo: string;
  autorizaMarketing: boolean;
}

export function GuideForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    website: "",
    tipoNegocio: "",
    prioridade: "",
    gargalo: "",
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
      // Enviar para edge function segura (com validação server-side)
      const response = await fetch(SUBMIT_LEAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          website: formData.website || null,
          tipo_negocio: formData.tipoNegocio,
          prioridade_90_dias: formData.prioridade,
          maior_gargalo: formData.gargalo,
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
                {/* Success glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-glow">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    ✅ Obrigado!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    O seu guia foi enviado para <strong className="text-foreground">{formData.email}</strong>.
                  </p>
                  <Button
                    variant="hero"
                    size="lg"
                    className="hover-glow whitespace-normal h-auto py-3"
                    onClick={() => window.open(CALENDLY_URL, "_blank")}
                  >
                    <span className="flex flex-col items-center leading-tight">
                      <span>Agendar diagnóstico gratuito</span>
                      <span className="text-xs opacity-80 font-normal">Acelere os seus resultados</span>
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
              Receba o Guia: Sugestões para Aplicar <span className="text-gradient">IA e Automações</span> no Seu Negócio
            </h2>
            <p className="text-lg text-muted-foreground">
              Preencha o formulário e receba por email um guia com 3–5 oportunidades práticas, quick wins e próximos passos sugeridos para o seu negócio.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="zoom-in" delay={200}>
            <form onSubmit={handleSubmit} className="bg-card p-6 md:p-10 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
              {/* Form glow effect */}
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
                    placeholder="O seu nome"
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

                {/* Website */}
                <div className="space-y-2 group">
                  <Label htmlFor="website" className="group-focus-within:text-primary transition-colors">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://www.exemplo.pt"
                    className="transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]"
                  />
                </div>

                {/* Tipo de Negócio */}
                <div className="space-y-2">
                  <Label htmlFor="tipoNegocio">Tipo de negócio *</Label>
                  <Select
                    required
                    value={formData.tipoNegocio}
                    onValueChange={(value) => setFormData({ ...formData, tipoNegocio: value })}
                  >
                    <SelectTrigger className="transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Prioridade */}
                <div className="space-y-2">
                  <Label htmlFor="prioridade">Maior prioridade nos próximos 90 dias *</Label>
                  <Select
                    required
                    value={formData.prioridade}
                    onValueChange={(value) => setFormData({ ...formData, prioridade: value })}
                  >
                    <SelectTrigger className="transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Gargalo */}
                <div className="space-y-2">
                  <Label htmlFor="gargalo">Maior gargalo hoje *</Label>
                  <Select
                    required
                    value={formData.gargalo}
                    onValueChange={(value) => setFormData({ ...formData, gargalo: value })}
                  >
                    <SelectTrigger className="transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {bottlenecks.map((bottleneck) => (
                        <SelectItem key={bottleneck.value} value={bottleneck.value}>
                          {bottleneck.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    Autorizo contactos para apresentação de serviços de IA e Automação *
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
                      Enviar e Receber Guia
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Sem spam. O guia é enviado automaticamente após o envio. Também pode marcar uma chamada diretamente.
                </p>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
