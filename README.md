# DevPulse Backend API

DevPulse is a simple backend API for managing software team issues and feature requests.

Built with Node.js, Express.js, TypeScript, and PostgreSQL for the B7A2 assignment.

---

## Live Link

https://devpulse-one-wine.vercel.app/

---

## GitHub Repository

https://github.com/Busra2456/devpulse

---

## Features

- User Registration & Login
- JWT Authentication
- Role-Based Authorization
- Create, Update & Delete Issues
- Issue Filtering & Sorting
- PostgreSQL Database Integration
- Raw SQL Queries
- Global Error Handling

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg
- bcryptjs
- jsonwebtoken
- dotenv
- cors

---

## Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000

CONNECTION_STRING

JWT_SECRET

CLIENT_URL=http://localhost:5000