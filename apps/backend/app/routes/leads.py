from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional, List

from app.db import create_lead, list_leads

router = APIRouter()

class LeadIn(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    score: Optional[int] = 0
    stage: Optional[str] = "New"

class LeadOut(LeadIn):
    id: int
    created_at: str

@router.post("/", response_model=LeadOut, status_code=201)
def create(lead: LeadIn):
    try:
        data = lead.dict()
        created = create_lead(data)
        return {**created}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[LeadOut])
def list_all(limit: int = 50):
    return list_leads(limit=limit)
