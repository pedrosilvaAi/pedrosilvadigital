

## Refocagem do website + secção "Em breve"

### Resumo

Refocar toda a comunicação do website para os setores de Eletricidade, Construção Civil, HVAC, Energia Solar e Águas, em parceria com Typeble.com (startup de engenharia e software). Substituir as soluções genéricas por departamento pelo sistema principal de orçamentação com IA, e adicionar uma secção "Funcionalidades em breve" com as features ainda não confirmadas.

### Ficheiros e alterações

**1. `src/components/Hero.tsx`**
- Badge: "Automação & IA para Engenharia e Construção"
- Headline: focado em "De plantas AutoCAD a pré-orçamentos em menos de 24 horas"
- Subtítulo: sistema que lê plantas 2D/3D, extrai quantidades, verifica erros e omissões, pede cotações a fornecedores
- Manter CTAs existentes

**2. `src/components/SolutionsByDepartment.tsx`**
- Remover sistema de tabs por departamento
- Substituir por grid de funcionalidades principais do sistema:
  - Leitura de Plantas AutoCAD (2D e 3D)
  - Extração de Mapa de Quantidades
  - Verificação de Erros e Omissões
  - Pedidos de Cotação Automáticos (emails a fornecedores)
  - Pré-Orçamentação em <24h
- Adicionar secção "Funcionalidades em Desenvolvimento" com badge "Em breve" e estilo visual distinto (ex: cards com opacidade reduzida ou badge):
  - Gestão de Obras e Projetos — Tracking de progresso, alocação de equipas no terreno, controlo de prazos
  - Gestão de Equipas Técnicas — Agendamento de intervenções, roteiros otimizados, relatórios de serviço digitais
  - Manutenção Preventiva — Alertas automáticos de manutenção, histórico de equipamentos, agendamento de revisões
  - Faturação e Controlo de Custos — Faturação automática por obra/projeto, controlo de margens em tempo real
  - Reporting e Dashboards — Visibilidade em tempo real de KPIs por obra, equipa e projeto
- Título da secção: "O Nosso Sistema" ou "Como Funciona o Sistema"

**3. `src/components/About.tsx`**
- Atualizar texto para mencionar parceria com Typeble.com (startup de engenharia e software)
- Atualizar setores listados: eletricidade, construção civil, HVAC, energia solar, águas
- Adicionar link para Typeble.com (target="_blank")

**4. `src/components/Navbar.tsx`**
- Atualizar logo/nome para refletir parceria: "Pedro Silva × Typeble" ou similar

**5. `src/components/IdealForSection.tsx`**
- Adaptar perfis para: empresas de instalações elétricas, construtoras, HVAC/climatização, energia solar, águas/saneamento, gabinetes de engenharia

**6. `src/components/NotForSection.tsx`**
- Adaptar critérios de exclusão para o contexto de engenharia/construção

**7. `src/components/FAQ.tsx`**
- Atualizar perguntas para o contexto: tipos de plantas suportadas, como funciona a extração, tempo de orçamentação, setores-alvo

**8. `src/components/GuideForm.tsx`**
- Atualizar businessTypes para novos setores
- Adaptar bottlenecks e prioridades para dores destes setores

**9. `src/components/Process.tsx`**
- Adaptar passos ao novo contexto (diagnóstico → configuração → implementação)

**10. `src/components/FinalCTA.tsx`**
- Adaptar copy para "Pronto para automatizar a sua orçamentação?"

**11. `src/components/Footer.tsx`**
- Adicionar "Em parceria com Typeble.com" com link

**12. `src/components/ROICalculator.tsx` / subcomponentes**
- Adaptar copy e tooltips para contexto de construção/engenharia

### Notas técnicas
- Todas as alterações são de copy/conteúdo, sem mudanças de stack
- Links Typeble.com: `target="_blank" rel="noopener noreferrer"`
- Cards "Em breve" terão um badge visual e estilo ligeiramente diferente (ex: border dashed, opacidade, ou badge "Em breve") para os distinguir das funcionalidades ativas

