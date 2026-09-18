# SkillCheck AI – Groq Powered Quiz Generator 🧠

SkillCheck AI is an **AI-powered quiz generation platform** that allows users to test their knowledge in different subjects using dynamically generated questions.

The system uses **Groq's openai/gpt-oss-120b** to generate multiple-choice questions and provide intelligent feedback based on user performance.

---

🌐 Live Demo

🔗 https://skillcheck-ai-project-groq-1.onrender.com

Try the application directly in your browser without installing anything.

---

# 🚀 Features

- 🤖 **AI-Generated Quiz Questions**
- 📚 Supports **any academic or professional topic**
- 🎯 **Difficulty Levels**
  - Easy
  - Medium
  - Hard

- 🧠 **AI-Generated Performance Feedback**
- 📊 **Automatic Score Calculation**
- 🔍 **Topic Validation (AI + Backend)**
- 💾 **MongoDB Database Storage**
- ⚡ **Fast AI responses using Groq API**
- 🔐 **User Authentication**
- 🧾 **Quiz Attempt History**

---

# 🏗️ Tech Stack

## Frontend

- React
- React Router
- Axios
- Bootstrap
- React Toastify
- Zustand (for state management)

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## AI Model

- **Groq API**
- Model used:

```
openai/gpt-oss-120b
```

---

# 📂 Project Structure

```
SkillCheck-AI-Project-Groq
│
├── backend
│   │
│   ├── models
│   │   ├── questionsModel.js
│   │   └── userModel.js
│   │
│   ├── routes
│   │   ├── questionsRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middleware
│   │   └── verifyToken.js
│   │
│   ├── Gemini_api.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend
│   │
│   ├── src
│   │   │
│   │   ├── components
│   │   │   ├── Feedback.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── AttemptQuiz.jsx
│   │   │   ├── Quiz.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── store
│   │   │   └── authStore.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```
git clone https://github.com/Ch-SaiTeja333/SkillCheck-AI-Project-Groq.git
cd SkillCheck-AI-Project-Groq
```

---

## 2️⃣ Install Backend Dependencies

```
cd backend
npm install
```

---

## 3️⃣ Install Frontend Dependencies

```
cd ../frontend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend folder**.

```
GROQ_API_KEY=your_groq_api_key
MONGO_URI=your_mongodb_connection_string
PORT=8080
```

---

# ▶️ Running the Project

## Start Backend

```
cd backend
nodemon server
npm run dev
```

## Start Frontend

```
cd frontend
npm run dev
```

Backend runs on:

```
https://skillcheck-ai-project-groq.onrender.com
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🤖 AI Quiz Generation

The backend sends prompts to the **Groq Chat Completion API**.

Endpoint used:

```
POST https://api.groq.com/openai/v1/chat/completions
```

Example Request:

```
{
 "model": "openai/gpt-oss-120b",
 "messages": [
   {
     "role": "user",
     "content": "Generate 5 MCQ questions on DBMS"
   }
 ]
}
```

Example Response:

```
[
  {
    "question": "What does SQL stand for?",
    "options": [
      "Structured Query Language",
      "Sequential Query Language",
      "Standard Question Language",
      "System Query Language"
    ],
    "correctAnswer": "Structured Query Language"
  }
]
```

---

# 📊 Quiz Workflow

1️⃣ User selects:

- Topic
- Difficulty Level
- Number of Questions

2️⃣ Backend:

- Validates topic
- Sends prompt to Groq API

3️⃣ AI generates quiz questions.

4️⃣ Questions are saved to **MongoDB**.

5️⃣ User attempts quiz.

6️⃣ Backend:

- Calculates score
- Stores answers

7️⃣ AI generates **performance feedback**.

---

# 🧠 AI Feedback Example

```
{
 "overallFeedback": "The user shows good understanding of algorithm concepts but needs improvement in data structures.",
 "strengths": [
  "Understands algorithm purpose",
  "Basic problem solving skills"
 ],
 "weakAreas": [
  "Stack operations",
  "Array indexing"
 ],
 "suggestions": [
  "Review core data structures",
  "Practice more DSA problems"
 ]
}
```

---

# 🌟 Future Improvements

- Topic auto-suggestions
- AI explanation for answers
- Leaderboard system
- Timed quizzes
- AI adaptive difficulty
- Deployment with Docker

---

# 👨‍💻 Author

**Sai Teja**

GitHub:
https://github.com/Ch-SaiTeja333

---

# 📜 License

This project is licensed under the MIT License.
