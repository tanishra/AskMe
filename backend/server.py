from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from backend.api_client import ask_question
from backend.logger import log_interaction

app = FastAPI(title="AI Q&A Bot API", version="1.0")

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str

@app.post("/ask", response_model=AnswerResponse)
def ask(request: QuestionRequest):
    question = request.question.strip()

    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    answer = ask_question(question)
    log_interaction(question, answer)

    return AnswerResponse(answer=answer)
