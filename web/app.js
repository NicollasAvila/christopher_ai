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
  // ==========================================
  const VISUAL_SHOWCASE = {
    editorial: {
      title: "Editorial Tipográfico (Serif + Script)",
      engine: "Ideogram v2",
      desc: "Inspirado em pôsteres de alta moda e editoriais de luxo. Cria um contraste marcante entre uma fonte serifada imponente e uma caligrafia cursiva elegante que ocupa verticalmente as costas.",
      refPiece: "Estampa oficial 'Jesus não desistiu de mim Naquela Cruz' (Foto 6 e 7 do catálogo)",
      ideas: [
        "\"Jesus não desistiu de mim Naquela Cruz\" (Isaías 53:5)",
        "\"A Graça me alcançou no vale mais escuro\" (Salmo 23:4)",
        "\"Tudo coopera para o bem daqueles que amam a Deus\" (Romanos 8:28)"
      ],
      svgMockup: `
        <svg viewBox="0 0 340 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <!-- Camiseta Costas -->
          <path d="M70,50 L110,65 Q170,75 230,65 L270,50 L310,110 L275,130 L260,105 L265,370 L75,370 L80,105 L65,130 L30,110 Z" fill="#1e1e1e" stroke="#333" stroke-width="1.5"/>
          <!-- Gola canelada grossa -->
          <path d="M110,65 Q170,78 230,65" fill="none" stroke="#2c2c2c" stroke-width="6" stroke-linecap="round"/>
          <path d="M112,65 Q170,76 228,65" fill="none" stroke="#151515" stroke-width="2"/>
          <!-- Etiqueta de tecido no trapézio -->
          <rect x="156" y="85" width="28" height="6" fill="#151515" rx="1"/>
          <!-- Estampa Vertical Costas -->
          <g transform="translate(170, 130)" text-anchor="middle">
            <!-- Serifada alta -->
            <text y="30" font-family="'Cinzel', Georgia, serif" font-size="34" font-weight="800" fill="#f5f3ef" letter-spacing="4">JESUS</text>
            <!-- Script cursivo grande sobreposto -->
            <text y="70" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#cdbea8">não,</text>
            <text y="110" font-family="'Cinzel', Georgia, serif" font-size="28" font-weight="700" fill="#f5f3ef" letter-spacing="3">DESISTIU</text>
            <text y="145" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#cdbea8">De mim.</text>
            <text y="180" font-family="'Cinzel', Georgia, serif" font-size="24" font-weight="700" fill="#f5f3ef" letter-spacing="2">Naquela</text>
            <text y="215" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#cdbea8">Cruz</text>
            <!-- Detalhe minimalista na base -->
            <line x1="-35" y1="230" x2="35" y2="230" stroke="#cdbea8" stroke-width="0.75" opacity="0.6"/>
            <text y="242" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" fill="#888" letter-spacing="3">ISAÍAS 53:5 • CHRISTOPHER</text>
          </g>
        </svg>
      `
    },
    bold: {
      title: "Bold Streetwear Impact",
      engine: "Ideogram v2",
      desc: "Visual pesado e direto da cultura de rua contemporânea. As letras são gigantes, condensadas e arqueadas no topo das costas, perfeitas para declarações de fé que chamam a atenção de longe.",
      refPiece: "Estampa de lançamento 'JESUS HAS MY BACK' (Drop de Inverno)",
      ideas: [
        "\"JESUS HAS MY BACK\" (Romanos 8:31)",
        "\"NO FEAR IN HIS PRESENCE\" (Salmo 27:1)",
        "\"MORE THAN CONQUERORS\" (Romanos 8:37)"
      ],
      svgMockup: `
        <svg viewBox="0 0 340 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M70,50 L110,65 Q170,75 230,65 L270,50 L310,110 L275,130 L260,105 L265,370 L75,370 L80,105 L65,130 L30,110 Z" fill="#1b1b1b" stroke="#333" stroke-width="1.5"/>
          <path d="M110,65 Q170,78 230,65" fill="none" stroke="#282828" stroke-width="6" stroke-linecap="round"/>
          <rect x="156" y="85" width="28" height="6" fill="#151515" rx="1"/>
          <!-- Estampa Arqueada Central -->
          <g transform="translate(170, 130)" text-anchor="middle">
            <path id="archPath" d="M -110,40 Q 0,-5 110,40" fill="none"/>
            <text fill="#f5f3ef" font-family="'Plus Jakarta Sans', sans-serif" font-size="23" font-weight="900" letter-spacing="3">
              <textPath href="#archPath" startOffset="50%" text-anchor="middle">JESUS HAS MY BACK</textPath>
            </text>
            <!-- Selo Oval Christian Streetwear -->
            <g transform="translate(0, 120)">
              <ellipse cx="0" cy="0" rx="48" ry="32" fill="none" stroke="#cdbea8" stroke-width="1.5"/>
              <ellipse cx="0" cy="0" rx="44" ry="28" fill="none" stroke="#333" stroke-width="0.8"/>
              <!-- Cruz Central -->
              <path d="M 0,-16 L 0,16 M -10,-6 L 10,-6" stroke="#f5f3ef" stroke-width="2.5" stroke-linecap="round"/>
              <text y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" fill="#cdbea8" letter-spacing="2">EST. 2024</text>
            </g>
            <text y="185" font-family="'Cinzel', serif" font-size="10" font-weight="700" fill="#f5f3ef" letter-spacing="4">ROMANOS 8:31</text>
            <text y="200" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" fill="#666" letter-spacing="2">HEAVYWEIGHT DIVISION • RJ</text>
          </g>
        </svg>
      `
    },
    stencil: {
      title: "Xilogravura & Stencil Sacro",
      engine: "Recraft V3 (Gera Vetor SVG)",
      desc: "Gravura em metal ou xilogravura clássica estilo renascentista alemão (Albrecht Dürer). Linhas pretas e brancas estritas, sem meios-tons acinzentados, ideal para gerar em vetor SVG limpo.",
      refPiece: "Estampa oficial 'HE LEFT THE 99 FOR ME' (Foto 5 com o rebanho e o pastor)",
      ideas: [
        "\"He Left the 99 for Me\" (Pastor com ovelha nos ombros e rebanho no topo)",
        "\"O Leão da Tribo de Judá\" em xilogravura detalhada",
        "Mãos postas em oração com correntes partidas ao fundo"
      ],
      svgMockup: `
        <svg viewBox="0 0 340 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M70,50 L110,65 Q170,75 230,65 L270,50 L310,110 L275,130 L260,105 L265,370 L75,370 L80,105 L65,130 L30,110 Z" fill="#1c1c1c" stroke="#333" stroke-width="1.5"/>
          <path d="M110,65 Q170,78 230,65" fill="none" stroke="#282828" stroke-width="6" stroke-linecap="round"/>
          <rect x="156" y="85" width="28" height="6" fill="#151515" rx="1"/>
          <!-- Estampa de Xilogravura Stencil -->
          <g transform="translate(170, 115)" text-anchor="middle">
            <!-- Rebanho no topo -->
            <g fill="#f5f3ef" opacity="0.9">
              <!-- Ovelhas estilizadas em padrão xilogravura -->
              <ellipse cx="-45" cy="20" rx="12" ry="8"/><circle cx="-53" cy="22" r="4" fill="#1c1c1c"/>
              <ellipse cx="-20" cy="14" rx="14" ry="9"/><circle cx="-28" cy="16" r="4.5" fill="#1c1c1c"/>
              <ellipse cx="10" cy="16" rx="13" ry="8.5"/><circle cx="3" cy="18" r="4" fill="#1c1c1c"/>
              <ellipse cx="40" cy="22" rx="11" ry="7.5"/><circle cx="48" cy="24" r="3.5" fill="#1c1c1c"/>
              <ellipse cx="-65" cy="35" rx="13" ry="8"/>
              <ellipse cx="-35" cy="30" rx="15" ry="10"/>
              <ellipse cx="0" cy="28" rx="16" ry="10.5"/>
              <ellipse cx="32" cy="32" rx="14" ry="9.5"/>
              <ellipse cx="60" cy="36" rx="12" ry="8"/>
            </g>
            <!-- Pastor Central carregando a ovelha -->
            <g transform="translate(0, 90)">
              <!-- Auréola sutil -->
              <circle cx="0" cy="-22" r="14" fill="none" stroke="#cdbea8" stroke-width="1.2" stroke-dasharray="2 2"/>
              <!-- Figura com manto (linhas de gravura) -->
              <path d="M -8,-10 Q 0,-25 8,-10 L 14,50 Q 0,55 -14,50 Z" fill="#f5f3ef"/>
              <path d="M -3,0 L -3,48 M 3,0 L 3,48" stroke="#1c1c1c" stroke-width="1.2"/>
              <!-- Ovelha nos ombros -->
              <path d="M -16,-16 Q 0,-26 16,-16 Q 10,-8 -16,-16 Z" fill="#f5f3ef"/>
              <circle cx="16" cy="-14" r="3" fill="#cdbea8"/>
            </g>
            <!-- Tipografia da peça -->
            <text y="180" font-family="'Cinzel', serif" font-size="14" font-weight="700" fill="#f5f3ef" letter-spacing="3">HE LEFT THE 99 FOR ME</text>
            <text y="196" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" fill="#cdbea8" letter-spacing="2">LUCAS 15:4 • CHRISTOPHER</text>
          </g>
        </svg>
      `
    },
    halftone: {
      title: "Vintage Halftone Sacro",
      engine: "Ideogram v2 / Flux.1",
      desc: "Recriação de quadros sacros renascentistas (como A Última Ceia). A imagem é convertida para pontilhismo preto e branco com as bordas inferiores esfumadas em degradê spray (airbrush fade) que fundem suavemente na malha.",
      refPiece: "Estampa oficial 'IN MEMORY OF ME' (Foto 2 e 8 da Santa Ceia)",
      ideas: [
        "\"In Memory of Me\" (A Última Ceia com título arqueado e bordas esfumadas)",
        "\"Cristo no Getsêmani\" com retícula pontilhada clássica",
        "A Pietà em estética de pôster vintage lavado"
      ],
      svgMockup: `
        <svg viewBox="0 0 340 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M70,50 L110,65 Q170,75 230,65 L270,50 L310,110 L275,130 L260,105 L265,370 L75,370 L80,105 L65,130 L30,110 Z" fill="#191919" stroke="#333" stroke-width="1.5"/>
          <path d="M110,65 Q170,78 230,65" fill="none" stroke="#252525" stroke-width="6" stroke-linecap="round"/>
          <rect x="156" y="85" width="28" height="6" fill="#151515" rx="1"/>
          <!-- Santa Ceia com Halftone e Fade -->
          <g transform="translate(170, 120)" text-anchor="middle">
            <!-- Título Arqueado -->
            <path id="supperArch" d="M -90,20 Q 0,-8 90,20" fill="none"/>
            <text fill="#f5f3ef" font-family="'Cinzel', Georgia, serif" font-size="14" font-weight="700" letter-spacing="3">
              <textPath href="#supperArch" startOffset="50%" text-anchor="middle">IN MEMORY OF ME</textPath>
            </text>
            <!-- Ilustração da Ceia com pontilhados/stipple -->
            <g transform="translate(0, 40)">
              <!-- Mesa da ceia -->
              <rect x="-85" y="35" width="170" height="20" fill="#f5f3ef" opacity="0.85" rx="1"/>
              <!-- Apóstolos e Cristo sentados em silhueta pontilhada -->
              <path d="M -80,35 Q -75,15 -68,35 Q -60,10 -52,35 Q -42,12 -34,35 Q -25,8 -15,35 Q 0,-2 15,35 Q 25,8 34,35 Q 42,12 52,35 Q 60,10 68,35 Q 75,15 80,35 Z" fill="#f5f3ef"/>
              <!-- Cristo com Auréola -->
              <circle cx="0" cy="10" r="10" fill="none" stroke="#cdbea8" stroke-width="1.2"/>
              <!-- Degradê Esfumado Inferior (Airbrush Fade) -->
              <rect x="-85" y="55" width="170" height="25" fill="#191919" opacity="0.7"/>
              <circle cx="-50" cy="62" r="1.5" fill="#f5f3ef" opacity="0.4"/>
              <circle cx="-20" cy="65" r="1" fill="#f5f3ef" opacity="0.3"/>
              <circle cx="0" cy="68" r="1.5" fill="#f5f3ef" opacity="0.2"/>
              <circle cx="30" cy="63" r="1" fill="#f5f3ef" opacity="0.4"/>
              <circle cx="60" cy="66" r="1.2" fill="#f5f3ef" opacity="0.3"/>
            </g>
            <text y="160" font-family="'Cinzel', serif" font-size="9" font-weight="700" fill="#cdbea8" letter-spacing="3">LUCAS 22:19</text>
            <text y="174" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" fill="#555" letter-spacing="2">CHRISTIAN LUXURY STREETWEAR</text>
          </g>
        </svg>
      `
    },
    gothic: {
      title: "Gothic / Blackletter Sacro",
      engine: "Ideogram v2",
      desc: "Tipografia gótica medieval (Old English/Blackletter) associada ao streetwear de luxo sombrio e solene. Traz um peso visual forte com cruzes ornamentadas e detalhes afiados.",
      refPiece: "Linha Dark Heavyweight & Hoodies especiais de Inverno",
      ideas: [
        "\"SANTO É O SENHOR\" em caligrafia gótica medieval",
        "\"Luz nas Trevas\" com cruz gótica pontiaguda (João 1:5)",
        "\"Rei dos Reis & Senhor dos Senhores\" (Apocalipse 19:16)"
      ],
      svgMockup: `
        <svg viewBox="0 0 340 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M70,50 L110,65 Q170,75 230,65 L270,50 L310,110 L275,130 L260,105 L265,370 L75,370 L80,105 L65,130 L30,110 Z" fill="#141414" stroke="#282828" stroke-width="1.5"/>
          <path d="M110,65 Q170,78 230,65" fill="none" stroke="#222" stroke-width="6" stroke-linecap="round"/>
          <rect x="156" y="85" width="28" height="6" fill="#101010" rx="1"/>
          <!-- Estampa Gótica Central -->
          <g transform="translate(170, 130)" text-anchor="middle">
            <!-- Cruz Gótica com espinhos -->
            <g transform="translate(0, 45)">
              <path d="M 0,-40 L 0,60 M -25,-15 L 25,-15" stroke="#f5f3ef" stroke-width="3" stroke-linecap="square"/>
              <!-- Pontas pontiagudas -->
              <polygon points="0,-45 -4,-40 4,-40" fill="#cdbea8"/>
              <polygon points="0,65 -4,60 4,60" fill="#cdbea8"/>
              <polygon points="-30,-15 -25,-19 -25,-11" fill="#cdbea8"/>
              <polygon points="30,-15 25,-19 25,-11" fill="#cdbea8"/>
              <!-- Arabesco/Raio solar central -->
              <circle cx="0" cy="-15" r="14" fill="none" stroke="#cdbea8" stroke-width="1" stroke-dasharray="3 2"/>
            </g>
            <!-- Tipografia Gótica estilizada -->
            <text y="145" font-family="Georgia, serif" font-weight="900" font-size="24" fill="#f5f3ef" letter-spacing="4">SANTO</text>
            <text y="172" font-family="Georgia, serif" font-style="italic" font-size="14" fill="#cdbea8">& O CORDEIRO</text>
            <text y="200" font-family="'Cinzel', serif" font-size="8" fill="#666" letter-spacing="3">APOCALIPSE 5:12 • MMXXIV</text>
          </g>
        </svg>
      `
    },
    minimal: {
      title: "Linha Fina Minimalista",
      engine: "Recraft V3 (Gera Vetor SVG)",
      desc: "Estilo 'One-Line Art' contemporâneo. Linhas vetoriais finas e contínuas sobre espaço negativo generoso. Ideal para quem busca um visual limpo, sofisticado e discreto.",
      refPiece: "Linha Minimal Pocket & Peito Central da Christopher",
      ideas: [
        "Mãos postas em oração desenhadas em traço único contínuo",
        "Pomba da Paz / Espírito Santo em vetor geométrico fino",
        "Rosto sereno de Cristo com contorno de coroa de espinhos minimalista"
      ],
      svgMockup: `
        <svg viewBox="0 0 340 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M70,50 L110,65 Q170,75 230,65 L270,50 L310,110 L275,130 L260,105 L265,370 L75,370 L80,105 L65,130 L30,110 Z" fill="#24211d" stroke="#38332c" stroke-width="1.5"/>
          <path d="M110,65 Q170,78 230,65" fill="none" stroke="#332e27" stroke-width="6" stroke-linecap="round"/>
          <rect x="156" y="85" width="28" height="6" fill="#1c1916" rx="1"/>
          <!-- Arte de Linha Contínua -->
          <g transform="translate(170, 135)" text-anchor="middle">
            <g transform="translate(0, 50)">
              <!-- Traço contínuo de mãos em oração -->
              <path d="M -18,40 C -18,10 -10,-10 0,-30 C 10,-10 18,10 18,40" fill="none" stroke="#f5f3ef" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M 0,-30 L 0,-15 M -8,0 L 8,0" stroke="#cdbea8" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="0" cy="-38" r="8" fill="none" stroke="#cdbea8" stroke-width="0.9" stroke-dasharray="2 2"/>
            </g>
            <text y="150" font-family="'Cinzel', serif" font-size="11" font-weight="700" fill="#f5f3ef" letter-spacing="4">SOLI DEO GLORIA</text>
            <text y="166" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" fill="#cdbea8" letter-spacing="2">1 CORÍNTIOS 10:31</text>
            <text y="180" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" fill="#665f56" letter-spacing="1">CHRISTOPHER STUDIO</text>
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

    mockupRenderTarget.innerHTML = showcase.svgMockup;
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
