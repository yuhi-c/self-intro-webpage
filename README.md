# Self-intro Webpage

Personal self-introduction website.

## Tech
- Frontend: React (Create React App)
- Backend: Flask (password login API)
- Hosting: Netlify (frontend) + Render (backend)

## Repository Structure
```
.
├─ backend/
│  ├─ password.py            # Flask API (/api/login)
│  ├─ requirements.txt
│  ├─ Procfile               # Render start command (gunicorn)
│  └─ .env.example           # example env vars (do NOT commit real secrets)
├─ public/
├─ src/
│  ├─ components/            # reusable UI building blocks
│  ├─ pages/                 # page components (Home/Background/Projects/Password)
│  ├─ routes/                # routing helpers (ProtectedRoute)
│  ├─ styles/
│  └─ config.js              # frontend runtime config (API base URL)
├─ package.json
└─ package-lock.json
```

## Environment Variables

### Backend (Render / local)
- `INTRO_PASSWORD` (required): password used by `/api/login`
- `FLASK_SECRET_KEY` (required): secret used to sign the session cookie
- `FRONTEND_ORIGINS` (recommended): comma-separated allowed origins for CORS (e.g. your Netlify URL)
- `SESSION_COOKIE_SAMESITE` / `SESSION_COOKIE_SECURE` (recommended for Netlify -> Render cookies)

### Frontend (Netlify / local)
- `REACT_APP_API_BASE_URL` (optional): backend base URL
	- default: `https://self-intro-webpage.onrender.com`

## Local Development

### Frontend
```bash
npm install
npm start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
INTRO_PASSWORD='your-password' FLASK_SECRET_KEY='dev-secret' python password.py
```

## Deployment

### Netlify (Frontend)
- Build command: `npm run build`
- Publish directory: `build`

### Render (Backend)
- Set environment variables: `INTRO_PASSWORD`, `FLASK_SECRET_KEY`
- Set `FRONTEND_ORIGINS` to your Netlify site URL
- For cross-site cookies (Netlify -> Render): set `SESSION_COOKIE_SAMESITE=None` and `SESSION_COOKIE_SECURE=true`
- Start command: `gunicorn password:app`
