# 📝 ScribeConnect

**Bridging the Gap for Inclusive Education.**

ScribeConnect is a dedicated platform designed to connect visually impaired and disabled students with willing volunteers who can act as scribes for exams and assignments. By leveraging intelligent matching algorithms, we ensure students find the right help quickly, safely, and efficiently.

---

## 🚀 Key Features

### 🎓 For Students
-   **Easy Scribe Requests:** Post requests for upcoming exams with details like subject, date, time, and specific needs.
-   **Smart Matching:** Automatically get connected with volunteers in your city who match your academic requirements.
-   **Material Upload:** Upload reference materials (notes, past papers) for your scribe to review beforehand.
-   **Real-time Status:** Track the status of your requests (Pending, Accepted, Completed).
-   **Profile Management:** Manage your disability details and communication preferences.

### 🙌 For Volunteers
-   **Intelligent Dashboard:** View "Incoming Requests" that are specifically filtered for your location and expertise.
-   **Active Assignments:** Manage your accepted schedules and access student-uploaded materials.
-   **Impact Tracking:** View your volunteering history and impact statistics.
-   **Profile Customization:** Set your preferred subjects, languages, and availability.

---

## 🛠️ Tech Stack

ScribeConnect is built using the **MERN Stack** for a robust and scalable architecture.

### **Frontend**
-   **Framework:** [React.js](https://react.dev/) (powered by [Vite](https://vitejs.dev/))
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Routing:** React Router DOM
-   **State Management:** React Hooks
-   **HTTP Client:** Axios

### **Backend**
-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
-   **Authentication:** JWT (JSON Web Tokens) & BcryptJS
-   **File Storage:** Multer (Local storage for profile photos & documents)

---

## 🧠 AI & Intelligent Matching Algorithm

ScribeConnect uses a **Multi-Layered Heuristic Matching Engine** to ensure high-quality connections between students and volunteers.

### How it Works:

1.  **Layer 1: Geo-Location Hard Filtering (100% Precision)**
    *   The system first filters volunteers strictly by **City** and **State**.
    *   *Result:* A volunteer in Mumbai will **only** ever see requests from students in Mumbai. This ensures zero logistical failures.

2.  **Layer 2: Weighted Scoring System (The "AI" Logic)**
    *   Once location is matched, the system calculates a `MatchScore` for every request to prioritize the best academic fit.
    *   **Base Score (+50):** Awarded for location match.
    *   **Subject Expertise (+30):** If the request's subject (e.g., "Mathematics") or student's course matches the volunteer's listed expertise. This uses fuzzy keyword matching.
    *   **Language Compatibility (+20):** If the student's preferred language matches one of the volunteer's spoken languages.

### Accuracy
*   **Location Accuracy:** **100%**. The strict filter guarantees no mismatched locations.
*   **Relevance Precision:** The weighted scoring ensures that a Math major volunteer sees "Calculus Exam" requests *at the top* of their list, while a Literature major sees them lower down, optimizing the success rate of every connection.

---

## 📦 Installation & Setup

### Prerequisites
-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas connection string)

### One-Click Setup (Recommended)

**For Windows:**
Double-click the `run_project.bat` file in the root directory.

**For Mac/Linux:**
Open a terminal and run:
```bash
./run_project.sh
```

These scripts will automatically:
1.  Check for Node.js.
2.  Install all backend and frontend dependencies.
3.  Create `.env` files from templates.
4.  Launch both the Backend and Frontend servers.

**⚠️ Important:** After the script creates the `.env` files for the first time, you **MUST** open `backend/.env` and paste your `MONGODB_URI` connection string.

---

### Manual Setup

#### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MONGODB_URI
npm run dev
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## 🤝 Contributing
This project was developed to make education accessible to everyone. If you'd like to contribute, please fork the repository and submit a pull request.

---

**© 2026 ScribeConnect. All rights reserved.**