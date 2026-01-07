import pedroSilva from "@/assets/pedro-silva.jpg";

const tools = [
  "n8n",
  "Make",
  "Zapier",
  "Google Analytics 4",
  "Google Ads",
  "Meta Ads",
  "Shopify",
  "Notion",
  "Google Sheets",
];

export function About() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Quem Somos
          </h2>

          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-background">
                <img
                  src={pedroSilva}
                  alt="Pedro Silva - Consultor de Automação e IA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Ajudamos empresas a implementar automações e IA de forma prática e sustentável. Com experiência em marketing digital, IA e automações, focamo-nos em construir sistemas que funcionam e podem escalar.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                O nosso método: <strong>ouvir, planear, executar e otimizar</strong>. Sem promessas vazias, sem complexidade desnecessária.
              </p>

              {/* Tools */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Exemplos de ferramentas que usamos:
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 text-xs font-medium bg-background text-muted-foreground rounded-full border border-border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}