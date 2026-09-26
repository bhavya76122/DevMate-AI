from fastapi import APIRouter
from pydantic import BaseModel
import ollama

router = APIRouter()

class AIRequest(BaseModel):
    task: str
    code: str

def get_prompt(task, user_input):
    prompts = {
        "Explain Code": f"""
Explain this code clearly for a beginner.
Mention:
1. What the code does
2. Line-by-line explanation
3. Output
4. Time complexity if possible

Code:
{user_input}
""",

        "Generate Code": f"""
Generate complete working code for this requirement.
Use simple beginner-friendly code.
Add comments.

Requirement:
{user_input}
""",

        "Find Bugs": f"""
Find bugs in this code.
Give:
1. Mistakes
2. Corrected code
3. Explanation

Code:
{user_input}
""",

        "Convert Java to Python": f"""
Convert this Java code into Python.
Give only clean Python code and short explanation.

Java Code:
{user_input}
""",

        "Generate SQL Query": f"""
Generate SQL query for this requirement.
Also explain the query briefly.

Requirement:
{user_input}
""",

        "Generate Unit Tests": f"""
Generate unit tests for this code.
Use simple test cases and explain them.

Code:
{user_input}
""",

        "Generate Documentation": f"""
Create professional documentation for this project/code.
Include:
1. Overview
2. Features
3. Tech stack
4. How it works
5. README-style content

Input:
{user_input}
""",

        "Resume Analyzer": f"""
Analyze this resume.
Give:
1. Resume score out of 100
2. Strengths
3. Weaknesses
4. Missing skills
5. Project suggestions
6. Improved summary

Resume:
{user_input}
""",

        "Interview Question Generator": f"""
Generate interview questions for this topic/role.
Give:
1. Beginner questions
2. Intermediate questions
3. Advanced questions
4. Coding questions
5. Answers

Topic:
{user_input}
"""
    }

    return prompts.get(task, f"{task}\n\n{user_input}")

@router.post("/ask-ai")
def ask_ai(request: AIRequest):
    prompt = get_prompt(request.task, request.code)

    response = ollama.chat(
        model="llama3.2:1b",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return {"result": response["message"]["content"]}