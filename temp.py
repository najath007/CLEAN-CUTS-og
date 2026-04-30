import urllib.request
import re

req = urllib.request.Request(
    'https://www.bewakoof.com/men-oversized-t-shirts', 
    headers={'User-Agent': 'Mozilla/5.0'}
)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
        # Look for bewakoof images
        matches = re.findall(r'https://images\.bewakoof\.com/t640/[a-zA-Z0-9_-]+\.jpg', html)
        
        # Print unique matches
        for m in list(set(matches))[:15]:
            print(m)
except Exception as e:
    print("Error:", e)
