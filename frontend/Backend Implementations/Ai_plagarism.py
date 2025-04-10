from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Predefined master/AI-generated text to compare against
AI_GENERATED_TEXT = """
Plants use photosynthesis to turn sunlight into chemical energy stored in glucose molecules.
"""

# Load model once
model = SentenceTransformer('all-MiniLM-L6-v2')

app = Flask(__name__)

def check_similarity(student_text: str, ai_generated_text: str, threshold: float = 0.8):
    student_embedding = model.encode([student_text])
    ai_embedding = model.encode([ai_generated_text])
    
    similarity_score = cosine_similarity(student_embedding, ai_embedding)[0][0]
    
    verdict = "Copied or Heavily Paraphrased" if similarity_score >= threshold else "Original or Lightly Paraphrased"
    feedback = (
        "The student's submission is highly similar to AI-generated content. Encourage originality."
        if verdict == "Copied or Heavily Paraphrased"
        else "The submission shows signs of originality. Minor paraphrasing detected."
    )

    return {
        "similarity_score": round(similarity_score * 100, 2),
        "verdict": verdict,
        "feedback": feedback
    }

@app.route('/check-similarity', methods=['POST'])
def similarity_api():
    data = request.json
    student_text = data.get("student_text", "")

    if not student_text:
        return jsonify({"error": "Missing required field: student_text"}), 400

    result = check_similarity(student_text, AI_GENERATED_TEXT)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
