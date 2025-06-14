# -*- coding: utf-8 -*-
!pip install fastapi uvicorn nest-asyncio pyngrok gdown moviepy librosa numpy opencv-python mediapipe deepface nltk whisper openai ffmpeg-python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('punkt')
nltk.download('punkt_tab')
!pip install fuzzywuzzy python-Levenshtein
!pip install language-tool-python
!pip install langdetect
!pip install nltk
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('averaged_perceptron_tagger_eng')
!pip install -q git+https://github.com/openai/whisper.git

import os
import gdown
import moviepy.editor as mp
import librosa
import numpy as np
import cv2
import mediapipe as mp_face
import subprocess
import whisper
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import nest_asyncio
from deepface import DeepFace
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from language_tool_python import LanguageTool
import nltk
from nltk.stem import WordNetLemmatizer
import uuid
from pyngrok import ngrok
import torch


nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')

nest_asyncio.apply()
app = FastAPI()

lemmatizer = WordNetLemmatizer()

class VideoRequest(BaseModel):
    drive_link: str
    question_type: str  # "technical" or "non-technical"
    keywords: list = []  # Can be empty for non-technical questions

@app.post("/process_video/")
def process_video(request: VideoRequest):
    video_url = request.drive_link
    question_type = request.question_type.lower()
    keywords = [kw.lower() for kw in request.keywords] if request.keywords else []

    unique_id = str(uuid.uuid4())[:8]
    output_path = f"downloaded_{unique_id}.mp4"
    mp4_path = f"converted_{unique_id}.mp4"
    audio_path = f"audio_{unique_id}.wav"

    try:
        file_id = video_url.split("/d/")[1].split("/")[0]
        gdown.download(f"https://drive.google.com/uc?id={file_id}", output_path, quiet=False)

        if output_path.endswith(".webm"):
            subprocess.run([
                "ffmpeg", "-y", "-i", output_path,
                "-c:v", "libx264", "-preset", "ultrafast", "-tune", "zerolatency",
                "-c:a", "aac", "-b:a", "128k", mp4_path
            ], check=True)
        else:
            mp4_path = output_path

        subprocess.run(["ffmpeg", "-i", mp4_path, "-vn", "-ar", "16000", "-ac", "1", audio_path], check=True)

        results = {}

        def detect_spamming(text, keywords):
            words = word_tokenize(text.lower())
            pos_tags = pos_tag(words)
            contains_noun = any(tag.startswith('NN') for _, tag in pos_tags)
            contains_verb = any(tag.startswith('VB') for _, tag in pos_tags)
            contains_pronoun = any(tag in ['PRP', 'PRP$'] for _, tag in pos_tags)
            contains_adjective = any(tag.startswith('JJ') for _, tag in pos_tags)

            keyword_count = sum(text.lower().count(kw) for kw in keywords)
            keyword_ratio = keyword_count / max(len(words), 1)

            if (keyword_ratio > 0.2) or (not (contains_noun or contains_verb or contains_pronoun or contains_adjective) and set(words).issubset(set(keywords))):
                return "Yes"
            return "No"

        def transcribe_audio():
            if not os.path.exists(audio_path):
                return

            results["transcription"] = {}

            whisper_model = whisper.load_model("large", device="cuda" if torch.cuda.is_available() else "cpu")

            english_transcript = whisper_model.transcribe(
                audio_path,
                language="en",
                fp16=True,
                temperature=0.2,
                beam_size=1,
                task="transcribe"
            )["text"]

            results["transcription"]["english"] = english_transcript

            text = results["transcription"]["english"]

            y, sr = librosa.load(audio_path)
            speech_rate = len(text.split()) / (librosa.get_duration(y=y, sr=sr) / 60)
            results["speech_rate"] = round(speech_rate, 2)

            pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
            pitch_values = pitches[pitches > 0]
            avg_pitch = np.mean(pitch_values) if len(pitch_values) > 0 else 0

            if avg_pitch > 200:
                results["speech_tone"] = "Excited"
            elif avg_pitch < 120:
                results["speech_tone"] = "Calm"
            else:
                results["speech_tone"] = "Neutral"

            filler_words = ["um", "uh", "like", "you know", "so"]
            results["filler_words"] = [w for w in word_tokenize(text.lower()) if w in filler_words]

            lang_tool = LanguageTool("en-US")
            grammar_errors = len(lang_tool.check(text))
            words_count = len(text.split())
            grammar_score = max(100 - (grammar_errors / words_count * 100), 0) if words_count > 0 else 100
            results["grammar_score"] = round(grammar_score, 2)

            matched_keywords = [kw for kw in keywords if kw in text.lower()]
            unmatched_keywords = [kw for kw in keywords if kw not in matched_keywords]

            results["answer_correctness"] = round(len(matched_keywords) / len(keywords) * 100, 2) if keywords else None
            results["unmatched_keywords"] = unmatched_keywords if keywords else None
            results["spamming_keywords"] = detect_spamming(text, keywords)

            if speech_rate > 180 and len(results["filler_words"]) > 5:
                results["confidence_score"] = "Moderate"
                results["nervousness_score"] = "High"
            elif speech_rate < 130 and len(results["filler_words"]) < 3:
                results["confidence_score"] = "High"
                results["nervousness_score"] = "Low"
            else:
                results["confidence_score"] = "Moderate"
                results["nervousness_score"] = "Moderate"

        def analyze_video():
            cap = cv2.VideoCapture(mp4_path)
            face_mesh = mp_face.solutions.face_mesh.FaceMesh()
            frame_skip = 60
            frame_count, emotions = 0, []

            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break

                if frame_count % frame_skip == 0:
                    try:
                        analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
                        emotions.append(analysis[0]['dominant_emotion'])
                    except:
                        pass

                frame_count += 1
            cap.release()

            results["emotion"] = max(set(emotions), key=emotions.count) if emotions else "Neutral"

        transcribe_audio()
        analyze_video()

        # 🚨 If spamming is detected, all results are NULL
        if results.get("spamming_keywords") == "Yes":
            return {key: None for key in results}

        # 🚨 Non-Technical Question Handling
        if question_type == "non-technical":
            results.pop("answer_correctness", None)
            results.pop("unmatched_keywords", None)

        return results

    finally:
        for file in [output_path, mp4_path, audio_path]:
            if os.path.exists(file):
                os.remove(file)

NGROK_AUTH_TOKEN = "<Give ur api key here>"
ngrok.set_auth_token(NGROK_AUTH_TOKEN)

ngrok_tunnel = ngrok.connect(8000)
print(f"Public URL: {ngrok_tunnel.public_url}")

uvicorn.run(app, host="0.0.0.0",port=8000)
