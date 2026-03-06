

# Plano: Transformar Landing Page para Agentes WhatsApp

## Resumo

Alterar o copy e conteúdo de 11 componentes, mantendo exactamente o mesmo design system, animações e estilos visuais. Sem alterações estéticas.

## Ficheiros a alterar

### 1. `src/components/Hero.tsx`
- Badge: "Agente WhatsApp com IA • Responde 24/7"
- Headline e sub-headline conforme especificado
- CTA principal: "Quero ver como funciona" + "15 minutos • Sem compromisso"
- CTA secundário: "Descarregar guia gratuito" + "Os 5 sinais que te custam clientes"

### 2. `src/components/SolutionsByDepartment.tsx`
- Remover toda a lógica de tabs/departamentos
- Substituir por 5 cards em sequência (flow horizontal desktop, vertical mobile) com numeração 01-05
- Cada card com ícone, título e descrição conforme especificado (MessageSquare, Bot, Target, Calendar, Bell)
- CTA final com Zap icon e copy "Nunca explicas tecnologia ao cliente."
- Manter a mesma estrutura visual de cards e animações

### 3. `src/components/IdealForSection.tsx`
- Alterar título para "Funciona para qualquer negócio que receba mensagens no WhatsApp"
- Substituir os 6 critérios pelos novos (clínicas, estética, imobiliárias, etc.)
- Ícones: Building2, Sparkles, Home, Dumbbell, PawPrint, Wrench
- Adicionar frase antes do CTA
- Manter botão CTA Calendly

### 4. `src/components/NotForSection.tsx`
- Alterar título para "Isto NÃO é para ti se..."
- Substituir 5 critérios por 4 novos conforme especificado
- Remover CTA e frase inferior (não mencionados no brief)

### 5. `src/components/Process.tsx`
- Alterar título para "Do primeiro contacto ao agente activo em menos de uma semana"
- Mudar de 3 para 4 passos com copy especificado
- Remover citação final

### 6. `src/components/GuideForm.tsx`
- Simplificar formulário: manter apenas Nome + Email
- Remover campos de website, tipo negócio, prioridade, gargalo
- Alterar título, sub-título, botão e nota de privacidade conforme especificado
- Manter checkbox de autorização de marketing

### 7. `src/components/roi-calculator/ROICalculatorSection.tsx` (+ re-export)
- Substituir completamente a calculadora ROI por uma secção de preços
- Criar novo componente `PricingSection` com dois blocos lado a lado
- Bloco "Setup" (€400-€600) e bloco "Manutenção Mensal" (€100-€150/mês)
- Listas de features com checks
- Frase de enquadramento + CTA Calendly

### 8. `src/components/About.tsx`
- Alterar título para "Quem está por trás disto"
- Substituir bio com novo copy (1ª pessoa singular)
- Substituir bloco "Soluções 100% Personalizadas" por 4 selos de credibilidade em grid

### 9. `src/components/FAQ.tsx`
- Substituir 8 perguntas por 6 novas conforme especificado

### 10. `src/components/FinalCTA.tsx`
- Alterar título, sub-título e CTA conforme especificado
- Remover link para guia gratuito (não mencionado no brief)

### 11. `src/components/Footer.tsx`
- Alterar nome para "Pedro Silva Digital"
- Adicionar tagline "Agentes WhatsApp com IA para negócios locais em Portugal 🇵🇹"

### 12. `src/components/Navbar.tsx`
- Actualizar navLinks: "Calculadora ROI" → "Preços", href `#calculadora` → `#precos`
- Actualizar label do CTA para "Quero ver como funciona"

### 13. `src/components/MobileCTA.tsx`
- Actualizar texto do botão para "Quero ver como funciona"

### 14. `src/pages/Index.tsx`
- Manter a mesma ordem de componentes (ROICalculator re-export aponta para a nova secção de preços)

## Notas técnicas
- Ícones novos necessários do lucide-react: Bot, Target, Calendar, Bell, PawPrint, Dumbbell, Home, Wrench (verificar disponibilidade)
- O componente ROICalculator será completamente reescrito como PricingSection mas mantido no mesmo ficheiro de re-export para não alterar imports
- Facebook Pixel e link Calendly mantidos intactos
- Todos os sub-componentes da roi-calculator (AssumptionsBlock, etc.) ficam órfãos mas não causam erros

