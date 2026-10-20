// web/app.js - Diretor de Arte Inteligente da Christopher (@christopherr_rj)

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // CONFIGURAÇÃO DOS ESTILOS VISUAIS
  // ==========================================
  const STYLES_CONFIG = {
    editorial: {
      name: "Editorial Tipográfico",
      engine: "Ideogram v2",
      aspectRatio: "4:5",
      basePrompt: "Luxury heavyweight streetwear backprint artwork. High-contrast vertical typography poster layout contrasting high-fashion roman serif typeface with fluid expressive script calligraphy lettering spelling out '{concept}'. Clean balanced editorial composition, minimal Roman numerals, subtle biblical chapter reference '{verse}'. Monochrome screen print ink, sharp vector contours, pure flat color, completely isolated on solid {bg_color} background, no garment, no mockup, no folds."
    },
    bold: {
      name: "Bold Streetwear Impact",
      engine: "Ideogram v2",
      aspectRatio: "4:5",
      basePrompt: "Heavyweight luxury streetwear apparel back graphic. Massive ultra-bold condensed sans-serif lettering spelling '{concept}' arched across the upper back. Minimalist brutalist graphic layout, small oval Christian crest badge at the bottom with chapter reference '{verse}'. Underground street aesthetic, high-impact monochrome screenprint artwork, razor-sharp clean edges, isolated on flat solid {bg_color} background, apparel graphic asset."
    },
    stencil: {
      name: "Xilogravura & Stencil Sacro",
      engine: "Recraft V3 (Vetor SVG)",
      aspectRatio: "4:5",
      basePrompt: "Intricate medieval woodcut engraving and linocut stencil illustration of {concept}. Strictly two-tone high-contrast artwork, stark etching lines, expressive cross-hatching shadows, classic Albrecht Dürer sacred engraving aesthetic. Subtle fine serif lettering underneath reading '{verse}'. Pure monochrome line art graphic, no grey tones, completely isolated on clean solid {bg_color} background, screen print ready vector asset."
    },
    halftone: {
      name: "Vintage Halftone Sacro",
      engine: "Ideogram v2 / Flux.1",
      aspectRatio: "4:5",
      basePrompt: "Vintage sacred renaissance artwork of {concept}, converted into high-contrast monochrome halftone dot stipple screen print. Arched classical Roman serif title arched over the top of the scene reading '{verse}'. The bottom and outer edges of the illustration softly dissolve into feathered airbrush spray fade and stipple gradient into the background. Washed vintage monochrome aesthetic, isolated on solid {bg_color} background, apparel graphic print asset."
    },
    gothic: {
      name: "Gothic / Blackletter Sacro",
      engine: "Ideogram v2",
      aspectRatio: "4:5",
      basePrompt: "Dark luxury streetwear apparel back graphic. Intricate gothic blackletter calligraphy spelling '{concept}'. Ornate sacred medieval crosses, sharp barbed linework, fine Roman numeral details, subtle chapter citation '{verse}'. Monochromatic high-contrast screenprint finish, premium avant-garde apparel design, isolated on flat solid {bg_color} background, vector crisp asset."
    },
    minimal: {
      name: "Linha Fina Minimalista",
      engine: "Recraft V3 (Vetor SVG)",
      aspectRatio: "4:5",
      basePrompt: "Minimalist continuous fine line art sacred illustration of {concept}. Sleek modern contour vector, elegant simplicity, single stroke linework, balanced negative space, clean typography note '{verse}'. Flat monochrome screenprint asset, razor-sharp edges, completely isolated on solid {bg_color} background, no background elements, no shirt mockup."
    }
  };

  const TEXTURE_MODIFIERS = {
    distressed: "distressed vintage washed screenprint texture, subtle fabric wear effect",
    fade: "outer and bottom edges softly fading into feathered airbrush spray gradient",
    halftone: "retro monochrome halftone dot screen pattern, newspaper stipple shading",
    sharp: "100% crisp solid vector linework, razor-sharp vector contours, zero blur"
  };

  // Elementos do DOM
  const conceptInput = document.getElementById('concept-input');
  const verseInput = document.getElementById('verse-input');
  const styleOptions = document.querySelectorAll('.style-option');
  const modifierChips = document.querySelectorAll('.filter-chip');
  const shirtCards = document.querySelectorAll('.shirt-card');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  const promptOutput = document.getElementById('prompt-output');
  const mjOutput = document.getElementById('mj-output');
  const engineRecBadge = document.getElementById('engine-rec-badge');
  const copyPromptBtn = document.getElementById('copy-prompt-btn');
  const copyMjBtn = document.getElementById('copy-mj-btn');

  // Estado atual
  let activeModifiers = new Set(['distressed', 'fade']);

  // Atualização dos Prompts
  function generatePrompts() {
    // 1. Estilo selecionado
    const selectedStyleRadio = document.querySelector('input[name="art_style"]:checked');
    const styleKey = selectedStyleRadio ? selectedStyleRadio.value : 'editorial';
    const styleConfig = STYLES_CONFIG[styleKey] || STYLES_CONFIG.editorial;

    // Atualiza classe ativa nos cards de estilo
    styleOptions.forEach(opt => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // 2. Cor da camiseta
    const selectedShirtRadio = document.querySelector('input[name="shirt_target"]:checked');
    const shirtColor = selectedShirtRadio ? selectedShirtRadio.value : 'washed_black';

    shirtCards.forEach(card => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    const isDarkShirt = ['washed_black', 'olive', 'coffee'].includes(shirtColor);
    const bgColor = isDarkShirt ? 'pure black' : 'pure white';

    // 3. Textos do usuário
    const conceptText = conceptInput.value.trim() || "Jesus não desistiu de mim Naquela Cruz";
    const verseText = verseInput.value.trim() || "EST. MMXXIV";

    // 4. Modificadores extras de textura
    const modifierStrings = [];
    activeModifiers.forEach(modKey => {
      if (TEXTURE_MODIFIERS[modKey]) {
        modifierStrings.push(TEXTURE_MODIFIERS[modKey]);
      }
    });
    const extraTexture = modifierStrings.length > 0 ? `, ${modifierStrings.join(', ')}` : '';

    // 5. Montagem do Prompt Otimizado
    let finalPrompt = styleConfig.basePrompt
      .replace('{concept}', conceptText)
      .replace('{verse}', verseText)
      .replace('{bg_color}', bgColor);

    if (extraTexture) {
      // Injeta antes de 'isolated on solid'
      finalPrompt = finalPrompt.replace('isolated on', `${extraTexture.trim()}, isolated on`);
    }

    promptOutput.value = finalPrompt;

    // 6. Montagem do Comando Midjourney v6.1
    const mjCommand = `/imagine prompt: ${finalPrompt} --ar ${styleConfig.aspectRatio} --v 6.1 --style raw --no t-shirt, mockup, fabric, folds, model, person wearing clothes, colorful, 3d, cartoon, anime, hanger`;
    mjOutput.value = mjCommand;

    // 7. Badge de motor recomendado
    engineRecBadge.textContent = styleConfig.engine;
  }

  // Listeners de Estilo
  styleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        generatePrompts();
      }
    });
  });

  // Listeners de Cor de Camiseta
  shirtCards.forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        generatePrompts();
      }
    });
  });

  // Listeners de Modificadores (Multi-select)
  modifierChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const mod = chip.dataset.mod;
      if (activeModifiers.has(mod)) {
        activeModifiers.delete(mod);
        chip.classList.remove('active');
      } else {
        activeModifiers.add(mod);
        chip.classList.add('active');
      }
      generatePrompts();
    });
  });

  // Listeners de Sugestões Rápidas
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      conceptInput.value = chip.dataset.concept;
      verseInput.value = chip.dataset.verse;
      const targetStyle = chip.dataset.style;
      const targetRadio = document.querySelector(`input[name="art_style"][value="${targetStyle}"]`);
      if (targetRadio) {
        targetRadio.checked = true;
      }
      generatePrompts();
    });
  });

  // Listeners de Digitação
  conceptInput.addEventListener('input', generatePrompts);
  verseInput.addEventListener('input', generatePrompts);

  // Botões de Cópia
  function setupCopyButton(btn, textarea, originalLabel) {
    if (!btn || !textarea) return;

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(textarea.value);
        const originalHTML = btn.innerHTML;
        btn.textContent = 'Copiado!';
        btn.style.background = '#4ade80';
        btn.style.color = '#121212';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.style.color = '';
        }, 1500);
      } catch (err) {
        console.error('Falha ao copiar:', err);
      }
    });
  }

  setupCopyButton(copyPromptBtn, promptOutput, 'Copiar Prompt');
  setupCopyButton(copyMjBtn, mjOutput, 'Copiar Comando');

  // Inicialização imediata
  generatePrompts();
});
