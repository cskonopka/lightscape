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

        # Step 1: Simple grayscale + threshold conversion (preserves full impact shape)
        try:
            subprocess.run([
                "magick", png_path,
                "-colorspace", "Gray",
                "-threshold", "50%",  # You can tune this: try 40%, 60% depending on images
                pbm_path
            ], check=True)
        except subprocess.CalledProcessError:
            print(f"❌ Error during magick processing for {filename}")
            continue

        # Step 2: Trace to SVG using Potrace
        try:
            subprocess.run([
                "potrace", pbm_path,
                "-s",
                "-o", svg_path
            ], check=True)
        except subprocess.CalledProcessError:
            print(f"❌ Error during potrace for {filename}")
            continue

        print(f"✅ Saved SVG: {svg_path}")

print("\n🎉 All PNGs processed and vectorized using the original (working) method.")
