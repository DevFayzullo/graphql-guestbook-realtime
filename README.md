# 🪶 GraphQL Guestbook (Realtime)

**A minimal full-stack GraphQL project** built with  
**Apollo Server / Apollo Client / React / Vite / Tailwind CSS**,  
featuring **Query, Mutation, Subscription (Realtime)** with **optimistic UI** and **HTTP + WebSocket split link**.

> 💬 Send a message and watch it appear in realtime on another tab.

---

## 🖼 Project Banner

![GraphQL Guestbook Banner](./frontend/public/banner.png)

---

## 🌐 Demo

[🔗 Live Demo (Vercel)](https://graphql-guestbook-realtime.vercel.app)  
[⚙️ Backend API (Render)](https://graphql-guestbook-realtime.onrender.com/graphql)

---

## 🧱 Tech Stack

| Layer          | Technology                                       |
| -------------- | ------------------------------------------------ |
| **Frontend**   | React + Vite + Apollo Client                     |
| **UI**         | Tailwind CSS · Responsive · Glassmorphism Design |
| **Backend**    | Apollo Server + Express + GraphQL Subscriptions  |
| **Realtime**   | graphql-ws + WebSocket                           |
| **Language**   | JavaScript (ES Modules)                          |
| **Deployment** | Vercel (frontend) · Render (backend)             |
| **Tools**      | npm · Node.js · GitHub                           |

---

## ⚙️ Run Locally

### 🗄 Backend

```bash
cd backend
npm install
npm run dev
# → http://localhost:4000/graphql
# → ws://localhost:4000/graphql
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

**Optional `.env`**

```env
VITE_GRAPHQL_HTTP=http://localhost:4000/graphql
VITE_GRAPHQL_WS=ws://localhost:4000/graphql
```

---

## ✨ Features

- ✅ **GraphQL Query:** Fetch latest messages with pagination
- ✅ **GraphQL Mutation:** Add new messages
- ✅ **GraphQL Subscription:** Live updates (websocket)
- ✅ **Optimistic UI:** Instantly show message before server response
- ✅ **Cache Dedupe:** No duplicates thanks to Apollo `typePolicies`
- ✅ **Tailwind Premium UI:** Glass card, bubble chat style, responsive layout
- ✅ **Filter Mode:** Show “All” or “My” messages
- ✅ **Modern Stack:** Apollo split link (HTTP + WS)
- ✅ **Reusable code:** Clean modular structure

## 🖼 UI Preview

![GraphQL GuestBook Preview](./frontend/public/preview.png)

---

## 🚀 Deploy Guide

### 1️⃣ Backend (Render)

- Create new **Web Service**
- Environment: Node 18+
- Build Command:
  ```bash
  npm install && npm run start
  ```
- Start Command:
  ```bash
  node src/index.js
  ```
- Expose `/graphql`
- Copy your Render URL, e.g.  
  `https://graphql-guestbook-api.onrender.com/graphql`

### 2️⃣ Frontend (Vercel)

- Set Environment Variables:
  ```env
  VITE_GRAPHQL_HTTP=https://graphql-guestbook-api.onrender.com/graphql
  VITE_GRAPHQL_WS=wss://graphql-guestbook-api.onrender.com/graphql
  ```
- Deploy → Done!

---

## 📁 Folder Structure

```txt
graphql-guestbook-realtime/
│
├── backend/
│   ├── src/
│   │   ├── index.js           # Apollo Server + Express + WS
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── icons/
│   │   ├── banner.png
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   ├── preview.png
│   ├── src/
│   │   ├── lib/apollo.js      # Apollo Client setup (HTTP/WS split)
│   │   ├── App.jsx            # UI + Apollo Hooks (Query/Mutation/Sub)
│   │   ├── graphql.js         # Queries, Mutations, Subscriptions
│   │   ├── index.css          # Tailwind styles
│   │   └── main.jsx
│   ├── .env
│   ├── .env.production
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
├── README-kr.md
├── README-uz.md
└── README.md
```

---

## 🧠 Key Learnings

- How to connect Apollo Client with both **HTTP and WebSocket**
- Managing **optimistic updates** and **cache deduplication**
- Implementing **GraphQL Subscriptions** via `graphql-ws`
- Styling modern UIs using **TailwindCSS + responsive layout**
- Deploying a **full-stack GraphQL app** on Render & Vercel

---

## 🧑‍💻 Author

**DevFayzullo**  
💼 Full Stack / Frontend Developer  
📫 fayzullo.coder@gmail.com

---

## 🪪 License

MIT
