import os
import shutil
from PIL import Image

src_dir = r"C:\Users\NAJATH\.gemini\antigravity\brain\4cca7d7a-3ba3-482c-a9aa-e86698fb9f3a"
dest_dir = r"d:\projects\CleanCuts\public\images"

# Mapping of keywords to their final filenames in public/images
files_to_copy = {
    "women_pink": "women_pink.png",
    "women_classic": "women_classic.png",
    "women_vintage": "women_vintage.png",
    "women_urban": "women_urban.png",
    "kids_play": "kids_play.png",
    "kids_explorer": "kids_explorer.png",
    "kids_dream": "kids_dream.png",
    "kids_style": "kids_style.png",
    "brand_supreme": "brand_supreme.png",
    "brand_offwhite": "brand_offwhite.png",
    "brand_nike": "brand_nike.png",
    "brand_bape": "brand_bape.png",
}

for file in os.listdir(src_dir):
    for key, dest_name in files_to_copy.items():
        if file.startswith(key) and file.endswith(".png"):
            src_path = os.path.join(src_dir, file)
            dest_path = os.path.join(dest_dir, dest_name)
            
            # Copy file
            shutil.copy2(src_path, dest_path)
            
            # Crop image (top 70%) to focus on t-shirt
            try:
                img = Image.open(dest_path)
                w, h = img.size
                cropped = img.crop((0, 0, w, int(h * 0.70)))
                cropped.save(dest_path)
                print(f"Copied and cropped {dest_name}")
            except Exception as e:
                print(f"Failed to crop {dest_name}: {e}")
