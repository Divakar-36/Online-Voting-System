# Online Voting System

A full-stack web application for conducting secure online elections with role-based access for administrators and voters.

## Live Demo

**Frontend:**
https://online-voting-system-mu-nine.vercel.app/

**Backend:**
https://online-voting-system-g4s9.onrender.com/

## GitHub

https://github.com/Divakar-36/Online-Voting-System

## Features

### Admin

* Secure admin login
* Create and manage elections
* Add and manage candidates
* Activate elections
* View election results
* Delete elections

### Voter

* Voter registration and login
* View active elections
* View election candidates
* Cast a vote
* Prevent duplicate voting
* View voting results

### Security

* JWT-based authentication
* Role-based authorization
* ADMIN and VOTER roles
* Password encryption using BCrypt
* Protected REST APIs
* Duplicate-vote prevention at the backend

## Tech Stack

### Frontend

* React.js
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS
* Vite

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* REST APIs

### Database

* MySQL

### Deployment

* Vercel — Frontend
* Render — Backend
* Railway — MySQL Database

## Application Flow

```text
Admin
  │
  ├── Login
  ├── Create Election
  ├── Add Candidates
  ├── Activate Election
  └── View Results

Voter
  │
  ├── Register/Login
  ├── View Active Election
  ├── Select Candidate
  ├── Cast Vote
  └── View Result

Security
  │
  ├── JWT Authentication
  ├── Role-Based Authorization
  └── Duplicate Vote Prevention
```

## Voting Process

1. Admin creates an election.
2. Admin adds candidates.
3. Admin activates the election.
4. Voter logs into the system.
5. Voter selects an election.
6. Voter selects a candidate.
7. Backend validates the voting request.
8. Vote is stored in MySQL.
9. A voter cannot vote again in the same election.
10. Admin can view the election results.

## Project Structure

```text
Online-Voting-System/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   └── Dockerfile
│
└── README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Divakar-36/Online-Voting-System.git
cd Online-Voting-System
```

### 2. Start MySQL

Create a MySQL database:

```sql
CREATE DATABASE online_voting;
```

Configure your local database credentials in:

```text
backend/src/main/resources/application-local.properties
```

### 3. Start the Backend

Open the `backend` folder and run:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### 4. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## API

The application uses REST APIs for communication between the React frontend and Spring Boot backend.

Authentication:

```text
POST /api/auth/login
POST /api/auth/register
```

Admin operations:

```text
/api/admin/**
```

Voter operations:

```text
/api/voter/**
```

## Key Highlights

* Full-stack React + Spring Boot application
* REST API based architecture
* JWT authentication
* Role-based authorization
* MySQL database with Hibernate/JPA
* Redux Toolkit state management
* Production deployment
* Backend-level duplicate-vote protection
* Admin election and candidate management

## Author

**Divakar Dupana**

B.Tech — Computer Science and Engineering

GitHub:
https://github.com/Divakar-36

LinkedIn:
https://www.linkedin.com/in/divakar-dupana-795069368
