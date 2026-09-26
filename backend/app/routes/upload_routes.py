from fastapi import APIRouter, UploadFile, File, Form, Depends
from pypdf import PdfReader
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import UploadedFile
import io

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    user_email: str = Form("guest"),
    db: Session = Depends(get_db)
):
    contents = await file.read()

    uploaded_file = UploadedFile(
        user_email=user_email,
        filename=file.filename,
        file_type=file.content_type
    )

    db.add(uploaded_file)
    db.commit()

    pdf_file = io.BytesIO(contents)
    reader = PdfReader(pdf_file)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return {"text": text}