# 🪶 GraphQL Guestbook (Realtime) — Uzbekcha

[🇬🇧 English README](./README.md) • [🇰🇷 한국어 README](./README.ko.md)

**Minimal full-stack GraphQL loyiha**, quyidagilar asosida qurilgan:  
**Apollo Server / Apollo Client / React / Vite / Tailwind CSS**  
va **Query · Mutation · Subscription (Realtime)** hamda **optimistic UI** bilan ishlaydi.

> 💬 Xabar yuboring va boshqa oynada realtime tarzda paydo bo‘lishini ko‘ring.

---

## 🖼 Loyihaning Banneri

![GraphQL Guestbook Banner](./frontend/public/banner.png)

---

## 🌐 Demo

[🔗 Live Demo (Vercel)](https://graphql-guestbook-realtime.vercel.app)  
[⚙️ Backend API (Render)](https://graphql-guestbook-realtime.onrender.com/graphql)

---

## 🧱 Texnologiyalar

| Qatlam       | Texnologiya                                                   |
| ------------ | ------------------------------------------------------------- |
| **Frontend** | React + Vite + Apollo Client                                  |
| **UI**       | Tailwind CSS · Responsive · Glassmorphism UI · Avto Dark Mode |
| **Backend**  | Apollo Server + Express + GraphQL Subscriptions               |
| **Realtime** | graphql-ws + WebSocket                                        |
| **Til**      | JavaScript (ES Modules)                                       |
| **Deploy**   | Vercel (frontend) · Render (backend)                          |
| **Asboblar** | npm · Node.js · GitHub                                        |

---

## ⚙️ Lokal ishga tushirish

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

**Ixtiyoriy `.env`**

```env
VITE_GRAPHQL_HTTP=http://localhost:4000/graphql
VITE_GRAPHQL_WS=ws://localhost:4000/graphql
```

---

## ✨ Xususiyatlar

- ✅ **Query:** So‘nggi xabarlarni pagination bilan olish
- ✅ **Mutation:** Yangi xabar yuborish
- ✅ **Subscription:** Realtime yangilanishlar
- ✅ **Optimistic UI:** Javobni kutmasdan xabarni ko‘rsatish
- ✅ **Cache Dedupe:** Apollo `typePolicies` orqali dublikatlarning oldini olish
- ✅ **Tailwind Premium UI**
- ✅ **Filter:** “Hammasi” yoki “Meniki” rejimi
- ✅ **Split link:** HTTP + WS
- ✅ **Dark Mode**: tizimga mos auto

---

## 🖼 UI OLDINDAN KO'RISH

| Yorug' Rejim                                                      | Qorong'i Rejim                                                  |
| ----------------------------------------------------------------- | --------------------------------------------------------------- |
| ![light mode screenshot](./frontend/public/preview-lightMode.png) | ![dark mode screenshot](./frontend/public/preview-darkMode.png) |

---

## 🚀 Deploy bo‘yicha qo‘llanma

### 1️⃣ Backend — Render

- Yangi **Web Service** yarating
- Muhit: Node 18+
- Build Command:
  ```bash
  npm install && npm run start
  ```
- Start Command:
  ```bash
  node src/index.js
  ```
- `/graphql` endpoint ochiq bo‘lsin

### 2️⃣ Frontend — Vercel

`.env` o‘rnating:

```env
VITE_GRAPHQL_HTTP=https://graphql-guestbook-api.onrender.com/graphql
VITE_GRAPHQL_WS=wss://graphql-guestbook-api.onrender.com/graphql
```

Deploy → Tamom.

---

## 📁 Loyihaning tuzilmasi

```
graphql-guestbook-realtime/           # loyiha ildizi
│
├── backend/                          # server qismi kodi
│   ├── src/                          # server manba fayllari
│   │   ├── index.js                  # kirish nuqtasi: Apollo Server + Express + WS
│   └── package.json                  # backend bog‘liqliklari va skriptlar
│
├── frontend/                         # frontend ilova qismi
│   ├── public/                       # statik fayllar (ikonlar, rasmlar, manifest)
│   │   ├── icons/                    # maxsus ikonlar
│   │   ├── banner.png                # loyiha banner rasmi
│   │   ├── favicon.ico               # favicon belgi
│   │   ├── manifest.json             # PWA manifesti
│   │   └── preview-darkMode.png      # Dark mode old ko‘rinishi
│   │   └── preview-lightMode.png     # Light mode old ko‘rinishi
│   ├── src/                          # React manba kodlari
│   │   ├── App.jsx                   # GraphQL hooklari bilan asosiy UI komponent
│   │   ├── lib/apollo.js             # Apollo Client sozlamalari (HTTP/WS)
│   │   ├── graphql.js                # GraphQL query, mutation, subscriptionlari
│   │   ├── index.css                 # Tailwind CSS stillari
│   │   └── main.jsx                  # React kirish fayli
│   ├── index.html                    # HTML shablon
│   ├── tailwind.config.js            # Tailwind CSS konfiguratsiyasi
│   ├── postcss.config.js             # PostCSS konfiguratsiyasi
│   ├── package.json                  # frontend bog‘liqliklari va skriptlar
│   └── .env                          # frontend muhit o‘zgaruvchilari
│
├── README.md                         # loyiha hujjatlari
├── README-kr.md                      # Koreyscha tarjima
├── README-uz.md                      # O‘zbekcha tarjima
└── .gitignore                        # git uchun e’tibordan chetga olinadigan fayllar

```

---

## 🧠 O‘rganilgan narsalar

- Apollo Client bilan **HTTP + WebSocket** ulash
- **Optimistic UI** bilan ishlash
- **graphql-ws** orqali realtime subscription
- TailwindCSS yordamida zamonaviy UI yaratish
- Render & Vercel’da full-stack GraphQL deploy

---

## 🧑‍💻 Muallif

**DevFayzullo**  
💼 Full Stack / Frontend Developer  
📫 fayzullo.coder@gmail.com

---

## 🪪 Litsenziya

MIT.
