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
- Node.js 
- MongoDB Atlas Link

---

### Deployed Backend URL
```
https://paste-bin-pearl.vercel.app/
```
---

### Deployed Frontend URL

```
https://paste-bin-o44b.vercel.app/
```

---

### End points of server
```
post ("/api/pastes", createPaste);
get ("/api/healthz", healthCheck);
get("/api/pastes/:id", getContent);
```
---

### Backend Setup

```bash
$paste_bin> cd backend
$backend> npm install

```
## Backend Run
```bash
$backend> npm start
```
---

### .env
```bash
MONGO_URI=your_mongodb_connection_string
PORT=3000
BASE_URL=http://localhost:5173

```
---

### Frontend SetUp
```bash
$paste_bin> cd frontend
$frontend> npm install

```

### Frontend Run
```bash
$frontend> npm run dev
```
---

## In Frontend mainAPI
```
  1. backendURI="http://localhost:3000"
  2. Then check the functionalities in website.
```
---
### Persistance Layer

```
In .env file set the TEST_MODE=1.
if we set it to 1 then the user input time is not considered.
    let now = Date.now();
    if (process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]) {
      now = Number(req.headers["x-test-now-ms"]);
    }
The time which is comming from headers is considered it is in seconds format.
To avoid the real world time lag.
```
