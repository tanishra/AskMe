# AskMe 🤖

A simple yet powerful AI-powered chatbot that uses OpenAI models to answer questions. Built with **FastAPI** for the backend and **Next.js** for the frontend, this project is modern, responsive, and stylish, with a sleek **dark mode** design.

---

## Features 🛠️

- **AI-Powered Q&A**: Asks any question and get real-time answers using OpenAI models via the EURI API.
- **FastAPI Backend**: A simple and fast backend to process user queries.
- **Next.js Frontend**: A sleek, modern, and responsive UI.
- **Dark Mode**: Default dark mode for a professional and minimalist look.
- **Fully Customizable**: Can be extended with more features like authentication or message history.

---

## Demo 🎥

Check out the live demo:

- [Link](https://your-vercel-link.com)

---

## Technologies Used 🛠️

- **Backend**: FastAPI, EURI API
- **Frontend**: Next.js, React, Tailwind CSS
- **Deployment**: Vercel(Frontend), Render(Backend)

---

## Setup and Installation ⚡

### Prerequisites

- **Python 3.11+** for the backend
- **Next.js 15.5+** for the frontend
- **EURI API Key**

---

## Demo 🎥

Check out the live demo:

- [AI Q&A Bot Demo (Vercel)](https://your-vercel-link.com)

---

## Technologies Used 🛠️

- **Backend**: FastAPI, EURI API (OpenAI)
- **Frontend**: Next.js, React, Tailwind CSS
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend)

---

## Setup and Installation ⚡

### Prerequisites

- **Python 3.9+** for the backend
- **Node.js 14+** for the frontend
- **API Key for EURI API** (You need to sign up for an API key to use OpenAI models through EURI).

### Backend Setup

1. Clone the repository:

```bash
   git clone https://github.com/tanishra/AskMe.git
   cd AskMe/backend
   ```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a .env file in the backend/ folder with your EURI API URL and Key:
```bash
EURI_API_URL=https://your-euri-api-url.com/v1/chat/completions
EURI_API_KEY=your_api_key_here
```

4. Run the FastAPI backend:
```bash
uvicorn backend.server:app --reload
```

Your backend will be live at http://localhost:8000.

--- 

### Frontend Setup (Next.js)
1. Navigate to the frontend directory:
```bash
cd ai-qa-bot/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the frontend locally:
```bash
npm run dev
```

---

## Contributing 🤝
Fork and clone the repo.
- Create a branch for your changes.
- Make your changes, then commit them.
- Push and open a pull request.

Thanks for contributing! 🙌