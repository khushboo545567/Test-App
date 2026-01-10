# 📝 Testify

**Testify** is a robust, full-stack online examination platform designed to conduct secure, scalable, and seamless tests. It features strict anti-cheating mechanisms and an asynchronous architecture using background job queues to ensure high performance during peak loads.

---

## 🚀 Project Overview

Testify bridges the gap between educators and students by providing a controlled environment for online assessments. Administrators can easily manage test sets, while students take exams in a locked-down interface.

To ensure the system remains responsive even when hundreds of users submit tests simultaneously, Testify leverages **Redis** and **Bull Queue** to handle result calculation and email delivery in the background.

### 🌟 Key Features

#### 🛡️ For Students (Secure Environment)
* **Full-Screen Enforcement:** The test interface forces full-screen mode to minimize distractions.
* **Anti-Cheating System:**
    * **Copy-Paste Disabled:** Clipboard actions are blocked.
    * **Tab-Switch Detection:** The system monitors focus. Switching tabs triggers a warning.
    * **Auto-Termination:** Exceeding the maximum allowed violations (2 attempts) automatically submits and terminates the test.
* **Instant Feedback:** Scores are emailed immediately upon completion.
* **Detailed Analysis:** Users can view correct answers and explanations after the test.

#### 👨‍💻 For Administrators
* **Dashboard:** specialized admin panel for platform management.
* **Test Management:** Create, edit, and delete MCQ-based tests.
* **Configuration:** Control test duration, passing criteria, and question sets.

---

## 🏗️ Architecture & Performance

Testify is built for scale. Instead of making the user wait for the server to calculate scores and send emails, we use an **Event-Driven Architecture**.

### Why a Job Queue?
Processing a test submission involves:
1.  Fetching answers from the database.
2.  Comparing user inputs vs. correct answers.
3.  Calculating the score.
4.  Updating the user's history in MongoDB.
5.  Sending an email notification.

Doing this synchronously would slow down the API. By offloading these tasks to a **Background Worker**, the API responds instantly, and the heavy lifting happens asynchronously.

### The Flow
1.  **Submission:** User clicks submit → API acknowledges immediately.
2.  **Queue:** The job is pushed to **Redis**.
3.  **Worker:** A dedicated worker process (Bull) picks up the job.
4.  **Processing:** The worker calculates the result and updates MongoDB.
5.  **Notification:** The worker triggers the email service.
6.  **Reliability:** Failed jobs are automatically retried up to 3 times.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Message Broker** | Redis (Memurai for Windows dev) |
| **Queue Management** | Bull |
| **Email Service** | Nodemailer / SMTP |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas)
* [Git](https://git-scm.com/)
* **Redis:**
    * *Mac/Linux:* Install standard Redis.
    * *Windows:* Install [Memurai](https://www.memurai.com/) (Developer edition).

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/testify.git](https://github.com/your-username/testify.git)
cd testify
