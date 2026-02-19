import { Linkedin, Instagram, Mail, Youtube, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMAIL_CONTACTO = "ai@pedrosilvadigital.pt";
const LINKEDIN_URL = "https://www.linkedin.com/in/pedro-silva-635854293";
const INSTAGRAM_URL = "https://www.instagram.com/pedrosilvadigital/";
const YOUTUBE_URL = "https://www.youtube.com/@pedrosilvadigital_ai";
const TIKTOK_URL = "https://www.tiktok.com/@pedrosilvadigital.pt";

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
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
              Os seus dados são tratados com confidencialidade e nunca partilhados com terceiros. Pode solicitar a remoção a qualquer momento.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              © {new Date().getFullYear()} Pedro Silva. Todos os direitos reservados.
            </p>
            
            {/* Back to Top Button */}
            <div className="mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                Voltar ao topo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
