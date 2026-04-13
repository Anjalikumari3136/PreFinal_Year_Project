# CampusConnect: UniSupport - System Architecture & Database Design

## 1. System Architecture

The system follows a standard **Client-Server Architecture** (3-Tier Architecture) tailored for modern web applications.

### **Tiers:**
1.  **Presentation Layer (Frontend)**:
    *   Built with **React.js** for a dynamic, Single Page Application (SPA).
    *   **Tailwind CSS** for responsive and modern styling.
    *   Communicates with the backend using **Axios** via REST APIs.
    *   Handles user interactions (forms, dashboards, notifications).

2.  **Application Logic Layer (Backend)**:
    *   Built with **Node.js** and **Express.js**.
    *   Acts as the API provider.
    *   Handles authentication (JWT), authorization (Role-based), business logic (request processing, notification dispatching), and input validation.
    *   Follows MVC (Model-View-Controller) pattern (though strictly Controller-Service-Model in APIs).

3.  **Data Persistence Layer (Database)**:
    *   **MongoDB** (NoSQL Database).
    *   Stores users, requests, messages, and logs.
    *   Flexible schema allows for easy updates to data structures (e.g., adding new request types).

### **High-Level Flow:**
- **User** logs in -> **Frontend** sends credentials -> **Backend** validates & issues **JWT**.
- **User** submits a request -> **Frontend** sends POST request with token -> **Backend** verifies token -> Saves to **MongoDB**.
- **Admin** views requests -> **Backend** queries **MongoDB** -> Returns JSON data -> **Frontend** renders dashboard.

---

## 2. Database Design (MongoDB Schemas)

We will use **Mongoose** to define schemas.

### **1. User Schema**
Stores information about students, faculty, and admins.
```javascript
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  role: { 
    type: String, 
    enum: ['STUDENT', 'FACULTY', 'ADMIN'], 
    default: 'STUDENT' 
  },
  department: { type: String }, // E.g., CSE, ECE
  studentId: { type: String }, // For students
  designation: { type: String }, // For faculty
  createdAt: { type: Date, default: Date.now }
});
```

### **2. Service Request Schema**
Tracks academic or administrative requests raised by students.
```javascript
const RequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { 
    type: String, 
    enum: ['ACADEMIC', 'ADMINISTRATIVE', 'EXAM', 'OTHER'], 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'], 
    default: 'PENDING' 
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Faculty/Admin
  resolutionNotes: { type: String },
  attachments: [{ type: String }], // URLs to gridfs or cloud storage
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

### **3. Notification Schema**
For broadcasting announcements or sending specific alerts.
```javascript
const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetAudience: { 
    type: String, 
    enum: ['ALL', 'STUDENTS', 'FACULTY'], 
    default: 'ALL' 
  },
  // OR specific recipients
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});
```

### **4. Mentorship Session Schema**
Manages appointments between students and mentors.
```javascript
const SessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Is_REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'], 
    default: 'Is_REQUESTED' 
  },
  topics: { type: String },
  notes: { type: String }
});
```

### **5. Feedback/Grievance Schema**
Allows anonymous or named feedback details.
```javascript
const FeedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Null if anonymous
  category: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
```

---

## 3. Backend Folder Structure (Planned)

We will follow a modular, scalable structure suitable for enterprise apps.

```
/backend
  /config         # DB connection, env variables
  /controllers    # Business logic (handle requests, talk to DB)
  /models         # Mongoose Schemas
  /routes         # Express routes (API endpoints)
  /middleware     # Auth checks, error handling, file upload
  /utils          # Helper functions (email, validators)
  index.js        # Entry point
  package.json
```

---

## 4. REST API Endpoints (Planned)

### **Authentication**
- `POST /api/auth/register` - Register a new user (Student/Faculty).
- `POST /api/auth/login` - Login and receive JWT.
- `GET /api/auth/me` - Get current user profile (Protected).

### **Requests (Student & Admin)**
- `POST /api/requests` - Create a new request.
- `GET /api/requests` - Get all requests (Admin) or my requests (Student).
- `GET /api/requests/:id` - Get specific request details.
- `PUT /api/requests/:id` - Update status (Admin/Faculty) or details.

### **Notifications**
- `GET /api/notifications` - Get notifications for the logged-in user.
- `POST /api/notifications` - Create a notification (Admin only).
- `PUT /api/notifications/:id/read` - Mark as read.

### **Mentorship (Sessions)**
- `GET /api/sessions` - Get my sessions.
- `POST /api/sessions` - Book a session.
- `PUT /api/sessions/:id` - Confirm/Cancel session.

### **Feedback**
- `POST /api/feedback` - Submit feedback.
- `GET /api/feedback` - View all feedback (Admin).

---

## 5. Frontend Folder Structure (Planned)

We will use **React** with **Vite** and **Tailwind CSS**.

```
/frontend
  /public
  /src
    /assets         # Images, fonts
    /components     # Reusable UI components
      /common       # Button, Input, Card, Modal
      /layout       # Navbar, Sidebar, Footer
    /context        # React Context (AuthContext)
    /pages          # Page components
      Login.jsx
      Register.jsx
      Dashboard.jsx
      Requests.jsx
      Profile.jsx
    /services       # API calls (Axios instances)
    /utils          # Helper functions, constants
    App.jsx         # Main Router
    main.jsx
    index.css       # Tailwind directives
```
```
