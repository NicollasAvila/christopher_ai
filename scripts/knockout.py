#!/usr/bin/env python3
# scripts/knockout.py
"""
Color & Luminance Knockout — Christopher (@christopherr_rj)
Remove fundos pretos ou brancos de estampas monocromáticas sem halos cinzas.
Preserva antialiasing, retículas (halftones) e exporta em PNG 32-bit com metadados de 300 DPI.
Custo de execução: R$ 0,00 (roda 100% local com Pillow).
"""

import sys
import os
import argparse
from typing import Tuple
from PIL import Image, ImageOps

# Cores reais dos tecidos da Christopher em RGB
SHIRT_COLORS = {
    "washed_black": (34, 34, 34),     # Cinza asfalto escuro estonado
    "sand": (205, 190, 168),          # Areia / Taupe clássico
    "olive": (78, 86, 68),            # Verde militar estonado
    "off_white": (240, 238, 230),     # Cru / Algodão natural
    "coffee": (62, 48, 40)            # Castanho escuro terroso
}


def luminance_knockout_black(
    img: Image.Image,
    ink_color: Tuple[int, int, int] = (255, 255, 255),
    clip_black_threshold: int = 15,
    gamma: float = 1.0
) -> Image.Image:
    """
    Remove o fundo preto de uma arte clara (tinta branca sobre malha preta).
    O canal Alpha é extraído diretamente da luminância dos pixels.
    """
    img = img.convert("RGB")
    gray = ImageOps.grayscale(img)
    
    # Aplica corte suave nos ruídos pretos de fundo
    if clip_black_threshold > 0:
        lut = [0 if i < clip_black_threshold else int(((i - clip_black_threshold) / (255 - clip_black_threshold)) ** gamma * 255) for i in range(256)]
        alpha = gray.point(lut)
    else:
        alpha = gray

    # Cria imagem RGBA com tinta uniforme (ou textura original) modulada pelo canal Alpha
    solid_ink = Image.new("RGBA", img.size, ink_color + (255,))
    solid_ink.putalpha(alpha)
    return solid_ink


def luminance_knockout_white(
    img: Image.Image,
    ink_color: Tuple[int, int, int] = (20, 20, 20),
    clip_white_threshold: int = 240,
    gamma: float = 1.0
) -> Image.Image:
    """
    Remove o fundo branco de uma arte escura (tinta preta sobre malha clara).
    O canal Alpha é a luminância invertida (pixels pretos = 100% opacos).
    """
    img = img.convert("RGB")
    gray = ImageOps.grayscale(img)
    inverted = ImageOps.invert(gray)
    
    threshold_inv = 255 - clip_white_threshold
    if threshold_inv > 0:
        lut = [0 if i < threshold_inv else int(((i - threshold_inv) / (255 - threshold_inv)) ** gamma * 255) for i in range(256)]
        alpha = inverted.point(lut)
    else:
        alpha = inverted

    solid_ink = Image.new("RGBA", img.size, ink_color + (255,))
    solid_ink.putalpha(alpha)
    return solid_ink


def detect_background_mode(img: Image.Image) -> str:
    """Analisa os 4 cantos da imagem para inferir se o fundo é preto ou branco."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    corners = [
        rgb.getpixel((0, 0)),
        rgb.getpixel((w - 1, 0)),
        rgb.getpixel((0, h - 1)),
        rgb.getpixel((w - 1, h - 1))
    ]
    avg_lum = sum((0.299 * r + 0.587 * g + 0.114 * b) for r, g, b in corners) / 4.0
    return "black" if avg_lum < 128 else "white"


def generate_mockup_preview(transparent_art: Image.Image, shirt_key: str = "washed_black") -> Image.Image:
    """Sobrepõe a estampa transparente sobre uma das cores de camiseta oficiais da marca."""
    bg_rgb = SHIRT_COLORS.get(shirt_key, SHIRT_COLORS["washed_black"])
    canvas = Image.new("RGBA", transparent_art.size, bg_rgb + (255,))
    canvas.alpha_composite(transparent_art)
    return canvas.convert("RGB")


def process_image(
    input_path: str,
    output_path: str,
    mode: str = "auto",
    dpi: int = 300,
    create_preview: bool = True
) -> str:
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Arquivo de entrada não encontrado: {input_path}")
        
    img = Image.open(input_path)
    
    if mode == "auto":
        mode = detect_background_mode(img)
        
    if mode == "black":
        result = luminance_knockout_black(img)
    else:
        result = luminance_knockout_white(img)
        
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    result.save(output_path, "PNG", dpi=(dpi, dpi))
    
    msg = f"Arquivo salvo com sucesso: {output_path} ({result.width}x{result.height}px, {dpi} DPI)"
    
    if create_preview:
        base_no_ext, _ = os.path.splitext(output_path)
        preview_path = f"{base_no_ext}_preview_tshirt.jpg"
        preview_shirt = "washed_black" if mode == "black" else "sand"
        preview_img = generate_mockup_preview(result, preview_shirt)
        preview_img.save(preview_path, "JPEG", quality=92)
        msg += f"\nPreview gerado: {preview_path} (Tecido: {preview_shirt})"
        
    return msg


def main():
    parser = argparse.ArgumentParser(description="Color Knockout de Fundo para Estamparia — Christopher")
    parser.add_argument("input", type=str, help="Caminho da imagem de entrada (PNG, JPG, WEBP)")
    parser.add_argument("-o", "--output", type=str, default="", help="Caminho do PNG transparente de saída")
    parser.add_argument("-m", "--mode", choices=["auto", "black", "white"], default="auto", help="Modo de knockout (fundo preto ou branco)")
    parser.add_argument("--dpi", type=int, default=300, help="DPI do arquivo final (padrão: 300)")
    parser.add_argument("--no-preview", action="store_true", help="Não gerar imagem de preview sobre a camiseta")

    args = parser.parse_args()

    input_path = args.input
    output_path = args.output
    if not output_path:
        base, _ = os.path.splitext(input_path)
        output_path = f"{base}_transparent_300dpi.png"

    try:
        feedback = process_image(
            input_path=input_path,
            output_path=output_path,
            mode=args.mode,
            dpi=args.dpi,
            create_preview=not args.no_preview
        )
        print(feedback)
    except Exception as e:
        print(f"Erro ao processar imagem: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
