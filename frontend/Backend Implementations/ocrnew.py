import google.generativeai as genai
import base64
import mimetypes

# 🔹 Configure API Key
genai.configure(api_key="AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8")  # Replace with your actual API key

# 🔹 Function to Convert Image to Proper Format
def load_image_for_gemini(path):
    mime_type, _ = mimetypes.guess_type(path)
    with open(path, "rb") as f:
        image_data = f.read()
    return {
        "inline_data": {
            "mime_type": mime_type,
            "data": base64.b64encode(image_data).decode("utf-8")
        }
    }

# 🔹 Image Path
image_path = "D:/Sikshasathi(ml)/handwritten.jpeg"

# 🔹 Initialize the Gemini Vision Model
model = genai.GenerativeModel("gemini-1.5-pro")

# 🔹 Generate Response
response = model.generate_content(
    [
        {"role": "user", "parts": [
            {"text": "Extract all readable text from this image."},
            load_image_for_gemini(image_path)
        ]}
    ]
)

# 🔹 Print the Extracted Text
print("Extracted Text:\n", response.text)
