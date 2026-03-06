

# Plano: Ajustes de copy e melhorias de conversão

## 1. Remover valores de preço (ROICalculatorSection.tsx)
Substituir a secção de preços por uma abordagem "consulta personalizada" — remover os valores €400-€600 e €100-€150/mês. Manter as listas de features e o CTA, mas em vez de preços concretos, usar algo como "Preço personalizado" ou simplesmente focar no valor entregue sem mencionar números.

## 2. Remover critério de exclusão (NotForSection.tsx)
Retirar "Ainda não tens um WhatsApp Business activo" da lista. Ficam 3 critérios.

## 3. Actualizar FAQ sobre tempo de implementação (FAQ.tsx)
Alterar a resposta de "Quanto tempo demora a implementar?" para reflectir que depende da configuração específica do negócio e de processos externos.

## 4. Sugestões de melhoria para conversão

Proponho estas melhorias adicionais (sem alterar o design):

- **Social proof no Hero**: Adicionar uma linha subtil tipo "Já utilizado por negócios em Lisboa, Porto e Algarve" abaixo do sub-headline para criar prova social imediata
- **Urgência no FinalCTA**: Reforçar a escassez com "Aceito apenas 5 novos clientes por mês" ou similar
- **Micro-copy no GuideForm**: Adicionar "Mais de X pessoas já descarregaram" (quando tiveres dados reais)
- **Âncora de preço na secção de preços**: Em vez de mostrar valores, usar comparação tipo "Menos do que contratar um estagiário a tempo parcial" para dar contexto sem revelar preços

Estas são sugestões — implemento apenas as que aprovares.

## Ficheiros a alterar
1. `src/components/roi-calculator/ROICalculatorSection.tsx` — remover valores, reformular cards
2. `src/components/NotForSection.tsx` — remover 1 critério
3. `src/components/FAQ.tsx` — actualizar resposta

