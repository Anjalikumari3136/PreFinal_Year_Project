# CampusConnect: UniSupport
## All-in-One Academic and Student Support Management System

### abstract
CampusConnect is a centralized web-based portal designed to streamline academic, administrative, and student support services. It bridges the gap between students, faculty, and administration by providing a unified platform for request management, mentorship scheduling, and campus-wide communication.

### Problem Statement
Current university systems are often fragmented, relying on manual paperwork and disjointed communication channels. This leads to:
*   Inefficient service request tracking.
*   Lack of transparency in administrative processes.
*   Limited accessibility to mentorship and counseling.
*   Delayed dissemination of critical information.

### Proposed Solution
UniSupport addresses these challenges through:
*   **Role-Based Access Control (RBAC)**: secure portals for Students, Faculty, and Admin.
*   **Automated Request Handling**: A ticket-based system for certificates, fee queries, and exam issues.
*   **Digital Mentorship**: integrated booking and logging for counseling sessions.
*   **Real-time Notifications**: Instant alerts for campus updates.

### System Architecture
The application is built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js):
*   **Frontend**: React.js with Tailwind CSS for a responsive, modern UI.
*   **Backend**: Node.js & Express.js creating a robust REST API.
*   **Database**: MongoDB for flexible and scalable data storage.
*   **Authentication**: JWT (JSON Web Tokens) for secure session management.

### Key Features
1.  **Student Dashboard**: View request status, book sessions, receive notifications.
2.  **Admin Dashboard**: Manage requests, broadcast alerts, view analytics.
3.  **Mentorship Module**: Calendar-based appointment scheduling.
4.  **Feedback System**: Anonymous or named grievance submission.

### Tech Stack
*   **Frontend**: React, Tailwind CSS, Vite, Axios, React Router.
*   **Backend**: Node.js, Express, Mongoose, JWT, Bcrypt.
*   **Tools**: Postman (Testing), Git (Version Control), VS Code.

### Installation & Setup
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo/campus-connect.git
    cd CampusConnect
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    # Create .env file with MONGO_URI and JWT_SECRET
    npm run dev
    ```

3.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
