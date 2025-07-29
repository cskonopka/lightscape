import subprocess
import os
import sys

def convert_png_to_svg(png_path, output_dir=None, blur_amount=1.0, dither_pattern="o8x8,2"):
    # Ensure output directory
    if output_dir is None:
        output_dir = os.path.dirname(png_path)
    os.makedirs(output_dir, exist_ok=True)

    base_name = os.path.splitext(os.path.basename(png_path))[0]
    pbm_path = os.path.join(output_dir, f"{base_name}.pbm")
    svg_path = os.path.join(output_dir, f"{base_name}.svg")

    # Step 1: Convert PNG → PBM with blur + ordered dithering
    blur_string = f"0x{blur_amount}"
    subprocess.run([
        "magick", png_path,
        "-blur", blur_string,
        "-colorspace", "Gray",
        "-ordered-dither", dither_pattern,
        pbm_path
    ], check=True)

    # Step 2: Convert PBM → SVG via potrace
    subprocess.run([
        "potrace", pbm_path,
        "-s",               # Output SVG
        "-o", svg_path
    ], check=True)

    print(f"✅ SVG saved to: {svg_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python converter.py input.png [output_dir]")
        sys.exit(1)

    png_input = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else None

    convert_png_to_svg(png_input, output_dir)
