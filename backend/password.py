import os
from hmac import compare_digest

from flask import Flask, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)

SECRET_KEY = os.environ.get('FLASK_SECRET_KEY')
if not SECRET_KEY:
    raise RuntimeError('FLASK_SECRET_KEY is not set')

app.secret_key = SECRET_KEY

INTRO_PASSWORD = os.environ.get('INTRO_PASSWORD')
if not INTRO_PASSWORD:
    raise RuntimeError('INTRO_PASSWORD is not set')

# CORS (for Netlify -> Render).
frontend_origins = [
    origin.strip().rstrip('/')
    for origin in os.environ.get('FRONTEND_ORIGINS', 'http://localhost:3000').split(',')
    if origin.strip()
]
CORS(
    app,
    resources={r"/api/*": {"origins": frontend_origins}},
    supports_credentials=True,
)

cookie_samesite = os.environ.get('SESSION_COOKIE_SAMESITE')
cookie_secure = os.environ.get('SESSION_COOKIE_SECURE')
if cookie_samesite:
    app.config['SESSION_COOKIE_SAMESITE'] = cookie_samesite
if cookie_secure is not None:
    app.config['SESSION_COOKIE_SECURE'] = cookie_secure.lower() in ('true')

app.config['SESSION_COOKIE_HTTPONLY'] = True

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    password = data.get('password')
    if not isinstance(password, str):
        return jsonify({'success': False, 'message': 'Password is required'}), 400

    if compare_digest(password, INTRO_PASSWORD):
        session['authenticated'] = True
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Incorrect password'}), 401


@app.route('/api/auth', methods=['GET'])
def auth_status():
    return jsonify({'authenticated': session.get('authenticated') is True}), 200


@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(debug=True)
