from flask import Flask, request, jsonify
import google.generativeai as genai

# Configure your Gemini API Key
genai.configure(api_key="AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8")  # replace with your actual key

# Initialize model
model = genai.GenerativeModel("gemini-1.5-pro")

app = Flask(__name__)

@app.route('/evaluate', methods=['POST'])
def evaluate_assignment():
    data = request.json

    master_copy = data.get("master_copy", "")
    student_copy = data.get("student_copy", "")
    judging_criteria = data.get("judging_criteria", "")
    # print(master_copy)

    if not master_copy or not student_copy or not judging_criteria:
        return jsonify({"error": "Missing one or more required fields"}), 400

    # Build prompt
    prompt = f"""
You are an intelligent assistant helping a teacher evaluate a student assignment.

MASTER COPY:
\"\"\"{master_copy}\"\"\"

STUDENT COPY:
\"\"\"{student_copy}\"\"\"

JUDGING CRITERIA:
\"\"\"{judging_criteria}\"\"\"

🎯 TASK:
1. Divide the master copy into sections.
2. Extract the topic, section names, and their weightages.
3. Match student content with the expected points from each section.
4. Assign marks for each section based on completeness and judging criteria.
5. Calculate the total score out of 100.
6. Provide feedback for each section.
7. Add final feedback and remarks.

🎯 OUTPUT FORMAT:
Return JSON like:
{{
  "topic": "<Topic Name>",
  "total_marks": 100,
  "scored_marks": <calculated>,
  "sections": [
    {{
      "title": "<Section Title>",
      "expected_points": ["point1", "point2", ...],
      "weightage": <percentage>,
      "score_awarded": <int>,
      "feedback": "<section-specific feedback>",
      "summary": "<exact summary from master copy>"
    }},
    ...
  ],
  "overall_feedback": "<general feedback>",
  "remarks": "<one-line final remark>"
}}

ONLY return the JSON. Do not add extra comments.
"""

    try:
        response = model.generate_content(prompt)
        return response.text  # Use with caution — Gemini output should be trusted
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
