#!/usr/bin/env python3
# scripts/prompt_director.py
"""
Diretor de Arte — Christopher (@christopherr_rj)
Gera prompts estruturados para os 4 pilares gráficos de Christian Heavyweight Streetwear.
Funciona offline (motor de regras e presets de estamparia) e online (se API Key de LLM estiver configurada).
"""

import sys
import json
import argparse
from typing import Dict, Any, Optional

# --- Catálogo de Configuração da Marca Christopher ---

BRAND_NAME = "Christopher"
BRAND_HANDLE = "@christopherr_rj"

DARK_SHIRTS = {"washed_black", "black", "olive", "coffee", "preto", "preto estonado", "verde militar", "marrom"}
LIGHT_SHIRTS = {"sand", "taupe", "off_white", "white", "areia", "cru", "off-white", "bege"}

NEGATIVE_PROMPT = (
    "color, colorful, rainbow, neon, oversaturated, pastel colors, 3d render, octane render, "
    "plastic texture, glossy, cartoon, anime, chibi, childish doodle, clipart, t-shirt mockup, "
    "fabric wrinkles, cloth folds, human body, hanger, drop shadow, photo background, "
    "gradient background, low resolution, blurry edges, watermark, border frame"
)

PILLARS = {
    "1": {
        "id": "editorial",
        "name": "Editorial Tipográfico (Serif + Script)",
        "engine": "ideogram-v2",
        "aspect_ratio": "4:5",
        "description": "Contraste entre fonte serifada romana de luxo e caligrafia cursiva fluida (ex: 'Jesus não desistiu de mim Naquela Cruz').",
        "template": (
            "Luxury heavyweight streetwear backprint artwork. "
            "High-contrast vertical typography poster layout contrasting high-fashion roman serif typeface with fluid expressive script calligraphy lettering spelling out '{text}'. "
            "Clean balanced editorial composition, minimal Roman numerals, subtle biblical chapter reference '{verse}'. "
            "Monochrome screen print ink, sharp vector contours, pure flat color, completely isolated on solid {bg_color} background, no garment, no mockup, no folds."
        )
    },
    "2": {
        "id": "bold",
        "name": "Bold Streetwear Impact (Condensed Sans + Arch)",
        "engine": "ideogram-v2",
        "aspect_ratio": "4:5",
        "description": "Tipografia brutalista ultra condensada em arco com selos minimalistas (ex: 'JESUS HAS MY BACK - ROMANOS 8:31').",
        "template": (
            "Heavyweight luxury streetwear apparel back graphic. "
            "Massive ultra-bold condensed sans-serif lettering spelling '{text}' arched across the upper back. "
            "Minimalist brutalist graphic layout, small oval Christian crest badge at the bottom with chapter reference '{verse}'. "
            "Underground street aesthetic, high-impact monochrome screenprint artwork, razor-sharp clean edges, isolated on flat solid {bg_color} background, apparel graphic asset."
        )
    },
    "3": {
        "id": "stencil",
        "name": "Fine-Art Stencil & Engraving (Woodcut Sacro)",
        "engine": "recraft-v3 (vector/svg) | flux-1-dev",
        "aspect_ratio": "4:5",
        "description": "Ilustração sacra estilo xilogravura/Dürer em alto contraste sem meios-tons (ex: 'HE LEFT THE 99 FOR ME').",
        "template": (
            "Intricate medieval woodcut engraving and linocut stencil illustration of {text}. "
            "Strictly two-tone high-contrast artwork, stark etching lines, expressive cross-hatching shadows, classic Albrecht Dürer sacred engraving aesthetic. "
            "Subtle fine serif lettering underneath reading '{verse}'. "
            "Pure monochrome line art graphic, no grey tones, completely isolated on clean solid {bg_color} background, screen print ready vector asset."
        )
    },
    "4": {
        "id": "halftone",
        "name": "Vintage Halftone Sacro (Renaissance Airbrush Fade)",
        "engine": "ideogram-v2",
        "aspect_ratio": "4:5",
        "description": "Pintura renascentista pontilhada com bordas inferiores em spray fade e título em arco (ex: 'IN MEMORY OF ME - LUCAS 22:19').",
        "template": (
            "Vintage sacred renaissance artwork of {text}, converted into high-contrast monochrome halftone dot stipple screen print. "
            "Arched classical Roman serif title arched over the top of the scene reading '{verse}'. "
            "The bottom and outer edges of the illustration softly dissolve into feathered airbrush spray fade and stipple gradient into the background. "
            "Washed vintage monochrome aesthetic, isolated on solid {bg_color} background, apparel graphic print asset."
        )
    }
}


def build_director_prompt(
    concept: str,
    pillar_key: str = "1",
    shirt_color: str = "washed_black",
    verse: Optional[str] = None
) -> Dict[str, Any]:
    pillar = PILLARS.get(pillar_key, PILLARS["1"])
    
    # Camisetas escuras -> Fundo preto e tinta branca (máximo contraste para corte alpha)
    # Camisetas claras -> Fundo branco e tinta preta
    is_dark = shirt_color.lower().strip() in DARK_SHIRTS or "black" in shirt_color.lower() or "preto" in shirt_color.lower()
    bg_color = "pure black" if is_dark else "pure white"
    ink_color = "pure white" if is_dark else "solid black"
    
    verse_text = verse.strip() if verse else "EST. MMXXIV"
    
    prompt = pillar["template"].format(
        text=concept.strip(),
        verse=verse_text,
        bg_color=bg_color,
        ink_color=ink_color
    )
    
    # Formatação para o Midjourney v6.1 com flags oficiais
    mj_command = (
        f"/imagine prompt: {prompt} --ar {pillar['aspect_ratio']} --v 6.1 --style raw "
        f"--no t-shirt, mockup, fabric, folds, model, person wearing clothes, colorful, 3d, cartoon, anime, hanger"
    )
    
    return {
        "brand": BRAND_NAME,
        "pillar_id": pillar["id"],
        "pillar_name": pillar["name"],
        "recommended_engine": pillar["engine"],
        "aspect_ratio": pillar["aspect_ratio"],
        "shirt_color_input": shirt_color,
        "target_garment_contrast": "White ink on black background" if is_dark else "Black ink on white background",
        "bg_color_for_generation": bg_color,
        "optimized_prompt": prompt,
        "negative_prompt": NEGATIVE_PROMPT,
        "midjourney_command": mj_command
    }


def run_interactive():
    print("=" * 65)
    print(f"  DIRETOR DE ARTE — {BRAND_NAME.upper()} ({BRAND_HANDLE})")
    print("  Gerador de Prompts Técnicos de Estamparia (Christian Streetwear)")
    print("=" * 65)
    
    print("\nEscolha o Pilar Gráfico da Peça:")
    for key, p in PILLARS.items():
        print(f"  [{key}] {p['name']}")
        print(f"      -> {p['description']}")
    
    choice = input("\nNúmero do Pilar (1 a 4) [Padrão: 1]: ").strip() or "1"
    if choice not in PILLARS:
        choice = "1"
        
    concept = input("\nTexto Principal / Cena da Estampa: ").strip()
    if not concept:
        concept = "Jesus não desistiu de mim Naquela Cruz"
        print(f"  [Usando exemplo padrão]: '{concept}'")
        
    verse = input("Versículo / Subtítulo / Referência (opcional): ").strip()
    
    shirt_color = input("Cor da Camiseta (ex: washed_black, sand, olive, off_white) [Padrão: washed_black]: ").strip()
    if not shirt_color:
        shirt_color = "washed_black"
        
    result = build_director_prompt(
        concept=concept,
        pillar_key=choice,
        shirt_color=shirt_color,
        verse=verse
    )
    
    print("\n" + "=" * 65)
    print(f"RESULTADO: {result['pillar_name']}")
    print(f"Motor Recomendado: {result['recommended_engine'].upper()} (Aspect Ratio: {result['aspect_ratio']})")
    print(f"Contraste Fundo: {result['target_garment_contrast']}")
    print("=" * 65)
    
    print("\n[ 1. PROMPT OTIMIZADO PARA FLUX.1 OU IDEOGRAM v2 ]:")
    print(result["optimized_prompt"])
    
    print("\n[ 2. NEGATIVE PROMPT (PARA EMBUTIR NA API) ]:")
    print(result["negative_prompt"])
    
    print("\n[ 3. COMANDO PRONTO PARA O MIDJOURNEY (COPIAR E COLAR NO DISCORD) ]:")
    print(result["midjourney_command"])
    print("=" * 65 + "\n")


def main():
    parser = argparse.ArgumentParser(description=f"Diretor de Arte — {BRAND_NAME}")
    parser.add_argument("--concept", type=str, help="Texto ou cena principal da estampa")
    parser.add_argument("--pillar", type=str, choices=["1", "2", "3", "4"], default="1", help="1=Editorial, 2=Bold, 3=Stencil, 4=Halftone")
    parser.add_argument("--shirt-color", type=str, default="washed_black", help="Cor da malha da camiseta")
    parser.add_argument("--verse", type=str, default="", help="Versículo ou citação bíblica")
    parser.add_argument("--json", action="store_true", help="Retornar apenas payload JSON puro")

    args = parser.parse_args()

    if not args.concept:
        # Se nenhum argumento for passado, abre menu interativo
        run_interactive()
    else:
        result = build_director_prompt(
            concept=args.concept,
            pillar_key=args.pillar,
            shirt_color=args.shirt_color,
            verse=args.verse
        )
        if args.json:
            print(json.dumps(result, indent=2, ensure_ascii=False))
        else:
            print(f"--- Prompt Otimizado ({result['recommended_engine']}) ---")
            print(result["optimized_prompt"])
            print(f"\n--- Comando Midjourney v6.1 ---")
            print(result["midjourney_command"])


if __name__ == "__main__":
    main()
