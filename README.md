# SecureAuth — Frontend

This is the React frontend for SecureAuth, a full stack authentication project I built to practice real-world auth flows and secure frontend patterns.

The frontend handles user registration, login, session persistence, and a protected dashboard — all connected to the Node.js backend via a REST API.

---

## What it does

- Register and login with form validation
- JWT token stored and managed via localStorage
- Axios interceptors automatically attach the token to every request
- Auto-logout when the token expires or is invalid (401 response)
- Protected routes using a custom PrivateRoute component
- Auth state managed globally with React Context API
- Dashboard shows user info, login history, security tips, and the live JWT token

---

## Tech Stack

- React 18
- React Router v6
- Axios
- React Context API

---

## Getting Started

Make sure the backend is running first on http://localhost:5000

npm install
npm start

App runs on http://localhost:3000

---

## How auth works

1. User registers or logs in
2. Backend returns a JWT token
3. Token is saved in localStorage
4. Every API request automatically includes the token in the Authorization header
5. If the token expires, the user is redirected to login automatically
6. On page refresh, the app checks the token and restores the session

---

## Notes

- The proxy in package.json forwards /api requests to localhost:5000
- In production, JWT should be stored in httpOnly cookies for better XSS protection. This project uses localStorage for demo purposes and shows a warning on the dashboard.
- Backend repo: https://github.com/aakashtiwarisolutions/secureauth-backend

---

## What I want to add next

- Move to httpOnly cookies
- Add 2FA support
- Write unit tests with Jest and React Testing Library
- Add loading skeletons and better error states
- Deploy to AWS S3 + CloudFront

---

## Author

Aakash Tiwari
MS Cybersecurity, Rowan University
tiwariaakash1001@gmail.com
GitHub: https://github.com/aakashtiwarisolutions
LinkedIn: https://www.linkedin.com/in/aakash-tiwari-46b6b916b