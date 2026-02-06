import os
from hmac import compare_digest

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

INTRO_PASSWORD = os.environ.get('INTRO_PASSWORD')
if not INTRO_PASSWORD:
    raise RuntimeError('INTRO_PASSWORD is not set')

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    password = data.get('password')
    if not isinstance(password, str):
        return jsonify({'success': False, 'message': 'Password is required'}), 400

    if compare_digest(password, INTRO_PASSWORD):
        return jsonify({'success': True}), 200
    return jsonify({'success': False, 'message': 'Incorrect password'}), 401

if __name__ == '__main__':
    app.run(debug=True)
