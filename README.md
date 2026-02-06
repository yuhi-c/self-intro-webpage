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
INTRO_PASSWORD='your-password' python password.py
```

## Deployment

### Netlify (Frontend)
- Build command: `npm run build`
- Publish directory: `build`
- (Optional) Environment: `REACT_APP_API_BASE_URL=https://<your-render-service>.onrender.com`

### Render (Backend)
- Set environment variable: `INTRO_PASSWORD`
- Start command: `gunicorn password:app`
