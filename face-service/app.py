from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace
import numpy as np
import base64
import cv2
import os

app = Flask(__name__)
CORS(app)

os.makedirs("temp", exist_ok=True)

def base64_to_image(base64_str, filename):
    if "," in base64_str:
        base64_str = base64_str.split(",")[1]
    img_bytes = base64.b64decode(base64_str)
    img_array = np.frombuffer(img_bytes, dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    
    # ── Make image bigger and brighter for better detection ──
    img = cv2.resize(img, (640, 480))
    img = cv2.convertScaleAbs(img, alpha=1.3, beta=30)
    
    filepath = f"temp/{filename}"
    cv2.imwrite(filepath, img)
    return filepath

def extract_embedding(image_path):
    # Try every detector — skip means no detection needed
    detectors = ["skip", "opencv", "ssd"]
    for detector in detectors:
        try:
            result = DeepFace.represent(
                img_path=image_path,
                model_name="Facenet512",
                enforce_detection=False,
                detector_backend=detector,
                align=False
            )
            if result and len(result) > 0:
                print(f"  ✅ Face captured using: {detector}")
                return result[0]["embedding"]
        except Exception as e:
            print(f"  ❌ {detector} failed: {e}")
            continue
    return None

def cosine_similarity(vec1, vec2):
    v1 = np.array(vec1)
    v2 = np.array(vec2)
    dot = np.dot(v1, v2)
    norm = np.linalg.norm(v1) * np.linalg.norm(v2)
    return float(dot / norm) if norm != 0 else 0.0

def cleanup(filepath):
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
    except:
        pass

# ── MongoDB ───────────────────────────────────────────
from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client["unisupport"]
face_collection = db["face_embeddings"]

# ── REGISTER FACE ─────────────────────────────────────
@app.route("/register-face", methods=["POST"])
def register_face():
    try:
        data = request.json
        student_id = data.get("studentId", "").strip()
        images = data.get("images", [])

        if not student_id:
            return jsonify({"error": "studentId is required"}), 400
        if not images:
            return jsonify({"error": "No images received"}), 400

        print(f"\n[REGISTER] Student: {student_id}")
        print(f"[REGISTER] Photos received: {len(images)}")

        all_embeddings = []

        for i, img_b64 in enumerate(images):
            temp_path = f"temp/reg_{student_id}_{i}.jpg"
            try:
                base64_to_image(img_b64, f"reg_{student_id}_{i}.jpg")
                embedding = extract_embedding(temp_path)
                if embedding:
                    all_embeddings.append(embedding)
                    print(f"  Photo {i+1}: ✅ Success")
                else:
                    print(f"  Photo {i+1}: ❌ Failed")
            except Exception as e:
                print(f"  Photo {i+1}: ❌ Error: {e}")
            finally:
                cleanup(temp_path)

        print(f"[REGISTER] Valid faces: {len(all_embeddings)}/{len(images)}")

        # ── Accept even 1 valid face ──────────────────
        if len(all_embeddings) == 0:
            return jsonify({
                "error": "Could not process any photos. Please try again."
            }), 400

        avg_embedding = np.mean(all_embeddings, axis=0).tolist()

        face_collection.update_one(
            {"studentId": student_id},
            {
                "$set": {
                    "studentId": student_id,
                    "embedding": avg_embedding,
                    "registeredAt": datetime.now(),
                    "model": "Facenet512"
                }
            },
            upsert=True
        )

        return jsonify({
            "success": True,
            "message": f"Face registered successfully using {len(all_embeddings)} photos!",
            "photosUsed": len(all_embeddings),
            "model": "FaceNet512"
        })

    except Exception as e:
        print(f"[REGISTER] Error: {e}")
        return jsonify({"error": str(e)}), 500


# ── LOGIN WITH FACE ───────────────────────────────────
@app.route("/login-face", methods=["POST"])
def login_face():
    try:
        data = request.json
        image_b64 = data.get("image", "")

        if not image_b64:
            return jsonify({"error": "No image provided"}), 400

        print(f"\n[LOGIN] Processing...")

        temp_path = base64_to_image(image_b64, "login_attempt.jpg")
        login_embedding = extract_embedding(temp_path)
        cleanup(temp_path)

        if login_embedding is None:
            return jsonify({
                "error": "Could not process face. Please try again."
            }), 400

        all_students = list(face_collection.find({}, {"_id": 0}))

        if not all_students:
            return jsonify({
                "error": "No faces registered yet. Please register first."
            }), 404

        print(f"[LOGIN] Comparing against {len(all_students)} faces...")

        THRESHOLD = 0.60
        best_match = None
        best_score = 0.0

        for student in all_students:
            stored = student.get("embedding")
            if not stored:
                continue
            score = cosine_similarity(login_embedding, stored)
            print(f"  {student['studentId']}: {score:.4f}")
            if score > best_score:
                best_score = score
                best_match = student

        if best_match and best_score >= THRESHOLD:
            confidence = round(best_score * 100, 2)
            print(f"[LOGIN] ✅ Match: {best_match['studentId']} ({confidence}%)")
            return jsonify({
                "success": True,
                "studentId": best_match["studentId"],
                "confidence": confidence,
                "model": "FaceNet512"
            })
        else:
            print(f"[LOGIN] ❌ No match. Best: {best_score:.4f}")
            return jsonify({
                "success": False,
                "error": "Face not recognized. Try again."
            }), 401

    except Exception as e:
        print(f"[LOGIN] Error: {e}")
        return jsonify({"error": str(e)}), 500


# ── OTHER ROUTES ──────────────────────────────────────
@app.route("/face-status/<student_id>", methods=["GET"])
def face_status(student_id):
    exists = face_collection.count_documents({"studentId": student_id}) > 0
    return jsonify({"studentId": student_id, "faceRegistered": exists})

@app.route("/delete-face/<student_id>", methods=["DELETE"])
def delete_face(student_id):
    face_collection.delete_one({"studentId": student_id})
    return jsonify({"success": True})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "running", "model": "FaceNet512"})

# ── START SERVER ──────────────────────────────────────
if __name__ == "__main__":
    print("=" * 50)
    print("  🧠 UniSupport AI Face Recognition")
    print("  Running on http://localhost:5001")
    print("=" * 50)
    app.run(port=5001, debug=False)