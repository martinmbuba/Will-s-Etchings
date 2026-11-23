# Will's Etchings

A tattoo design browsing and booking website, organized as a monorepo.

## Project structure

- `frontend/` — React and Vite application
- `backend/` — Python FastAPI API with Supabase integration

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Deploy the `frontend/dist` directory to a static host such as GitHub Pages, Netlify, or Vercel.

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

Run the SQL in `backend/schema.sql` in Supabase before starting the API. Deploy the backend separately to a Python hosting provider.
