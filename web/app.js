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

  // ==========================================
  // DADOS VISUAIS DA GALERIA (MOCKUPS & FICHA)
  // =======================================  const VISUAL_SHOWCASE = {
    editorial: {
      title: "Editorial Tipográfico (Serif + Script)",
      engine: "Ideogram v2",
      imageSrc: "assets/styles/editorial.jpg",
      desc: "Inspirado em pôsteres de alta moda e editoriais de luxo. Cria um contraste marcante entre uma fonte serifada romana imponente e uma caligrafia cursiva elegante que ocupa verticalmente as costas.",
      refPiece: "Estampa oficial 'Jesus não desistiu de mim Naquela Cruz'",
      ideas: [
        "\"Jesus não desistiu de mim Naquela Cruz\" (Isaías 53:5)",
        "\"A Graça me alcançou no vale mais escuro\" (Salmo 23:4)",
        "\"Tudo coopera para o bem daqueles que amam a Deus\" (Romanos 8:28)"
      ]
    },
    bold: {
      title: "Bold Streetwear Impact",
      engine: "Ideogram v2",
      imageSrc: "assets/styles/bold.jpg",
      desc: "Visual pesado e direto da cultura de rua contemporânea. As letras são gigantes, condensadas e arqueadas no topo das costas, perfeitas para declarações de fé que chamam a atenção de longe.",
      refPiece: "Estampa de lançamento 'JESUS HAS MY BACK' (Drop de Inverno)",
      ideas: [
        "\"JESUS HAS MY BACK\" (Romanos 8:31)",
        "\"NO FEAR IN HIS PRESENCE\" (Salmo 27:1)",
        "\"MORE THAN CONQUERORS\" (Romanos 8:37)"
      ]
    },
    stencil: {
      title: "Xilogravura & Stencil Sacro",
      engine: "Recraft V3 (Gera Vetor SVG)",
      imageSrc: "assets/styles/stencil.jpg",
      desc: "Gravura em metal ou xilogravura clássica estilo renascentista alemão (Albrecht Dürer). Linhas pretas e brancas estritas, sem meios-tons cinzas, ideal para gerar em vetor SVG limpo.",
      refPiece: "Estampa oficial 'HE LEFT THE 99 FOR ME' (Lucas 15:4)",
      ideas: [
        "\"He Left the 99 for Me\" (Pastor com ovelha nos ombros e rebanho no topo)",
        "\"O Leão da Tribo de Judá\" em xilogravura detalhada",
        "Mãos postas em oração com correntes partidas ao fundo"
      ]
    },
    halftone: {
      title: "Vintage Halftone Sacro",
      engine: "Ideogram v2 / Flux.1",
      imageSrc: "assets/styles/halftone.jpg",
      desc: "Recriação de quadros sacros renascentistas (como A Última Ceia). A imagem é convertida para pontilhismo preto e branco com as bordas inferiores esfumadas em degradê spray (airbrush fade) que fundem suavemente na malha.",
      refPiece: "Estampa oficial 'IN MEMORY OF ME' (Lucas 22:19)",
      ideas: [
        "\"In Memory of Me\" (A Última Ceia com título arqueado e bordas esfumadas)",
        "\"Cristo no Getsêmani\" com retícula pontilhada clássica",
        "A Pietà em estética de pôster vintage lavado"
      ]
    },
    gothic: {
      title: "Gothic / Blackletter Sacro",
      engine: "Ideogram v2",
      imageSrc: "assets/styles/gothic.jpg",
      desc: "Tipografia gótica medieval (Old English/Blackletter) associada ao streetwear de luxo sombrio e solene. Traz um peso visual forte com cruzes ornamentadas e detalhes afiados.",
      refPiece: "Linha Dark Heavyweight & Hoodies especiais de Inverno",
      ideas: [
        "\"SANTO É O SENHOR\" em caligrafia gótica medieval",
        "\"Luz nas Trevas\" com cruz gótica pontiaguda (João 1:5)",
        "\"Rei dos Reis & Senhor dos Senhores\" (Apocalipse 19:16)"
      ]
    },
    minimal: {
      title: "Linha Fina Minimalista",
      engine: "Recraft V3 (Gera Vetor SVG)",
      imageSrc: "assets/styles/minimal.jpg",
      desc: "Estilo 'One-Line Art' contemporâneo. Linhas vetoriais finas e contínuas sobre espaço negativo generoso. Ideal para quem busca um visual limpo, sofisticado e discreto.",
      refPiece: "Linha Minimal Pocket & Peito Central da Christopher",
      ideas: [
        "Mãos postas em oração desenhadas em traço único contínuo",
        "Pomba da Paz / Espírito Santo em vetor geométrico fino",
        "Rosto sereno de Cristo com contorno de coroa de espinhos minimalista"
      ]
    }
  };-spacing="1">CHRISTOPHER STUDIO</text>
          </g>
        </svg>
      `
    }
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

  // Elementos do Modal de Galeria
  const styleModal = document.getElementById('style-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openFullGalleryBtn = document.getElementById('open-full-gallery-btn');
  const modalTabPills = document.querySelectorAll('.modal-tab-pill');
  const modalEngineBadge = document.getElementById('modal-engine-badge');
  const modalStyleHeading = document.getElementById('modal-style-heading');
  const modalStyleDesc = document.getElementById('modal-style-desc');
  const modalReferencePiece = document.getElementById('modal-reference-piece');
  const modalStyleIdeas = document.getElementById('modal-style-ideas');
  const mockupRenderTarget = document.getElementById('mockup-render-target');
  const modalApplyStyleBtn = document.getElementById('modal-apply-style-btn');

  let activeModalStyle = 'editorial';
  let activeModifiers = new Set(['distressed', 'fade']);

  // Atualização dos Prompts
  function generatePrompts() {
    const selectedStyleRadio = document.querySelector('input[name="art_style"]:checked');
    const styleKey = selectedStyleRadio ? selectedStyleRadio.value : 'editorial';
    const styleConfig = STYLES_CONFIG[styleKey] || STYLES_CONFIG.editorial;

    styleOptions.forEach(opt => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

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

    const conceptText = conceptInput.value.trim() || "Jesus não desistiu de mim Naquela Cruz";
    const verseText = verseInput.value.trim() || "EST. MMXXIV";

    const modifierStrings = [];
    activeModifiers.forEach(modKey => {
      if (TEXTURE_MODIFIERS[modKey]) {
        modifierStrings.push(TEXTURE_MODIFIERS[modKey]);
      }
    });
    const extraTexture = modifierStrings.length > 0 ? `, ${modifierStrings.join(', ')}` : '';

    let finalPrompt = styleConfig.basePrompt
      .replace('{concept}', conceptText)
      .replace('{verse}', verseText)
      .replace('{bg_color}', bgColor);

    if (extraTexture) {
      finalPrompt = finalPrompt.replace('isolated on', `${extraTexture.trim()}, isolated on`);
    }

    promptOutput.value = finalPrompt;

    const mjCommand = `/imagine prompt: ${finalPrompt} --ar ${styleConfig.aspectRatio} --v 6.1 --style raw --no t-shirt, mockup, fabric, folds, model, person wearing clothes, colorful, 3d, cartoon, anime, hanger`;
    mjOutput.value = mjCommand;

    engineRecBadge.textContent = styleConfig.engine;
  }

  // ==========================================
  // CONTROLE DO MODAL DE GALERIA VISUAL
  // ==========================================
  function showStyleInModal(styleKey) {
    activeModalStyle = styleKey;
    const showcase = VISUAL_SHOWCASE[styleKey];
    if (!showcase) return;

    modalTabPills.forEach(pill => {
      if (pill.dataset.style === styleKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    modalEngineBadge.textContent = showcase.engine;
    modalStyleHeading.textContent = showcase.title;
    modalStyleDesc.textContent = showcase.desc;
    modalReferencePiece.textContent = showcase.refPiece;

    modalStyleIdeas.innerHTML = '';
    showcase.ideas.forEach(idea => {
      const li = document.createElement('li');
      li.textContent = idea;
      modalStyleIdeas.appendChild(li);
    });

    mockupRenderTarget.innerHTML = `
      <img src="${showcase.imageSrc}" alt="${showcase.title}" class="mockup-real-photo" loading="eager" />
    `;
  }

  function openModal(styleKey = 'editorial') {
    showStyleInModal(styleKey);
    styleModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    styleModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  // Triggers do Modal
  if (openFullGalleryBtn) {
    openFullGalleryBtn.addEventListener('click', () => {
      const currentSelectedRadio = document.querySelector('input[name="art_style"]:checked');
      const current = currentSelectedRadio ? currentSelectedRadio.value : 'editorial';
      openModal(current);
    });
  }

  document.querySelectorAll('.view-sample-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita marcar o radio indesejadamente se clicar apenas para ver
      const targetStyle = btn.dataset.styleTarget;
      openModal(targetStyle);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  styleModal.addEventListener('click', (e) => {
    if (e.target === styleModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !styleModal.hasAttribute('hidden')) {
      closeModal();
    }
  });

  modalTabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      showStyleInModal(pill.dataset.style);
    });
  });

  modalApplyStyleBtn.addEventListener('click', () => {
    const targetRadio = document.querySelector(`input[name="art_style"][value="${activeModalStyle}"]`);
    if (targetRadio) {
      targetRadio.checked = true;
      generatePrompts();
    }
    closeModal();
  });

  // Listeners dos Cards de Estilo Principais
  styleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        generatePrompts();
      }
    });
  });

  // Listeners de Camiseta
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

  // Sugestões Rápidas do Catálogo
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
