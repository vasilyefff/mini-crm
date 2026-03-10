# 🚀 Mini CRM

Mini CRM — это небольшое CRM-приложение для управления клиентами и сделками.

Проект разработан в учебных целях для практики создания frontend-приложений на React и построения простого REST API на Node.js.

Приложение позволяет:

* 👤 создавать и удалять клиентов
* 💼 создавать и удалять сделки
* 🔗 связывать сделки с клиентами
* 📊 просматривать базовую статистику на Dashboard

---

# 🎯 Цель проекта

Основная цель проекта — закрепить навыки разработки SPA-приложений и понять, как frontend взаимодействует с backend через API.

В процессе разработки были изучены и применены следующие инструменты и подходы:

* React и архитектура компонентных приложений
* TypeScript и типизация данных
* Redux Toolkit для управления состоянием
* работа с асинхронными запросами
* построение простого REST API
* взаимодействие frontend и backend

Проект демонстрирует базовые принципы построения **CRUD-приложений**, которые используются в большинстве бизнес-систем.

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Redux Toolkit
* React Redux
* Vite

## Backend

* Node.js
* Express
* REST API

---

# 📂 Структура проекта

```
mini-crm
│
├ server
│  ├ server.js
│  └ package.json
│
├ src
│  ├ app
│  │   └ store.ts
│  │
│  ├ features
│  │   ├ clients
│  │   │   └ clientsSlice.ts
│  │   │
│  │   └ deals
│  │       └ dealsSlice.ts
│  │
│  ├ layout
│  │   └ Layout.tsx
│  │
│  ├ pages
│  │   ├ DashboardPage.tsx
│  │   ├ ClientsPage.tsx
│  │   └ DealsPage.tsx
│  │
│  ├ types
│  │   ├ client.ts
│  │   └ deal.ts
│  │
│  ├ App.tsx
│  └ main.tsx
```

---

# ⚙️ Установка и запуск

## 1. Клонировать репозиторий

```
git clone <repo-url>
```

---

## 2. Установить зависимости

```
npm install
```

---

## 3. Запустить frontend

```
npm run dev
```

Frontend будет доступен по адресу:

```
http://localhost:5173
```

---

## 4. Запустить backend

Перейти в папку server:

```
cd server
npm install
```

Запустить сервер:

```
node server.js
```

Backend будет доступен по адресу:

```
http://localhost:4000
```

---

## 🌐 Live Demo

Frontend:
https://endearing-sunshine-9df1c2.netlify.app

Backend API:
https://mini-crm-api-s2zd.onrender.com

---

# 👨‍💻 Автор
Кирилл Васильев
