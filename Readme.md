# 📝 Secure Notes Application (MERN Stack)

A **secure, production-ready Notes Application** built using **React, Node.js, Express, and MongoDB**, focusing on **high security**, **clean architecture**, and **real-world authentication practices**.

This project demonstrates how to build a modern SPA with **HttpOnly cookie authentication**, **protected routes**, and **backend-enforced authorization** without exposing sensitive data to the frontend.

---

## 📌 Table of Contents

- Project Overview
- Features
- Tech Stack
- Project Structure
- Authentication & Security Design
- Frontend Architecture
- Backend Architecture
- Protected Routes Explained
- Error Handling Strategy
- Logout & Session Handling
- Environment Variables
- Setup & Installation
- Deployment Guide
- Common Issues & Fixes
- Future Improvements

---

## 🚀 Project Overview

This application allows users to:

- Register and log in securely
- Create, read, update, and delete notes
- Access notes only when authenticated
- Be automatically redirected on logout or session expiry

The main goal of this project is to implement **secure authentication and authorization** using **industry-standard practices**.

---

## ✨ Features

### 🔐 Authentication

- Login & Signup
- JWT stored in **HttpOnly cookies**
- No JWT access from frontend JavaScript
- Secure logout

### 🛡 Authorization

- Protected routes
- Backend-validated sessions
- Automatic redirect on `401 Unauthorized`

### 📝 Notes Management

- Create notes
- Update notes
- Fetch user-specific notes
- Secure API access

### 🧠 UX & Stability

- No page reloads
- Graceful handling of unauthorized access
- App never crashes on logout or expired sessions

---

## 🛠 Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Tailwind CSS
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Cookie-based authentication

---

## 🗂 Project Structure
project-root/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── vercel.json
│ └── package.json
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── server.js
│ ├── .env
│ └── package.json
│
├── .gitignore
└── README.md
