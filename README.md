# Christopher AI — Estúdio de Criação & Produção Têxtil

Pipeline de IA sob medida para a marca **Christopher** (`@christopherr_rj`) — *Christian Heavyweight Streetwear* (Rio de Janeiro).

---

## 1. O Desafio da Marca

A Christopher possui uma identidade visual única no mercado de moda nacional:
* Estética **Heavyweight / Boxy Fit** de luxo urbano.
* Peças estonadas (*washed black, taupe, sand, olive*) com estampas **estritamente monocromáticas nas costas (Backprints)**.
* 4 pilares gráficos bem definidos: **Editorial Script**, **Bold Streetwear**, **Fine-Art Stencil/Woodcut** e **Vintage Halftone Sacro**.

**Gargalo atual:** A criação manual via ChatGPT gera artes coloridas genéricas de IA, sem acabamento de serigrafia, com fundos presos e baixa resolução para corte têxtil.

---

## 2. A Solução Automatizada

```
[ Ideia / Versículo / Frase ] ➔ [ Diretor de Arte LLM ] ➔ [ Ideogram v2 / Flux.1 ] ➔ [ Rembg + Upscale 4x ] ➔ [ PNG 300 DPI Alpha ]
   (Input do Lojista)         (Enquadra nos 4 Pilares)    (Gera estampa monocromática)   (Recorte & 4096px)      (Pronto p/ DTF/Silk)
```

---

## 3. Documentação Técnica

* [docs/BRAND_IDENTITY.md](file:///c:/Projetos/CRISTOPHER_AI/docs/BRAND_IDENTITY.md): Identidade de marca, modelagem, paleta de tecidos e regras dos 4 pilares visuais.
* [docs/PROMPT_PIPELINE.md](file:///c:/Projetos/CRISTOPHER_AI/docs/PROMPT_PIPELINE.md): System prompt do Diretor de Arte, templates de prompt por pilar e parâmetros de estamparia para Ideogram, Flux e Midjourney.
* [docs/ARCHITECTURE.md](file:///c:/Projetos/CRISTOPHER_AI/docs/ARCHITECTURE.md): Arquitetura de microsserviços, motores de imagem e critérios técnicos para impressão têxtil (300 DPI).
* [docs/ROADMAP.md](file:///c:/Projetos/CRISTOPHER_AI/docs/ROADMAP.md): Planejamento de implementação em 4 fases.
