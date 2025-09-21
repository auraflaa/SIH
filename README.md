# J&K Career Navigator

J&K Career Navigator is a comprehensive, all-in-one web application designed to guide students in Jammu & Kashmir from confusion to clarity on their path to a successful career. The platform integrates an AI-powered counselor, a personality-based quiz, and extensive local data on colleges, exams, and career roadmaps to provide a personalized and supportive experience.

This project is built as a single-page application using vanilla JavaScript, HTML, and Tailwind CSS for the frontend, and it leverages a secure, serverless backend proxy on Vercel to protect the Google Gemini API key.

## ✨ Key Features

* 🤖 **AI-Powered Career Counselor**: An integrated chatbot, powered by the Google Gemini API, that provides instant, helpful advice on colleges, exams, and career paths.

* 🧠 **Interactive "Career Quest" Quiz**: A short, engaging quiz to help students identify their primary inclination (Technical, Creative, Social, or Entrepreneurial).

* 📊 **Personalized Dashboard**: Based on quiz results, the app generates a personalized dashboard with recommended career maps, colleges, and local role models.

* 🎓 **Comprehensive College Database**: A filterable and searchable list of colleges across Jammu & Kashmir. Users can:

  * Filter by location.

  * Find colleges nearby using geolocation.

  * View detailed information on each college.

  * Select and compare multiple colleges side-by-side.

* 🗺️ **Visual Career Maps**: Step-by-step roadmaps for various popular careers, including required degrees, skills, recommended courses, and scholarship opportunities.

* 🔔 **Entrance Exam Hub**: A dedicated section with key details, official links, and live countdowns for major entrance exams like NEET, JEE, CUET, and JKCET.

* 📅 **My Application Timeline**: A personal dashboard where users can add colleges to a timeline, track application deadlines, and update their application status (from "Not Started" to "Accepted").

* 🎉 **Celebratory Animations**: A confetti animation plays to celebrate when a user marks an application as "Accepted."

## 🛠️ Tech Stack

### Frontend:

* HTML5

* Tailwind CSS

* Vanilla JavaScript (ES6+)

### Backend (Proxy):

* Vercel Serverless Function (Node.js)

### Services & Hosting:

* **Google Gemini API**: For the AI chatbot functionality.

* **GitHub Pages**: For hosting the static frontend (`index.html`).

* **Vercel**: For hosting the secure backend API proxy.

## 🔒 Secure Architecture

To protect the `GEMINI_API_KEY`, this project uses a secure proxy pattern. The API key is never exposed on the frontend.

* **Frontend (GitHub Pages)**: The `index.html` file contains no API keys. When a user sends a chat message, the frontend makes a `fetch` request to our own secure backend deployed on Vercel.

* **Backend Proxy (Vercel)**: The serverless function at `api/chat.js` receives the request. It safely retrieves the `GEMINI_API_KEY` from Vercel's private environment variables.

* **Forwarding**: The Vercel function then adds the secret key to the request and forwards it to the official Google Gemini API.

* **Response**: The response from Google is sent back through the Vercel function to the user's browser.

This ensures the API key remains secret and secure on the server, completely inaccessible to the public.

## 🚀 Getting Started

To set up and run this project, you need to deploy the frontend and backend to their respective platforms.

### Prerequisites

* A GitHub account.

* A Vercel account (can be created with your GitHub account).

* A Google Gemini API Key from Google AI Studio.

### Project Structure

For simplicity, both the frontend and backend can live in the same GitHub repository:

```text
├── index.html        <-- Your frontend
└── api/
    └── chat.js       <-- Your backend proxy
```
 
### 1. Backend Proxy Setup (Vercel)

1. **Create a GitHub Repository**: Create a new repository and push the `index.html` file and the `api/chat.js` folder to it.

2. **Deploy to Vercel**:

   * Log in to your Vercel account.

   * Click "Add New..." -> "Project".

   * Import the GitHub repository you just created.

   * Vercel will automatically detect the serverless function in the `/api` directory. No configuration is needed.

   * Click **Deploy**.

3. **Set Environment Variable**:

   * After deployment, go to your project's dashboard on Vercel.

   * Navigate to **Settings -> Environment Variables**.

   * Add a new variable:

     * **Name**: `GEMINI_API_KEY`

     * **Value**: Paste your secret Google Gemini API key here.

   * Save the variable. Vercel will automatically trigger a new deployment.

4. **Get Your Vercel URL**:

   * From the project's dashboard, copy the public URL provided under "Domains" (e.g., `https://your-project-name.vercel.app`).

### 2. Frontend Setup

1. **Update API Endpoint**:

   * Open your local `index.html` file.

   * Find the `getGeminiResponse` function and update the `apiUrl` variable with your Vercel URL:

     ```
     async function getGeminiResponse(prompt) {
         const apiUrl = `https://your-project-name.vercel.app/api/chat`;
         // ...
     }
     
     ```

2. **Commit and Push**: Save the change and push it to your GitHub repository.

3. **Enable GitHub Pages**:

   * In your GitHub repository, go to **Settings -> Pages**.

   * Under "Branch," select your main branch (e.g., `main`) and `/root` folder.

   * Click **Save**. Your website will be live in a few minutes.

Your J&K Career Navigator is now fully deployed and secure!
