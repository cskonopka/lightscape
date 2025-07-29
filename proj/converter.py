import os
import subprocess

# === CONFIGURATION ===
input_dir = "input_pngs"
output_dir = "output_svgs"
temp_dir = "temp_bitmaps"

# === SETUP ===
os.makedirs(output_dir, exist_ok=True)
os.makedirs(temp_dir, exist_ok=True)

# === PROCESS FILES ===
for filename in os.listdir(input_dir):
    if filename.lower().endswith(".png"):
        base_name = os.path.splitext(filename)[0]
        png_path = os.path.join(input_dir, filename)
        pbm_path = os.path.join(temp_dir, base_name + ".pbm")
        svg_path = os.path.join(output_dir, base_name + ".svg")

        print(f"Processing: {filename}")

        # Step 1: Convert PNG to PBM (bitmap) using `magick`
        subprocess.run(["magick", png_path, "-threshold", "50%", pbm_path], check=True)

        # Step 2: Use potrace to convert PBM to SVG
        subprocess.run(["potrace", pbm_path, "-s", "-o", svg_path], check=True)

print("✅ All images converted to SVG using ImageMagick v7!")
