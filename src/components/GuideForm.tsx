import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Send } from "lucide-react";

// URL do webhook (n8n, Make, Zapier, etc.)
const WEBHOOK_URL = "https://n8n.srv1236652.hstgr.cloud/webhook-test/e39a61e4-df5a-4305-89ce-612cc92c6fb2";
const CALENDLY_URL = "https://calendly.com/pmgs5-ai/chamada-inicial?month=2026-01";

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
  tipoNegocio: string;
  prioridade: string;
  gargalo: string;
}

export function GuideForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    tipoNegocio: "",
    prioridade: "",
    gargalo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Enviar para webhook externo (n8n, Make, Zapier, etc.)
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Permite envio sem CORS
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          tipo_negocio: formData.tipoNegocio,
          prioridade_90_dias: formData.prioridade,
          maior_gargalo: formData.gargalo,
          timestamp: new Date().toISOString(),
          source: window.location.origin,
        }),
      });

      // Com no-cors não conseguimos verificar a resposta, assumimos sucesso
      setIsSuccess(true);
    } catch (err) {
      console.error("Erro ao enviar para webhook:", err);
      setError("Ocorreu um erro. Por favor tenta novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="guia" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-card p-8 md:p-12 rounded-2xl border border-border shadow-lg">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
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
                onClick={() => window.open(CALENDLY_URL, "_blank")}
              >
                Marcar Chamada para Acelerar Resultados
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="guia" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recebe o Guia: Sugestões para Aplicares IA e Automações no Teu Negócio
            </h2>
            <p className="text-lg text-muted-foreground">
              Preenche o formulário e recebe por email um guia com 3–5 oportunidades práticas, quick wins e próximos passos sugeridos para o teu negócio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card p-6 md:p-10 rounded-2xl border border-border shadow-lg">
            <div className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="O teu nome"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email (opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.pt"
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
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona uma opção" />
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
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona uma opção" />
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
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona uma opção" />
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

              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "A enviar..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar e Receber Guia
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Sem spam. O guia é enviado automaticamente após o envio. Também podes marcar uma chamada diretamente.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}