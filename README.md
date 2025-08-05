# 🧑‍💼 MiniLinkedIn – A Minimal LinkedIn-like Community Platform

This is a full-stack MERN (MongoDB, Express, React, Node.js) web app that simulates a minimal LinkedIn platform. Users can register, login, create posts, view profiles, and update their bios.

---

## 🚀 Live Demo

- **Frontend**: Deployed on [Vercel](https://mini-linked-in-frontend.vercel.app)
- **Backend**: Hosted on [Render](https://minilinkedin-backend-tvto.onrender.com)

---

## 🧩 Features

- 🔐 User Registration & Login (with hashed passwords and JWT tokens)
- 📝 Authenticated Post Creation
- 👤 Public Profile View (Bio, Email, Posts)
- ✏️ Bio Editing (by the profile owner only)
- 📜 View All Posts on Home Feed
- 📎 Protected Routes & Cookie-Based Auth

---

## 🛠️ Tech Stack

### Frontend

- React.js + Vite
- Tailwind CSS for UI
- React Router DOM

### Backend

- Node.js & Express.js
- MongoDB & Mongoose
- JWT for Authentication
- bcryptjs for Password Hashing
- CORS, dotenv, cookie-parser

---

## 🗂 Project Structure

```
MiniLinkedin_platform/
├── client/                          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                     # API request functions
│   │   ├── components/              # Reusable UI components
│   │   ├── context/                 # Global context (like AuthContext)
│   │   ├── pages/                   # Route pages (Home, Login, Profile, etc.)
│   │   ├── App.jsx                  # Main app entry
│   │   └── main.jsx                 # React root
│   ├── .env                         # Optional frontend env
│   ├── index.html
│   └── vite.config.js
│
├── server/                          # Express backend
│   ├── models/                      # Mongoose schemas (User.js, Post.js)
│   ├── routes/                      # Route handlers (auth.js, users.js, posts.js)
│   ├── middlewares/                # Custom middleware (authMiddleware.js)
│   ├── .env                         # Backend environment variables
│   ├── server.js                    # Entry point
│   └── package.json
│
├── .gitignore
├── README.md                        # Project overview
└── package-lock.json (root-level if monorepo)
```

---

## 📦 Setup Instructions

### 📦 .env Setup (Backend)

Create a `.env` file in the server folder:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-url.vercel.app
```

---

### 📦 .env Setup (Frontend)

Create a `.env` file in the client folder if needed for environment-specific configs.

---

### 🧪 Run Locally

```bash
# Backend
cd server
npm install
npm start

# Frontend
cd client
npm install
npm run dev
```

---

## 🧑‍💻 Author

- GitHub: [ShivamTanwar0801](https://github.com/ShivamTanwar0801)
- Email: shivamtanwar0801@gmail.com

---

## 📜 License

This project is licensed under the MIT License.
