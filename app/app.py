from flask import Flask, request, jsonify, send_file
from gtts import gTTS
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes of your Flask app


@app.route('/synthesize', methods=['POST'])
def synthesize():
    data = request.get_json()
    text = data.get('text', '')
    language = data.get('language', 'en')

    current_directory = os.path.dirname(os.path.abspath(__file__))

    static_directory = os.path.join(current_directory, 'static')

    if not os.path.exists(static_directory):
        os.makedirs(static_directory)

    file_path = os.path.join(static_directory, 'output.mp3')

    tts = gTTS(text=text, lang=language, slow=False)
    tts.save(file_path)

    response = send_file(file_path, mimetype='audio/mpeg')
    return response


if __name__ == '__main__':
    app.run(port=5000, debug=True)
