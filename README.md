# 💬 Chatty — Real-Time Chat App

Chatty is a full-stack real-time chat application built using **React**, **Node.js**, **Express**, and **Socket.IO**. It allows users to sign up, log in, chat instantly, and see who’s online — all in a sleek, Gen-Z–friendly interface.
---
## 🚀 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Zustand, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB, Socket.IO
- **Real-time**: WebSockets via Socket.IO
- **Styling**: Tailwind CSS with dark mode toggle
---
## ✨ Features
- 🔐 JWT Authentication (secure, cookie-based)
- 💬 Real-time messaging with Socket.IO
- 🟢 Online/offline user indicators
- 👤 Profile update and settings
- 🌓 Light/Dark theme support
- 📱 Fully responsive for all devices
---
## 📁 Project Structure
chatty/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ └── index.js
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── store/
│ │ └── App.jsx

## ⚙️ Getting Started

### 🔧 Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

---
### 🖥️ Frontend Setup

cd frontend
npm install
Create a .env file in frontend/:

VITE_BACKEND_URL=https://chattybackend-qu96.onrender.com/api
VITE_SOCKET_URL=https://chattybackend-qu96.onrender.com
Then run:
npm run dev
🛠 Backend Setup
cd backend
npm install
Create a .env file in backend/:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
Then run:
npm run dev

🌍 Live Demo
Frontend: https://chatty29.netlify.app
Backend: https://chattybackend-qu96.onrender.com

