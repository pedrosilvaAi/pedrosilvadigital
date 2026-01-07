import { Linkedin, Instagram, Mail } from "lucide-react";

// Placeholders: substituir pelos URLs reais
const EMAIL_CONTACTO = "{EMAIL_DE_CONTACTO}";
const LINKEDIN_URL = "{LINKEDIN_URL}";
const INSTAGRAM_URL = "{INSTAGRAM_URL}";

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo & Contact */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Pedro Silva
              </h3>
              <a
                href={`mailto:${EMAIL_CONTACTO}`}
                className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{EMAIL_CONTACTO}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Legal & GDPR */}
          <div className="mt-10 pt-8 border-t border-border text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </a>
              <span className="text-muted-foreground">|</span>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Termos de Serviço
              </a>
            </div>
            <p className="text-xs text-muted-foreground max-w-lg mx-auto">
              Os teus dados são tratados com confidencialidade e nunca partilhados com terceiros. Podes solicitar a remoção a qualquer momento.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              © {new Date().getFullYear()} Pedro Silva. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}