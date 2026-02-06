import os
from hmac import compare_digest

from flask import Flask, request, jsonify, session
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

app = Flask(__name__)

SECRET_KEY = os.environ.get('FLASK_SECRET_KEY')
if not SECRET_KEY:
    raise RuntimeError('FLASK_SECRET_KEY is not set')

app.secret_key = SECRET_KEY
serializer = URLSafeTimedSerializer(SECRET_KEY, salt='intro-auth')

INTRO_PASSWORD = os.environ.get('INTRO_PASSWORD')
if not INTRO_PASSWORD:
    raise RuntimeError('INTRO_PASSWORD is not set')

# CORS (for local + Netlify -> Render). With credentials you cannot use "*".
_default_frontend_origins = 'http://localhost:3000,https://yuhi-selfintroduction.netlify.app'
frontend_origins = [
    origin.strip().rstrip('/')
    for origin in os.environ.get('FRONTEND_ORIGINS', _default_frontend_origins).split(',')
    if origin.strip()
]
CORS(
    app,
    resources={r"/api/*": {"origins": frontend_origins}},
    supports_credentials=True,
)

def _parse_bool(value: str | None) -> bool | None:
    if value is None:
        return None
    normalized = value.strip().lower()
    if normalized in ('1', 'true', 'yes', 'y', 'on'):
        return True
    if normalized in ('0', 'false', 'no', 'n', 'off'):
        return False
    return None


def _canonical_samesite(value: str | None) -> str | None:
    if value is None:
        return None
    normalized = value.strip().lower()
    if normalized == 'none':
        return 'None'
    if normalized == 'lax':
        return 'Lax'
    if normalized == 'strict':
        return 'Strict'
    value = value.strip()
    return value or None


cookie_samesite = _canonical_samesite(os.environ.get('SESSION_COOKIE_SAMESITE'))
cookie_secure = _parse_bool(os.environ.get('SESSION_COOKIE_SECURE'))
if cookie_samesite is not None:
    app.config['SESSION_COOKIE_SAMESITE'] = cookie_samesite
if cookie_secure is not None:
    app.config['SESSION_COOKIE_SECURE'] = cookie_secure

# Browsers require Secure when SameSite=None.
if app.config.get('SESSION_COOKIE_SAMESITE') == 'None':
    app.config['SESSION_COOKIE_SECURE'] = True

app.config['SESSION_COOKIE_HTTPONLY'] = True


def _auth_debug_enabled() -> bool:
    return (os.environ.get('AUTH_DEBUG', '') or '').strip().lower() in ('1', 'true', 'yes', 'y', 'on')


def _extract_token_from_request() -> tuple[str | None, str | None]:
    auth_header = request.headers.get('Authorization') or ''
    if auth_header.startswith('Bearer '):
        token = auth_header.removeprefix('Bearer ').strip()
        return (token or None, 'authorization_header')

    data = request.get_json(silent=True) or {}
    maybe_token = data.get('token')
    if isinstance(maybe_token, str) and maybe_token.strip():
        return (maybe_token.strip(), 'json_body')

    maybe_token = request.args.get('token')
    if isinstance(maybe_token, str) and maybe_token.strip():
        return (maybe_token.strip(), 'query')

    maybe_token = request.form.get('token')
    if isinstance(maybe_token, str) and maybe_token.strip():
        return (maybe_token.strip(), 'form')

    return (None, None)


def _validate_token(token: str) -> tuple[bool, str | None]:
    try:
        max_age_seconds = int(os.environ.get('AUTH_TOKEN_MAX_AGE_SECONDS', str(60 * 60 * 24 * 7)))
    except ValueError:
        max_age_seconds = 60 * 60 * 24 * 7

    try:
        payload = serializer.loads(token, max_age=max_age_seconds)
    except SignatureExpired:
        return (False, 'expired')
    except BadSignature:
        return (False, 'bad_signature')
    except ValueError:
        return (False, 'invalid')

    if not (isinstance(payload, dict) and payload.get('authenticated') is True):
        return (False, 'invalid_payload')
    return (True, None)


def _is_authenticated() -> tuple[bool, dict]:
    if session.get('authenticated') is True:
        return (True, {'via': 'session_cookie'})

    token, token_source = _extract_token_from_request()
    if not token:
        return (False, {'via': None, 'token_source': token_source})

    ok, reason = _validate_token(token)
    return (ok, {'via': 'token' if ok else None, 'token_source': token_source, 'token_error': reason})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    password = data.get('password')
    if not isinstance(password, str):
        return jsonify({'success': False, 'message': 'Password is required'}), 400

    if compare_digest(password, INTRO_PASSWORD):
        session['authenticated'] = True
        token = serializer.dumps({'authenticated': True})
        return jsonify({'success': True, 'token': token}), 200
    return jsonify({'success': False, 'message': 'Incorrect password'}), 401


@app.route('/api/auth', methods=['GET', 'POST'])
def auth_status():
    authenticated, details = _is_authenticated()
    response = {'authenticated': authenticated}
    if _auth_debug_enabled():
        response['debug'] = details
    return jsonify(response), 200


@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True}), 200

if __name__ == '__main__':
    app.run(debug=True)
