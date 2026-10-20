# Pipeline de Prompts Especializado — Christopher (@christopherr_rj)

Engenharia de prompt calibrada estritamente para o DNA de *Christian Heavyweight Streetwear* da Christopher.

---

## 1. System Prompt do "Diretor de Arte Christopher" (LLM)

Injetar este contexto no LLM para transformar as ideias do lojista nos 4 pilares gráficos da marca:

```markdown
Você é o Diretor de Arte Sênior da marca de vestuário "Christopher" (@christopherr_rj), especializada em Christian Luxury Heavyweight Streetwear no Rio de Janeiro.
Lema da marca: "Aquele que carrega Cristo".
Sua tarefa é receber uma ideia simples em português (tema bíblico, versículo ou frase de fé) e gerar os prompts técnicos em inglês otimizados para motores de imagem (Ideogram v2, Flux.1 ou Midjourney v6).

### DIRETRIZES ESTÉTICAS INEGOCIÁVEIS:
1. ARTE ISOLADA PARA COSTAS (BACKPRINT): NUNCA gere uma camiseta, modelo humano, dobras de tecido ou mockups. Gere unicamente o gráfico/arte final.
2. MONOCROMÁTICO RIGOROSO: A estampa é impressa em 1 única cor de tinta.
   - Para camisetas escuras (Washed Black / Olive / Coffee): estampa em tinta BRANCA PURA isolada em fundo preto sólido.
   - Para camisetas claras (Sand / Off-White / Taupe): estampa em tinta PRETA/GRAFITE isolada em fundo branco sólido.
3. SEM CARTOON OU CORES VIBRANTES: Proibido traços infantis, 3D plástico, anime ou cores saturadas.
4. OS 4 PILARES OBRIGATÓRIOS: Enquadre a ideia sempre em um dos 4 pilares:
   - 1. Editorial Tipográfico (Serif de luxo + Caligrafia Script cursiva fluida)
   - 2. Bold Streetwear Impact (Sans-serif condensada gigante + arco + selos ovais)
   - 3. Fine-Art Stencil & Engraving (Xilogravura/woodcut sacro de alto contraste)
   - 4. Vintage Halftone Sacro (Pintura renascentista pontilhada/stipple com bordas inferiores em airbrush fade)

### FORMATO DE SAÍDA EXIGIDO (JSON):
{
  "pillar_used": "1_editorial_script | 2_bold_impact | 3_fine_art_stencil | 4_vintage_halftone",
  "recommended_engine": "ideogram-v2 | flux-1-dev",
  "aspect_ratio": "3:4 | 4:5",
  "background_color": "pure_black | pure_white",
  "optimized_prompt": "<prompt detalhado em inglês>",
  "negative_prompt": "<termos proibidos>",
  "midjourney_command": "/imagine prompt: <prompt> <negative_flags> --ar 4:5 --v 6.1"
}
```

---

## 2. Modelos de Prompts por Pilar Gráfico

### Pilar 1: Editorial Tipográfico (Serif + Script)
* **Caso de Uso:** Frases devocionais verticais de grande impacto poético (ex: *"Jesus não desistiu de mim Naquela Cruz"*).
* **Motor Recomendado:** `ideogram-v2` (melhor renderização de tipografia).
* **Estrutura de Prompt:**
  ```text
  Luxury streetwear backprint graphic design, featuring high-contrast vertical typography layout.
  Contrasting elegant high-fashion serif typeface with fluid expressive script calligraphy lettering spelling out '{TEXTO}'.
  Clean balanced editorial poster composition, minimal Roman numerals, subtle biblical chapter reference '{VERSÍCULO}'.
  Monochrome ink design, crisp vector contours, pure flat color, completely isolated on solid {COR_DE_FUNDO} background, no garment, no mockup.
  ```

### Pilar 2: Bold Streetwear Impact (Condensed Sans + Arch)
* **Caso de Uso:** Afirmações de fé robustas em caixa alta (ex: *"JESUS HAS MY BACK — ROMANOS 8:31"*).
* **Motor Recomendado:** `ideogram-v2`.
* **Estrutura de Prompt:**
  ```text
  Heavyweight streetwear apparel back graphic, featuring massive ultra-bold condensed sans-serif lettering spelling '{TEXTO}' arched across the top.
  Minimalist brutalist technical details, small oval Christian crest badge at the bottom, chapter citation '{VERSÍCULO}'.
  Raw underground street aesthetic, high-impact monochrome screenprint artwork, sharp clean edges, isolated on flat solid {COR_DE_FUNDO} background, no folds, no t-shirt.
  ```

### Pilar 3: Fine-Art Stencil & Engraving (Woodcut Sacro)
* **Caso de Uso:** Narrativas e parábolas bíblicas em gravura clássica (ex: *"He left the 99 for me"* — pastor e ovelhas).
* **Motor Recomendado:** `flux-1-dev` ou `ideogram-v2`.
* **Estrutura de Prompt:**
  ```text
  Intricate medieval woodcut engraving and linocut stencil illustration of {CENA_BÍBLICA}.
  Strictly two-tone high contrast artwork, stark black and white etching lines, expressive cross-hatching shadows, classic Albrecht Dürer sacred engraving aesthetic.
  Fine serif text underneath reading '{TÍTULO_E_VERSÍCULO}'.
  Pure line art graphic, no grey tones, isolated on clean solid {COR_DE_FUNDO} background, screen print ready vector asset.
  ```

### Pilar 4: Vintage Halftone Sacro (Renaissance Airbrush Fade)
* **Caso de Uso:** Releituras de quadros clássicos e passagens de Cristo (ex: *"In Memory of Me — A Última Ceia"*).
* **Motor Recomendado:** `ideogram-v2` ou `flux-1-dev`.
* **Estrutura de Prompt:**
  ```text
  Vintage sacred renaissance artwork of {CENA_SACRA}, converted into high-contrast monochrome halftone dot stipple screen print.
  Arched classical Roman serif title arched over the scene reading '{TÍTULO}'.
  Crucial: the bottom and outer edges of the illustration must softly dissolve into feathered airbrush spray fade and stipple gradient into the background.
  Washed vintage monochrome aesthetic, isolated on solid {COR_DE_FUNDO} background, apparel graphic print asset.
  ```

---

## 3. Parâmetros Específicos para Midjourney v6.1

Se o lojista optar por gerar testes diretamente no Midjourney via Discord, o prompt deve anexar obrigatoriamente estes sufixos:

```text
--ar 4:5 --v 6.1 --style raw --no t-shirt, mockup, fabric, folds, model, person wearing clothes, colorful, 3d, realistic skin, cartoon, anime, hanger
```

* **`--ar 4:5`:** Proporção vertical ideal para estampa das costas (*Backprint*).
* **`--style raw`:** Evita o pós-processamento fotográfico saturado e cinematográfico padrão do Midjourney, preservando traço gráfico seco.
* **`--no ...`:** Elimina a tendência da IA de desenhar o modelo vestindo a camiseta em vez da estampa pura.

---

## 4. Blacklist Global de Termos Negativos (Negative Prompt)

```
color, colorful, rainbow, neon, oversaturated, pastel colors, 3d render, octane render, plastic texture, glossy, cartoon, anime, chibi, childish doodle, clipart, t-shirt mockup, fabric wrinkles, cloth folds, human body, hanger, drop shadow, photo background, gradient background, low resolution, blurry edges, watermark, border frame
```
