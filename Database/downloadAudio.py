import os
import requests
import json

# Load the JSON file
with open('./audiobook.json', 'r') as file:
    data = json.load(file)

# Create the 'audio' folder if it doesn't exist
os.makedirs('audio', exist_ok=True)

# Iterate through the books and download the zip files
for book in data['books']:
    url = book.get('url_zip_file')
    title = book.get('title', 'unknown_title').replace(' ', '_').replace('/', '_')
    
    if url:
        print(f"Downloading {title} from {url}...")
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()  # Raise an error for bad status codes
            
            # Save the file in the 'audio' folder
            file_path = os.path.join('audio', f"{title}.zip")
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Downloaded and saved to {file_path}")
        except requests.exceptions.RequestException as e:
            print(f"Failed to download {title}: {e}")
    else:
        print(f"No url_zip_file found for {title}")

print("Download process completed.")