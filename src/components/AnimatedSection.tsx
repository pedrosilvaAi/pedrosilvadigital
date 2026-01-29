import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimationType = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "zoom-out"
  | "flip-up"
  | "flip-left"
  | "blur-in"
  | "scale-in";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animationClasses: Record<AnimationType, { initial: string; visible: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    initial: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
  "zoom-out": {
    initial: "opacity-0 scale-110",
    visible: "opacity-100 scale-100",
  },
  "flip-up": {
    initial: "opacity-0 rotateX-90",
    visible: "opacity-100 rotateX-0",
  },
  "flip-left": {
    initial: "opacity-0 rotateY-90",
    visible: "opacity-100 rotateY-0",
  },
  "blur-in": {
    initial: "opacity-0 blur-sm",
    visible: "opacity-100 blur-0",
  },
  "scale-in": {
    initial: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
};

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  const { initial, visible } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? visible : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Animated card with hover effects
interface AnimatedCardProps {
  children: ReactNode;
  index?: number;
  className?: string;
  hoverEffect?: "lift" | "glow" | "tilt" | "scale";
}

export function AnimatedCard({
  children,
  index = 0,
  className,
  hoverEffect = "lift",
}: AnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation();

  const hoverClasses = {
    lift: "hover:-translate-y-2 hover:shadow-xl",
    glow: "hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]",
    tilt: "hover:rotate-1",
    scale: "hover:scale-105",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        hoverClasses[hoverEffect],
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8",
        className
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Text reveal animation (word by word)
interface AnimatedTextProps {
  text: string;
  className?: string;
  wordDelay?: number;
}

export function AnimatedText({
  text,
  className,
  wordDelay = 50,
}: AnimatedTextProps) {
  const { ref, isVisible } = useScrollAnimation();
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-500",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
          style={{
            transitionDelay: `${index * wordDelay}ms`,
          }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

// Counter animation
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

// Need to import useState and useEffect
import { useState, useEffect } from "react";
