# 📚 Course Code Generator

An automated web-based system to generate **unique and structured course codes** for academic institutions.  
The system ensures **consistency, prevents duplication, and reduces manual errors** in course management.

---

## ✨ Features
- 🔐 User signup, login, and password reset  
- 🏷️ Generate course codes in the format: `MCC + Department + Numeric ID` (Example: `MCCSCT101`)  
- ✅ Prevent duplicate course codes  
- 📋 View all generated course codes  
- 🧾 Export course list to PDF  
- 🚀 Responsive React frontend  

---

## 🛠️ Tech Stack
- **Frontend**: React.js, CSS/Bootstrap  
- **Backend**: Node.js, Express.js, MongoDB (Atlas or Compass)  
- **Other Tools**: CORS, Body-Parser, PDFKit/html-pdf  

---

## 📂 Project Structure
course-code-generator/
├── client/ # React frontend
├── server/ # Node.js/Express backend
├── .gitignore
└── README.md


---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/raginisilimkar/course-code-generator.git
cd course-code-generator

```
### 2️⃣ Setup Backend (Server)
```bash
cd server
npm install
npm start

```
### 3️⃣ Setup Frontend (Client)
```bash
cd ../client
npm install
npm start


```
## 📜 API Endpoints

### 🔐 Authentication

POST /register → Register a new user

POST /login → Authenticate a user

POST /verify-email → Verify email for password reset

POST /reset-password → Reset user password

### 📘 Courses

POST /generatecode → Generate a new course code

GET /get-courses → Retrieve all generated courses

GET /dropdown → Fetch available department list

