# Testify

**Testify** is a full-stack online testing platform that helps educators create and manage multiple tests.It prevents copy-paste and tab switching during exams and sends results instantly to users via email.
---

## Project Overview

Testify allows administrators to create and manage multiple tests through an admin dashboard. Users can attempt tests in a controlled environment where anti-cheating measures are applied. After completing a test, users immediately receive their score via email and can also view detailed answers for self-evaluation.

---

## Live Demo
Live URL: [Not deployed yet.]


---

## Key Features

### User Features
- Attempt MCQ-based tests
- Full-screen enforced test environment
- Copy-paste prevention during the test
- Tab-switch detection with limited attempts
- Automatic test termination after exceeding allowed violations
- Instant score delivery via email
- View detailed answers after test completion

### Admin Features
- Admin dashboard to manage the platform
- Create and manage multiple tests
- Control test duration and question sets

---

## Anti-Cheating Mechanisms

- Copy and paste actions are completely disabled during the test
- Tab switching is monitored
- Users are allowed **only two violations**
- Test is **automatically terminated** after exceeding the allowed attempts
- Full-screen mode enforced during the test to maintain focus

---

## Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Additional Services
- Email service for instant result delivery
- Authentication & authorization

---

## Test Flow

1. User logs in and starts the test
2. Test opens in full-screen mode
3. Anti-cheating rules are enforced throughout the test
4. User submits the test
5. Score is calculated instantly
6. Result is sent to the user via email
7. User can view detailed answers

---

## How to Run the Project Locally

### Prerequisites
- Node.js
- MongoDB
- Git

### Setup
```bash
cd backend
npm install
npm start

cd frontend
npm install
npm run dev
