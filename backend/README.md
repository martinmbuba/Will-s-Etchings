# Inkora Python backend

FastAPI API prepared for Supabase.

## Setup

1. Create a Python virtual environment.
2. Install dependencies: `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and add Supabase credentials.
4. Run the SQL in `schema.sql` in the Supabase SQL editor.
5. Start the API: `uvicorn main:app --reload --port 8000`

API documentation is available at `http://localhost:8000/docs`.
