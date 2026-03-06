

# Plano: Substituir Preços por secção "Antes vs Depois"

## O que muda

Remover a secção de preços (Setup + Manutenção) e substituir por uma secção de contraste **"Sem agente vs Com agente"** — mais impactante porque mostra a dor real e o resultado, sem falar de dinheiro. Isto é mais persuasivo nesta fase (pré-vendas) do que listar features de um plano.

## Nova secção: "O que muda no teu negócio"

Dois blocos lado a lado:
- **Bloco esquerdo (vermelho/negativo)**: "Sem agente" — lista de 5 dores (mensagens perdidas, leads que esfriam, fins-de-semana sem resposta, tempo gasto a repetir informações, marcações esquecidas)
- **Bloco direito (verde/positivo)**: "Com agente" — lista de 5 resultados (resposta em segundos 24/7, leads qualificados automaticamente, agenda preenchida fora de horas, zero tempo em perguntas repetitivas, notificação só quando importa)

CTA no fundo: "Quero ver como funciona" → Calendly

## Ficheiros a alterar

1. **`src/components/roi-calculator/ROICalculatorSection.tsx`** — reescrever completamente com a nova secção "Antes vs Depois"
2. **`src/components/Navbar.tsx`** — alterar "Preços" → "Resultados" e href `#precos` → `#resultados`
3. **`src/pages/Index.tsx`** — sem alterações (o re-export mantém-se)

Mantém o mesmo design system (cards, AnimatedSection, useScrollAnimation, mesmos estilos de hover e borders).

