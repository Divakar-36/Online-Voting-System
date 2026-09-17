# Online Voting System

A full-stack web application for conducting secure online elections with separate **Admin** and **Voter** roles.

## Overview

The Online Voting System allows administrators to create and manage elections and candidates, while registered voters can participate in active elections and cast their vote once per election.

The application uses **React.js** for the frontend and **Spring Boot** for the backend, with **MySQL** and **Hibernate/JPA** for data persistence.

## Features

### Admin

* Admin authentication
* Create elections
* Update election details
* Activate or deactivate elections
* Delete elections
* Add candidates to elections
* Edit candidate information
* Delete candidates
* View election results

### Voter

* Voter registration
* Secure login
* View active elections
* View candidates for an election
* Cast a vote
* Prevent duplicate voting for the same election
* View voting status

## Authentication & Security

* Role-based authentication with `ADMIN` and `VOTER` roles
* JWT-based authentication
* Password encryption using BCrypt
* Protected frontend routes
* Protected backend API endpoints
* Stateless Spring Security configuration
* Duplicate voting protection using database constraints and server-side validation

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS
* Vite
* JavaScript (ES6+)

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* Maven

### Database

* MySQL

### Development Tools

* VS Code
* Spring Tool Suite (STS)
* Git
* GitHub
* Postman

## Architecture

```text
Online Voting System
│
├── Frontend
│   ├── React.js
│   ├── Redux Toolkit
│   ├── React Router
│   └── Axios
│
├── Backend
│   ├── Spring Boot
│   ├── REST APIs
│   ├── Spring Security
│   ├── JWT Authentication
│   └── Hibernate/JPA
│
└── Database
    └── MySQL
```

## Database Entities

The application uses the following main entities:

* `User`
* `Election`
* `Candidate`
* `Vote`

### Relationships

```text
User
 │
 └── Vote
      │
      ├── Election
      │
      └── Candidate

Election
 │
 └── Candidates
```

A vote connects a voter, election, and selected candidate.

The system prevents a voter from voting more than once in the same election using server-side validation and a database-level unique constraint.

## Project Structure

```text
Online-Voting-System/
│
├── backend/
│   ├── src/main/java/com/voting/backend/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   │
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── store/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Running the Project Locally

### Backend

Navigate to the backend:

```bash
cd backend
```

Run the Spring Boot application using STS or:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### Frontend

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Environment Configuration

Sensitive configuration is kept outside the GitHub repository.

The application uses:

```text
application-local.properties
```

for local database configuration.

The JWT secret is provided through the `JWT_SECRET` environment variable.

Sensitive files and credentials are excluded using `.gitignore`.

## Main API Areas

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Admin

```text
/api/admin/elections
/api/admin/candidates
/api/admin/elections/{id}/results
```

### Voter

```text
GET  /api/voter/elections
GET  /api/voter/elections/{id}/candidates
GET  /api/voter/elections/{id}/status
POST /api/voter/elections/{electionId}/candidates/{candidateId}/vote
```

## Voting Flow

```text
Voter Login
     ↓
View Active Elections
     ↓
Select Election
     ↓
View Candidates
     ↓
Select Candidate
     ↓
Submit Vote
     ↓
Server Validates Vote
     ↓
Vote Stored in Database
     ↓
Voting Status Updated
```

## Security Flow

```text
Login
  ↓
Backend validates credentials
  ↓
JWT token generated
  ↓
Frontend stores authentication state
  ↓
JWT sent with API requests
  ↓
Spring Security validates JWT
  ↓
Role checked
  ↓
Protected API accessed
```

## Future Improvements

* Deploy frontend and backend to production
* Add email notifications
* Add election scheduling automation
* Add audit logging
* Add automated tests
* Add Docker support
* Improve result visualization
* Add cloud database support

## Author

**Divakar Dupana**

B.Tech – Computer Science and Engineering

GitHub: [Divakar-36](https://github.com/Divakar-36)

LinkedIn: [Divakar Dupana](https://www.linkedin.com/in/divakar-dupana-795069368)

````

### Step 2 — Save

Press:

**Ctrl + S**

### Step 3 — Check Git

In your VS Code terminal, make sure you are here:

```text
C:\Users\divak\OneDrive\Desktop\Online-Voting-System>
````

Run:

```bash id="c5e9zn"
git status
```

You should see:

```text
Untracked files:
    README.md
```

Send me the `git status` output before we commit it.
