# StudyHub — Online Learning Platform

![Live Demo](https://img.shields.io/badge/Live-studyhubedu.online-1D9E75?style=flat)
![Stack](https://img.shields.io/badge/Stack-MERN-378ADD?style=flat)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat)

A full-stack LMS (Learning Management System) where students can 
browse courses, enroll, watch lectures, and instructors can create 
and manage their content.

## Live demo
https://www.studyhubedu.online

## Features
- JWT-based authentication (login / register / protected routes)
- Course creation & management for instructors
- Razorpay payment integration for paid courses
- Video lectures with progress tracking
- Student dashboard with enrolled courses
- Responsive UI built with Tailwind CSS

## Tech stack
| Layer     | Tech                            |
|-----------|----------------------------    -|
| Frontend  | React, Vite, Tailwind CSS 
| Data Fetching | TanStack Query (React Query)|
| Backend   | Node.js, Express.js             |
| Database  | MongoDB, Mongoose               |
| Auth      | JWT, bcrypt                     |
| Payments  | Razorpay                        |
| Media     | Cloudinary                      |
| Hosting   | Vercel (FE), Render (BE)        |

## Getting started

### 1. Clone the repos
git clone https://github.com/abdalqamar/studyhub-frontend
git clone https://github.com/abdalqamar/studyhub-backend

### 2. Backend setup
cd studyhub-backend
npm install
cp .env.example .env   # fill in your keys
npm run dev

### 3. Frontend setup
cd studyhub-frontend
npm install
npm run dev

## Environment variables (backend)
MONGO_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

## Screenshots


## Contact
Abdal Qamar — [LinkedIn](https://www.linkedin.com/in/abdalqamar/) | [GitHub](https://github.com/abdalqamar)
