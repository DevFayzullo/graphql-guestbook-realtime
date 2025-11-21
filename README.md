# 🪶 GraphQL Guestbook (Realtime)

[🇰🇷 한국어 README](./README-kr.md) • [🇺🇿 O‘zbekcha README](./README-uz.md)

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

| Layer          | Technology                                                             |
| -------------- | ---------------------------------------------------------------------- |
| **Frontend**   | React + Vite + Apollo Client                                           |
| **UI**         | Tailwind CSS · Responsive · Glassmorphism Design · Automatic Dark Mode |
| **Backend**    | Apollo Server + Express + GraphQL Subscriptions                        |
| **Realtime**   | graphql-ws + WebSocket                                                 |
| **Language**   | JavaScript (ES Modules)                                                |
| **Deployment** | Vercel (frontend) · Render (backend)                                   |
| **Tools**      | npm · Node.js · GitHub                                                 |

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
- ✅ **Dark Mode:** Adapts automatically to your system’s light or dark preference

---

## 🖼 UI Preview

| Light Mode                                                        | Dark Mode                                                       |
| ----------------------------------------------------------------- | --------------------------------------------------------------- |
| ![light mode screenshot](./frontend/public/preview-lightMode.png) | ![dark mode screenshot](./frontend/public/preview-darkMode.png) |

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
graphql-guestbook-realtime/           # project root
│
├── backend/                          # server-side code
│   ├── src/                          # server source files
│   │   ├── index.js                  # entry point: Apollo Server + Express + WS
│   └── package.json                  # backend dependencies and scripts
│
├── frontend/                         # client-side application
│   ├── public/                       # static assets (icons, images, manifest)
│   │   ├── icons/                    # custom icons
│   │   ├── banner.png                # project banner image
│   │   ├── favicon.ico               # app favicon
│   │   ├── manifest.json             # PWA manifest
│   │   └── preview-darkMode.png      # UI preview light mode screenshot
│   │   └── preview-lightMode.png     # UI preview dark mode screenshot
│   ├── src/                          # React source code
│   │   ├── App.jsx                   # main UI component with GraphQL hooks
│   │   ├── lib/apollo.js             # Apollo Client setup (HTTP/WS split)
│   │   ├── graphql.js                # GraphQL queries, mutations, subscriptions
│   │   ├── index.css                 # Tailwind CSS styles
│   │   └── main.jsx                  # React entry point
│   ├── index.html                    # HTML template
│   ├── tailwind.config.js            # Tailwind CSS configuration (media/dark)
│   ├── postcss.config.js             # PostCSS configuration
│   ├── package.json                  # frontend dependencies and scripts
│   └── .env                          # client environment variables
│
├── README.md                         # project documentation
├── README-kr.md                      # Korean translation
├── README-uz.md                      # Uzbek translation
└── .gitignore                        # ignore patterns for git
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
