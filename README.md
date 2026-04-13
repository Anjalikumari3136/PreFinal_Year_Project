# 🧠 UniSupport — AI Face Recognition Module
### Powered by FaceNet512 Deep Learning + DeepFace + Flask + React

---

## 📁 Files You Get

```
face-recognition/
├── face-service/              ← Python AI Backend
│   ├── app.py                 ← Main Flask server (ALL AI LOGIC HERE)
│   ├── face_db.py             ← MongoDB operations
│   └── requirements.txt       ← Python packages to install
│
└── face-frontend/
    └── src/
        ├── faceService.js     ← API helper (calls Python server)
        ├── FaceRegister.jsx   ← Registration component
        ├── FaceLogin.jsx      ← Login component
        └── Demo.jsx           ← Demo/test page
```

---

## ⚙️ SETUP — Step by Step

### Step 1: Install Python packages

```bash
cd face-service
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

> ⚠️ First install downloads TensorFlow + DeepFace (~500MB). Be patient.

---

### Step 2: Make sure MongoDB is running

```bash
# Start MongoDB locally
mongod
```

---

### Step 3: Start the Python AI Server

```bash
cd face-service
python app.py
```

You should see:
```
==================================================
  🧠 UniSupport AI Face Recognition Service
  Model  : FaceNet512 (Deep Learning)
  Server : http://localhost:5001
==================================================
  NOTE: First run will download FaceNet512
  model (~250MB). Please wait...
==================================================
```

> ✅ Server runs on http://localhost:5001

---

### Step 4: Install React packages

```bash
cd face-frontend
npm install react-webcam
```

---

### Step 5: Test the Demo

In your main `App.jsx` or `index.jsx`, render the Demo page:

```jsx
import Demo from "./Demo";
function App() { return <Demo />; }
```

Then:
```bash
npm start
```

---

## 🔌 API Endpoints (Your Python Server)

| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/register-face` | Register student's face |
| POST | `/login-face` | Login with face |
| GET | `/face-status/:studentId` | Check if face is registered |
| DELETE | `/delete-face/:studentId` | Delete face data |
| GET | `/health` | Server health check |

---

## 🔗 How to Integrate Into the Main Project

### On Login Page — add Face Login tab:

```jsx
import FaceLogin from "./FaceLogin";

// When face matches, this is called with { studentId }
const handleFaceLogin = ({ studentId }) => {
  // Your group: use studentId to find the student and generate JWT token
  // Example:
  const res = await fetch("/api/auth/face-login", {
    method: "POST",
    body: JSON.stringify({ studentId })
  });
  const { token, student } = await res.json();
  localStorage.setItem("token", token);
  navigate("/dashboard");
};

<FaceLogin
  onLoginSuccess={handleFaceLogin}
  onSwitchToPassword={() => setMode("password")}
/>
```

### On Student Profile Page — add Face Registration:

```jsx
import FaceRegister from "./FaceRegister";

<FaceRegister
  studentId={currentStudent.studentId}
  onSuccess={() => alert("Face registered!")}
/>
```

---

## 🧠 How the AI Works

```
REGISTRATION:
  Photo → OpenCV detects face region
        → Crops & aligns face
        → FaceNet512 neural network
        → Outputs 512 numbers (face embedding)
        → Average of all photos
        → Store in MongoDB

LOGIN:
  Live photo → Same AI pipeline → 512 numbers
             → Cosine similarity vs all stored embeddings
             → Score > 0.75 → MATCH ✅ → Return studentId
             → Score < 0.75 → NO MATCH ❌
```

---

## 🔧 Tuning Accuracy

In `app.py`, find `THRESHOLD = 0.75`:

| Value | Effect |
|-------|--------|
| 0.80 | Very strict — fewer false positives |
| 0.75 | Recommended — balanced |
| 0.65 | Lenient — easier to match |

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| `ModuleNotFoundError: deepface` | Run `pip install -r requirements.txt` in venv |
| `No face detected` | Better lighting, look directly at camera |
| Server offline error in React | Make sure `python app.py` is running |
| MongoDB connection error | Make sure `mongod` is running |
| First run slow | FaceNet512 model downloading (~250MB) — wait for it |

---

## 📋 What to Tell Your Team

> "My part delivers a face recognition microservice.
> It runs on localhost:5001.
> 
> For login: call POST /login-face with a base64 image.
> It returns { studentId, confidence }.
> Use that studentId to find the student in your DB and generate a JWT.
>
> I also made FaceRegister.jsx and FaceLogin.jsx components.
> Just drop them into the project."
