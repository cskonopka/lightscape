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

        print(f"\n🔄 Processing: {filename}")

        # STEP 1: Enhance and convert to PBM using ImageMagick
        try:
            subprocess.run([
                "magick", png_path,
                "-colorspace", "Gray",    # Convert to grayscale
                "-auto-level",            # Normalize contrast
                "-edge", "1",             # Edge detection
                "-negate",                # Black on white
                "-threshold", "40%",      # Binarize
                pbm_path
            ], check=True)
        except subprocess.CalledProcessError:
            print(f"❌ Error during magick processing for {filename}")
            continue

        # STEP 2: Vectorize with Potrace
        try:
            subprocess.run([
                "potrace", pbm_path,
                "-s",                  # Output SVG
                "-o", svg_path
            ], check=True)
        except subprocess.CalledProcessError:
            print(f"❌ Error during potrace for {filename}")
            continue

        print(f"✅ Saved SVG: {svg_path}")

print("\n🎉 All eligible PNGs have been processed and vectorized!")
