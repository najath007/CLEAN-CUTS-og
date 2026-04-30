import os
from PIL import Image

def crop_image(path):
    try:
        img = Image.open(path)
        w, h = img.size
        # Crop the top 60% of the image to focus on the torso/t-shirt
        # Usually heads are at top, shirt is in the middle, legs at bottom.
        # So we want from y=0 to y=h*0.75
        crop_h = int(h * 0.75)
        # But wait, we can also crop the bottom 30% and leave the top 70%.
        # Let's crop from top 0 to 70% height.
        cropped = img.crop((0, 0, w, int(h * 0.70)))
        cropped.save(path)
        print(f"Successfully cropped {path}")
    except Exception as e:
        print(f"Error cropping {path}: {e}")

images = [
    'd:/projects/CleanCuts/public/images/vintage1.png',
    'd:/projects/CleanCuts/public/images/vintage2.png',
    'd:/projects/CleanCuts/public/images/vintage3.png',
    'd:/projects/CleanCuts/public/images/vintage4.png'
]

for img in images:
    crop_image(img)
