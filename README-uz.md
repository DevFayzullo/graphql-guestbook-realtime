# 🪶 GraphQL Guestbook (Realtime)

Bu **Apollo Server / Apollo Client / React / Vite / Tailwind CSS** yordamida qurilgan  
to‘liq **GraphQL full-stack loyihasi**.  
U **Query, Mutation, Subscription (Realtime)**, **Optimistic UI**, va **HTTP + WebSocket split link** texnologiyalarini o‘z ichiga oladi.

---

## 🖼 Project Banner

![GraphQL Guestbook Banner](./frontend/public/banner.png)

---
<!-- ---

## 🌐 Demo

[🔗 Vercel Live Demo](https://your-vercel-app-url.vercel.app)  
[⚙️ Render Backend API](https://your-render-api-url.onrender.com/graphql) -->

---

## 🧱 Texnologiyalar

| Qatlam | Texnologiya |
|--------|--------------|
| **Frontend** | React + Vite + Apollo Client |
| **UI** | Tailwind CSS · Responsive · Glassmorphism dizayn |
| **Backend** | Apollo Server + Express + GraphQL Subscriptions |
| **Realtime** | graphql-ws + WebSocket |
| **Til** | JavaScript (ES Modules) |
| **Deploy** | Vercel (frontend) · Render (backend) |
| **Vositalar** | npm · Node.js · GitHub |

---

## ⚙️ Mahalliy ishga tushirish

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

- ✅ **GraphQL Query:** So‘nggi xabarlarni olish (pagination bilan)
- ✅ **GraphQL Mutation:** Yangi xabar yuborish
- ✅ **GraphQL Subscription:** Real-time yangilanish (WebSocket)
- ✅ **Optimistic UI:** Server javobini kutmasdan natija ko‘rsatish
- ✅ **Cache Dedupe:** Apollo `typePolicies` orqali dublikatni oldini olish
- ✅ **Tailwind dizayn:** Chat bubble uslubi, responsive interfeys
- ✅ **Filter:** “Hammasi” yoki “Mening” xabarlarimni ko‘rsatish
- ✅ **Zamonaviy stack:** Apollo HTTP + WS split
- ✅ **Toza kod:** Modulli, qayta foydalaniladigan tuzilma

---

## 🧠 O‘rganilgan narsalar

- Apollo Client’ni HTTP va WebSocket bilan ulash
- Optimistic UI va cache deduplikatsiya
- `graphql-ws` orqali Subscription ishlatish
- Tailwind yordamida zamonaviy, responsive UI tuzish
- Render va Vercel’da full-stack GraphQL loyihani deploy qilish

---

## 🧑‍💻 Muallif

**DevFayzullo**  
💼 Full Stack / Frontend dasturchi  
📫 fayzullo.coder@gmail.com

---

## 🪪 Litsenziya

MIT
