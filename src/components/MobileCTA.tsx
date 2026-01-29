import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/pedrosilvadigital/chamada-inicial";

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar após scrollar 100vh (passado o hero)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-md border-t border-border md:hidden">
      <Button
        variant="hero"
        size="lg"
        className="w-full"
        onClick={() => window.open(CALENDLY_URL, "_blank")}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Marcar Chamada
      </Button>
    </div>
  );
}