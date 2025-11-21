# Cerope-Assignment

A modern full-stack web application for seamless user authentication, profile setup, and personal profile management.  
Built with a polished UI, secure backend, and intuitive user flow.

---


## 📸 Screenshots

### 🔐 Sign In Page
![Sign In](./images/signin.jpg)

### 📝 Sign Up Page
![Sign Up](./images/signup.jpg)

### 👤 Setup Profile
![Setup](./images/setup.jpg)

### 📄 User Profile Page
![Profile](./images/profile.jpg)

---

## 📌 Overview

Cerope is a stylish and secure user onboarding flow featuring:

- Secure login & registration  
- JWT authentication with HTTP-only cookies  
- Guided profile setup  
- Editable profile interface  
  
---

### 🔒 Authentication
- Register new users  
- Login using secure HTTP-only JWT cookies  
- Logout functionality  
- Password hashing using **bcrypt**


## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### **Backend**
- Node.js
- Express
- MongoDB / Mongoose
- JWT Authentication
- Bcrypt Encryption
  
---

## ⚙️ Installation

Clone the repository:

🖥 Backend Setup

```bash
git clone <your-repo-url>
cd Cerope-Assignment
cd backend
npm install
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
npm start
```

Backend runs at:
👉 http://localhost:5000

💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
👉 http://localhost:5173


🔗 API Endpoints

Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/signin	Login user
POST	/api/auth/logout	Logout user

Profile Routes
Method	Endpoint	Description
GET	/api/profile/myProfile	Fetch logged-in user
PUT	/api/profile/myProfile	Update user profile

👨‍💻 Author

Aravind RK
MERN Stack Developer intern — Cerope Project (2025)
