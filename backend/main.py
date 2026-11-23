import os
from datetime import date
from typing import Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

app = FastAPI(title="Inkora API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BookingRequest(BaseModel):
    design_id: str
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    preferred_date: date
    placement: str = Field(min_length=2, max_length=80)
    notes: str | None = Field(default=None, max_length=2000)


class BookingResponse(BaseModel):
    id: str
    status: Literal["pending"]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/designs")
def list_designs():
    result = supabase.table("tattoo_designs").select("*").eq("available", True).execute()
    return result.data


@app.get("/designs/{design_id}")
def get_design(design_id: str):
    result = supabase.table("tattoo_designs").select("*").eq("id", design_id).maybe_single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Design not found")
    return result.data


@app.post("/bookings", response_model=BookingResponse, status_code=201)
def create_booking(payload: BookingRequest):
    design = supabase.table("tattoo_designs").select("id").eq("id", payload.design_id).eq("available", True).maybe_single().execute()
    if not design.data:
        raise HTTPException(status_code=404, detail="Design not found or unavailable")

    result = supabase.table("booking_requests").insert({
        "design_id": payload.design_id,
        "full_name": payload.full_name,
        "email": str(payload.email),
        "preferred_date": payload.preferred_date.isoformat(),
        "placement": payload.placement,
        "notes": payload.notes,
        "status": "pending",
    }).select("id, status").single().execute()

    if not result.data:
        raise HTTPException(status_code=500, detail="Could not create booking")

    return result.data
