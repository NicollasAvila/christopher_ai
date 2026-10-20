# Roadmap de Desenvolvimento — Cristopher AI

Plano iterativo dividido em 4 fases para validar valor rapidamente e evoluir até a aplicação completa.

---

## Visão Geral das Fases

```
[ Fase 1: Validação Rápida ] ➔ [ Fase 2: Pipeline Core ] ➔ [ Fase 3: Web App MVP ] ➔ [ Fase 4: Mockups & Vitrine ]
  - Dicionário de Prompts        - Integração com APIs        - Interface Web limpa       - Projeção em camisetas
  - Testes Manuais Midjourney    - Remoção de fundo auto      - Catálogo de estilos       - Modelos reais (vitrine)
  - Script CLI em Python         - Upscale 300 DPI            - Histórico de gerações     - Export para Instagram
```

---

## Fase 1: Validação Visual Gratuita (Hoje mesmo, R$ 0,00)
**Objetivo:** Comparar na prática os resultados do Ideogram e Recraft contra o ChatGPT atual, sem gastar 1 centavo.

- [x] Mapear catálogo de estilos nos 4 pilares gráficos da Christopher (Editorial, Bold, Stencil, Halftone).
- [x] Criar System Prompt especializado do "Diretor de Arte" ([docs/PROMPT_PIPELINE.md](file:///c:/Projetos/CRISTOPHER_AI/docs/PROMPT_PIPELINE.md)).
- [x] Montar script CLI funcional em Python ([scripts/prompt_director.py](file:///c:/Projetos/CRISTOPHER_AI/scripts/prompt_director.py)).
- [ ] O lojista testa os prompts gerados diretamente nas contas gratuitas do **Ideogram.ai** (para tipografia) e **Recraft.ai** (para vetor/stencil).
- [ ] Validação da melhora estética imediata em relação ao ChatGPT (DALL-E).

---

## Fase 2: Pós-Processamento Grátis & Aba "Importar Arte Externa"
**Objetivo:** Adicionar valor imediato ao fluxo de trabalho atual dele, automatizando o fechamento de arquivos sem custos.

- [x] Implementar módulo de **Luminance Knockout** em Python ([scripts/knockout.py](file:///c:/Projetos/CRISTOPHER_AI/scripts/knockout.py)):
  - Extração matemática do canal alpha de fundo preto/branco (100% determinístico, zero halos, $0.00 de custo).
- [ ] Criar fluxo para **Importar Arte Externa**:
  - Aceitar imagens geradas no ChatGPT/DALL-E ou Midjourney.
  - Aplicar knockout de fundo automático + exportar PNG 300 DPI (4096x4096px).
  - Preview imediato da estampa sobre as 3 malhas da marca (*Washed Black, Sand, Olive*).

---

## Fase 3: Web App com Hub Unificado (Fal.ai — Crédito Inicial ~$5)
**Objetivo:** Unificar geração e acabamento em uma interface web única sem assinaturas mensais.

- [ ] Conectar backend ao hub **Fal.ai**:
  - **Modo Rascunho (Brainstorming):** `FLUX.1 [schnell]` (~$0.003 por imagem / 1.5s).
  - **Modo Final Vetorial:** `Recraft V3` (~$0.08 para entrega em SVG vetorial limpo).
  - **Modo Final Tipográfico:** `Ideogram v2/v2a` (~$0.04 a $0.08 para versículos e letras em arco).
- [ ] Interface Web com preview interativo nas costas da camiseta oversized.
- [ ] Exportação com 1 clique do pacote completo:
  - Arquivo de produção (SVG ou PNG 300 DPI sem fundo).
  - Mockups automáticos para vitrine e Instagram.
- [ ] Download em lote: Arquivo de Impressão (300 DPI) + 3 fotos de Mockup para vitrine (feed Instagram, stories e site).
