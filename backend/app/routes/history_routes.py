from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Conversation, UploadedFile

router = APIRouter()

class HistoryRequest(BaseModel):
    user_email: str
    task: str
    input_text: str
    output_text: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/save")
def save_history(request: HistoryRequest, db: Session = Depends(get_db)):
    history = Conversation(
        user_email=request.user_email,
        task=request.task,
        input_text=request.input_text,
        output_text=request.output_text
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return {"message": "History saved successfully"}

@router.get("/{user_email}")
def get_history(user_email: str, db: Session = Depends(get_db)):
    records = (
        db.query(Conversation)
        .filter(Conversation.user_email == user_email)
        .order_by(Conversation.id.desc())
        .all()
    )

    return records
@router.get("/stats/{user_email}")
def get_stats(user_email: str, db: Session = Depends(get_db)):
    total_conversations = (
        db.query(Conversation)
        .filter(Conversation.user_email == user_email)
        .count()
    )

    total_files = (
        db.query(UploadedFile)
        .filter(UploadedFile.user_email == user_email)
        .count()
    )

    return {
        "ai_requests": total_conversations,
        "conversations": total_conversations,
        "files_uploaded": total_files
    }
@router.delete("/{user_email}")
def delete_history(user_email: str, db: Session = Depends(get_db)):
    db.query(Conversation).filter(
        Conversation.user_email == user_email
    ).delete()

    db.commit()

    return {"message": "History deleted successfully"}
