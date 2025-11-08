# 🪶 GraphQL Guestbook (Realtime)

**Apollo Server / Apollo Client / React / Vite / Tailwind CSS**로 구축된  
**전체 스택 GraphQL 프로젝트**입니다.  
**Query, Mutation, Subscription (실시간)**, **Optimistic UI**, **HTTP + WebSocket 분리 링크**를 포함합니다.

---
## 🖼 Project Banner

![GraphQL Guestbook Banner](./frontend/public/banner.png)

---

## 🌐 Demo

[🔗 Live Demo (Vercel)](https://graphql-guestbook-realtime.vercel.app)  
[⚙️ Backend API (Render)](https://graphql-guestbook-realtime.onrender.com/graphql)

---

## 🧱 기술 스택

| 계층 | 기술 |
|------|------|
| **프론트엔드** | React + Vite + Apollo Client |
| **UI** | Tailwind CSS · 반응형 · Glassmorphism 디자인 |
| **백엔드** | Apollo Server + Express + GraphQL Subscriptions |
| **실시간** | graphql-ws + WebSocket |
| **언어** | JavaScript (ES Modules) |
| **배포** | Vercel (frontend) · Render (backend) |
| **도구** | npm · Node.js · GitHub |

---

## ⚙️ 로컬 실행 방법

### 🗄 백엔드

```bash
cd backend
npm install
npm run dev
# → http://localhost:4000/graphql
# → ws://localhost:4000/graphql
```

### 💻 프론트엔드

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

**옵션 `.env`**
```env
VITE_GRAPHQL_HTTP=http://localhost:4000/graphql
VITE_GRAPHQL_WS=ws://localhost:4000/graphql
```

---

## ✨ 주요 기능

- ✅ **GraphQL Query:** 최신 메시지 가져오기 (페이지네이션)
- ✅ **GraphQL Mutation:** 메시지 추가
- ✅ **GraphQL Subscription:** 실시간 업데이트 (WebSocket)
- ✅ **Optimistic UI:** 서버 응답 전 미리 표시
- ✅ **Cache Dedupe:** Apollo `typePolicies`로 중복 제거
- ✅ **Tailwind 프리미엄 UI:** 채팅 버블 스타일, 반응형
- ✅ **필터:** 전체 / 내가 보낸 메시지 보기
- ✅ **모던 스택:** Apollo HTTP + WS 스플릿 링크
- ✅ **깨끗한 구조:** 재사용 가능한 코드

---

## 🧠 배운 점

- Apollo Client를 HTTP와 WebSocket으로 연결하는 방법
- Optimistic UI 및 캐시 중복 처리
- `graphql-ws`를 이용한 GraphQL Subscriptions 구현
- TailwindCSS로 현대적인 반응형 UI 구성
- Render & Vercel을 이용한 전체 스택 GraphQL 앱 배포

---

## 🧑‍💻 작성자

**DevFayzullo**  
💼 풀스택 / 프론트엔드 개발자  
📫 fayzullo.coder@gmail.com

---

## 🪪 라이선스

MIT
