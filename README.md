
# Health Information System

> A secure, efficient system designed to help doctors manage clients and hospital programs through an intuitive web interface. Built with React, Node.js, and MySQL.

---

## Tech Stack

<div align="left">
  
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white&style=for-the-badge" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge" alt="Node.js Badge"/>
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge" alt="MySQL Badge"/>
  <img src="https://img.shields.io/badge/Styling-CSS-1572B6?logo=css3&logoColor=white&style=for-the-badge" alt="CSS Badge"/>
  <img src="https://img.shields.io/badge/UI-ReactBootstrap-7952B3?logo=bootstrap&logoColor=white&style=for-the-badge" alt="React Bootstrap Badge"/>

</div>

---

## Key Features
- **Authentication:**
  - Secure login with **JWT Access Tokens** and **Refresh Tokens** stored in **HttpOnly cookies**.
- **Form Handling:**
  - User-friendly forms with **React Hook Form** and **Zod** validation.
- **Clients Management:**
  - **CRUD operations**, **server-side pagination**, and a **debounced search bar**.
- **Programs Management:**
  - Assign **single or multiple clients** to different programs.
- **Client Profile API:**
  - Exposed API with **rate limiting** for protection against abuse.
- **Reports:**
  - Dynamic reports with **Chart.js**.
- **System Access Requests:**
  - Allow users to **request access** for new accounts.

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Mark-crypto/Health-Information-System
```

### 2. Install Dependencies

- **Frontend:**
  ```bash
  cd frontend
  npm install
  ```

- **Backend:**
  ```bash
  cd backend
  npm install
  ```

### 3. Set up Environment Variables

Create a `.env` file inside the backend directory with the following keys:
```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

> Make sure your MySQL server is running locally and the database exists.

### 4. Running the Application

- Start the **frontend**:
  ```bash
  npm run dev
  ```
  (Runs at `http://localhost:5173`)

- Start the **backend**:
  ```bash
  npm start
  ```
  (Runs at `http://localhost:5000`)

### 5. Test Login

Use the dummy user credentials to log in:
- **Email:** `kante@test.com`
- **Password:** `12345678`

---

## Future Improvements
- **Downloadable Reports and Logs**
- **Two-Factor Authentication (2FA)**
- **Email Automation** for System Access Requests

---

## About the Project
The **Health Information System** aims to provide an easy-to-use, secure way for doctors and healthcare institutions to manage their clients, programs, and reports without the need for bulky traditional software.

---
**Quote** You never finish a program, you just stop working on it.
