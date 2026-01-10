# Testify

Testify is a full-stack online testing platform that helps educators create and manage multiple tests. It prevents copy-paste and tab switching during exams and sends results instantly to users via email.

---

## Project Overview

Testify allows administrators to create and manage multiple tests through an admin dashboard. Users can attempt tests in a controlled environment where anti-cheating measures are applied. After completing a test, users immediately receive their score via email and can also view detailed answers for self-evaluation.

---

## Live Demo

Live URL: Not deployed yet.

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
- Users are allowed only two violations
- Test is automatically terminated after exceeding the allowed attempts
- Full-screen mode is enforced during the test to maintain focus

---

## Background Job Queue Implementation

To ensure fast API responses and better scalability, Testify uses a background job queue for result calculation and email notifications.

### Why Job Queue?
- Test submission response is sent instantly to the user
- Heavy tasks like result calculation and email sending run in the background
- Improves application performance and user experience
- Supports automatic retry on failures

### Job Queue Architecture
- Redis (Memurai) is used as the message broker
- Bull is used for job queue management
- A separate worker process handles background jobs independently

### Redis Setup (Windows)
- Memurai is used as Redis for Windows
- Memurai runs as a background service
- Redis connection is established using Memurai’s default port

### Queue Responsibilities
The job queue handles the following tasks:

- Fetching submitted answers
- Calculating test scores
- Updating results in MongoDB
- Sending result emails to users

### Worker Process
- Worker runs separately from the main Express server
- Worker has its own MongoDB connection
- Worker listens to the Redis queue and processes jobs
- Failed jobs are retried automatically

### Job Retry Strategy
- Each job has a retry limit of 3 attempts
- Retry delay is applied in case of temporary failures
- Ensures reliable email delivery and result processing

---

## Test Flow

1. User logs in and starts the test

2. Test opens in full-screen mode

3. Anti-cheating rules are enforced throughout the test

4. User submits the test

5. Submission is saved immediately

6. Job is added to the Redis queue

7. Worker calculates the result in the background

8. Result is emailed to the user

9. User can view detailed answers after completion


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
- Redis (Memurai)
- Bull Queue
- Email service
- Authentication and Authorization


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
