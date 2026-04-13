from pymongo import MongoClient
from datetime import datetime

# ── Connect to MongoDB ────────────────────────────────
client = MongoClient("mongodb://localhost:27017/")
db = client["unisupport"]
face_collection = db["face_embeddings"]

def save_face_embedding(student_id, embedding):
    """Save or update a student's face embedding in MongoDB"""
    face_collection.update_one(
        {"studentId": student_id},
        {
            "$set": {
                "studentId": student_id,
                "embedding": embedding,
                "registeredAt": datetime.now(),
                "model": "Facenet512"
            }
        },
        upsert=True
    )

def get_all_embeddings():
    """Get all stored face embeddings"""
    return list(face_collection.find({}, {"_id": 0}))

def get_embedding_by_id(student_id):
    """Get a specific student's embedding"""
    return face_collection.find_one({"studentId": student_id}, {"_id": 0})

def delete_face_embedding(student_id):
    """Remove a student's face data"""
    face_collection.delete_one({"studentId": student_id})

def face_exists(student_id):
    """Check if student has registered face"""
    return face_collection.count_documents({"studentId": student_id}) > 0

def get_all_student_ids():
    """Get list of all registered student IDs"""
    return [doc["studentId"] for doc in face_collection.find({}, {"studentId": 1, "_id": 0})]
