import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InputWithTooltipProps {
  id: string;
  label: string;
  tooltip: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  min?: number;
  max?: number;
  error?: string;
}

export function InputWithTooltip({
  id,
  label,
  tooltip,
  placeholder,
  value,
  onChange,
  suffix,
  min,
  max,
  error,
}: InputWithTooltipProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-foreground font-medium text-sm md:text-base">
          {label}
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-muted-foreground cursor-help hover:text-primary transition-colors flex-shrink-0" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="relative">
        <Input
          id={id}
          type="number"
          min={min}
          max={max}
          step="any"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`bg-background border-border focus:border-primary h-12 text-lg pr-12 ${error ? 'border-destructive' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
