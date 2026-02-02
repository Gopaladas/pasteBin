# PasteBin Lite

A simple Pastebin-like web application that allows users to create text pastes with optional
time-based expiry (TTL) and maximum view limits. Pastes can be viewed via a unique URL and
automatically become unavailable when expired or when the view limit is reached.

---

## Features

- Create text pastes
- Optional expiry time (TTL in seconds)
- Optional maximum view limit
- Safe rendering (no script execution)
- Deterministic time support for automated testing
- REST API + React frontend

---

## Tech Stack

- Frontend: React (Vite), Axios, React Router
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Deployment: Vercel

---

## Running the Project Locally

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account or local MongoDB

---

### Backend Setup

```bash
cd backend
npm install

Backend Run
npm start

MONGO_URI=your_mongodb_connection_string
PORT=3000
BASE_URL=http://localhost:5173


