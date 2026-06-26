# 📘 MiniOps API Gateway — Technical Design Document

## 🧠 Overview

MiniOps API Gateway is a lightweight backend system that provides:

* API service registration
* Request log ingestion
* Analytics generation from stored logs

It simulates a simplified observability system (like Datadog/New Relic), focusing on backend fundamentals: routing, authentication, database design, and aggregation logic.

This is a **backend-only Express + TypeScript system** built for skill reinforcement, not production deployment.

---

# 🎯 Scope

## In Scope

* REST API for service registration
* JWT authentication system
* Manual API request logging endpoint
* Analytics aggregation (stats per service)
* PostgreSQL relational schema design
* Clean Express architecture (controllers/services/middleware)

## Out of Scope

* Frontend/UI
* Redis / caching
* Testing frameworks
* Reverse proxy / request interception
* Microservices architecture

---

# ⚙️ System Architecture

```text
Client (Developer)
   |
   | 1. Auth (Login/Register)
   | 2. Register Service
   | 3. Send Logs manually
   | 4. Fetch Analytics
   v
---------------------------------
     Express Backend (API)
---------------------------------
Routes:
  /auth
  /services
  /logs
  /analytics

Middleware:
  - auth middleware (JWT)
  - validation middleware (Zod)

Services:
  - serviceService
  - logService
  - analyticsService

Database:
  PostgreSQL (Drizzle ORM)
```

---

# 🗄️ Data Model

## User

```text
id (uuid)
email (unique)
password_hash
created_at
```

## Service

```text
id (uuid)
user_id (FK → User)
name
base_url
description
created_at
```

## EndpointLog

```text
id (uuid)
service_id (FK → Service)
user_id (FK → User)
path
method
status_code
response_time
timestamp
```

---

# 🔐 Authentication Design

## Flow

1. User registers
2. User logs in
3. Server issues JWT token
4. Token used for protected routes

## Protected Routes

* /services/*
* /logs/*
* /analytics/*

---

# 📡 API Design

## Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

---

## Services

* POST `/api/services`
* GET `/api/services`
* GET `/api/services/:id`

---

## Logs

* POST `/api/logs`

Payload:

```json
{
  "serviceId": "uuid",
  "path": "/create",
  "method": "GET",
  "statusCode": 200,
  "responseTime": 120
}
```

---

## Analytics

* GET `/api/services/:id/stats`

Returns:

* total requests
* avg response time
* status code breakdown
* top endpoints

---

# 📊 Analytics Logic

You will compute:

* COUNT(*) grouped by service
* AVG(response_time)
* GROUP BY status_code
* GROUP BY path (for top endpoints)

👉 This is pure backend aggregation logic (important skill).

---

# 🧱 Backend Architecture Rules

* Controllers handle request/response only
* Services contain business logic
* Routes only define endpoints
* Middleware handles auth/validation
* DB layer is isolated

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Drizzle ORM
* JWT (jsonwebtoken)
* bcrypt
* Zod
* dotenv
* cors
* morgan

---

# 🧭 Development Plan (2 Hours/Day)

Total expected duration: **7 Days**

---

# 📅 Day 1 — Project Setup + Auth Foundation

⏱ Goal: App runs + auth skeleton ready

### Tasks:

* Initialize Express + TypeScript project
* Setup folder structure
* Setup PostgreSQL connection (Drizzle)
* Create User table
* Implement register endpoint
* Implement login endpoint (JWT issue)
* Setup auth middleware skeleton

### Outcome:

You can:

* register user
* login user
* receive JWT token

---

# 📅 Day 2 — Authentication Completion + Middleware

### Tasks:

* Secure middleware (JWT verify)
* Protect route test endpoint
* Password hashing (bcrypt)
* Refactor auth flow cleanly
* Error handling structure

### Outcome:

* Fully working auth system
* Protected routes working

---

# 📅 Day 3 — Service Registry System

### Tasks:

* Create Service table
* POST /services
* GET /services
* GET /services/:id
* Link services to userId

### Outcome:

* Users can create and view API services

---

# 📅 Day 4 — Log Ingestion System

### Tasks:

* Create EndpointLog table
* POST /logs endpoint
* Validate log input with Zod
* Store logs in DB

### Outcome:

* System can ingest API request logs

---

# 📅 Day 5 — Analytics Engine (Core Logic Day)

### Tasks:

* Implement stats endpoint
* Total request count
* Avg response time calculation
* Status code grouping
* Endpoint grouping logic

### Outcome:

* Working analytics per service

---

# 📅 Day 6 — Refactoring + Clean Architecture

### Tasks:

* Split controllers/services properly
* Improve error handling
* Add consistent response format
* Clean middleware structure
* Improve validation layer

### Outcome:

* Production-style backend structure

---

# 📅 Day 7 — Polish + Edge Cases

### Tasks:

* Fix bugs
* Improve validation coverage
* Add basic logging (morgan/custom)
* Final refactor
* Manual API testing (Postman/Thunderclient)

### Outcome:

* Fully completed backend project

---

# 🚀 Success Criteria

You are done when:

* Auth works (JWT)
* Services can be created per user
* Logs can be stored manually
* Stats are correctly computed
* Code is cleanly structured

---

# 🧠 Final Note

This project is not about complexity.

It is about:

> rebuilding backend intuition from first principles

If you complete this properly, you will naturally become faster at:

* API design
* backend structuring
* debugging server logic
* working with relational data

---