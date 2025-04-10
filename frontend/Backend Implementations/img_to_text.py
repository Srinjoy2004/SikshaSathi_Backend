import easyocr

# Initialize the EasyOCR Reader
reader = easyocr.Reader(['en'])  # 'en' for English language

# Define the image path
img_path = "D:/Sikshasathi(ml)/WhatsApp Image 2025-04-04 at 21.59.27.jpeg"

# Read text from the image
results = reader.readtext(img_path)

# Extract and print the detected text
for (bbox, text, prob) in results:
    print(f"Detected Text: {text} (Confidence: {prob:.2f})")
import logging

# Initialize the logger
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize the EasyOCR Reader
reader = easyocr.Reader(['en'])  # 'en' for English language

# Define the image path
img_path = "D:/Sikshasathi(ml)/WhatsApp Image 2025-04-04 at 21.59.27.jpeg"

# Log the image path
logging.info(f"Reading text from image: {img_path}")

try:
    # Read text from the image
    results = reader.readtext(img_path)
    logging.info("Text extraction successful")
except Exception as e:
    logging.error(f"Error reading text from image: {str(e)}")

# Extract and print the detected text
ans=""
for (bbox, text, prob) in results:
    # logging.info(f"Detected Text: {text} (Confidence: {prob:.2f})")
    # if(prob>0.2):
    ans=ans+ " "+ text+" "
# print(ans)
# ans="teh"
# import google.generativeai as genai

# client = genai.Client(api_key="AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8")

import google.generativeai as genai

# Set up the API key
genai.configure(api_key="AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8")

# Choose a model (e.g., Gemini-Pro)
model = genai.GenerativeModel("gemini-2.0-flash")

response = model.generate_content(ans+" + convert it into relevant text but modify words but dont change too much try to keep nearest relevent words beacues we are using ocr dont give extra text just give proper answer")
print(response.text)
