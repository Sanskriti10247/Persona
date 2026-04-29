# Personafy 🎀 — Persona-Based AI Chatbot

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-lightgrey?style=for-the-badge&logo=express)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-LLM-blue?style=for-the-badge&logo=google)

Personafy is a highly interactive, persona-driven AI chatbot built for the **Scaler Academy Prompt Engineering Assignment**. The application lets users have authentic, real-time conversations with three distinct Scaler/InterviewBit personalities: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**. 

Rather than generic AI responses, the backend utilizes heavily engineered system prompts featuring few-shot examples, Chain-of-Thought (CoT) reasoning, and strict behavioral constraints to ensure each response truly embodies the specific educator's philosophy and tone.

## ✨ Key Features

- **Triple-Persona Architecture**: Custom, distinct LLM system prompts for three different personalities.
- **Dynamic Context Switching**: Seamlessly switch between personas. The frontend maintains separate local histories for each persona, allowing users to juggle multiple conversations without crossing context streams.
- **Neo-Brutalist UI**: A bespoke, highly responsive frontend built with React 19 / Next.js. Features crisp solid colors, sharp drop shadows, smooth `slideInUp` animations, and a polished pink/blush aesthetic.
- **Real-Time Markdown Rendering**: Full support for rendering LLM-generated markdown (lists, bolding, italics) directly in the chat stream via `react-markdown`.
- **Advanced Prompt Engineering**: Avoids the "Garbage In, Garbage Out" (GIGO) trap by feeding the Gemini model rich context, core beliefs, and constraint guidelines.

## 🚀 Live Deployment
**Live App URL:** [[Insert Live URL Here](https://persona-three-psi.vercel.app/)] 

---

## 📚 The Personas

1. **Anshuman Singh**  
   *The Executioner.* Direct, practical, and slightly confrontational. Focuses heavily on discipline over motivation. His prompt restricts fluff and forces short, sharp, action-oriented responses.
2. **Abhimanyu Saxena**  
   *The Architect.* Calm, structured, and analytical. He breaks down massive problems into digestible, step-by-step roadmaps. His prompt prioritizes structural formatting and deep fundamentals.
3. **Kshitij Mishra**  
   *The Simplifier.* Friendly and relatable. He bridges the gap between complex DSA topics and the student's current understanding by heavily relying on real-world analogies.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Vanilla CSS (Custom Design System), `react-markdown`
- **Backend:** Node.js, Express.js, Google Generative AI SDK (`@google/generative-ai`)
- **Storage:** LocalStorage (for client-side thread management)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- A valid **Google Gemini API Key**

### 1. Backend Setup
The backend handles the prompt injection and communication with the Gemini LLM.
```bash
cd backend
npm install
cp .env.example .env
```
Open the newly created `.env` file and insert your API key:
`GEMINI_API_KEY="your_api_key_here"`

Start the backend server:
```bash
npm run dev
```
*The server will run on http://localhost:5000*

### 2. Frontend Setup
The frontend provides the Neo-Brutalist UI and manages the chat threads.
Open a **new terminal window**:
```bash
cd client
npm install
npm run dev
```
*The Next.js application will run on http://localhost:3000*

---

## 📂 Documentation Directory
- **[`prompts.md`](./prompts.md)**: A deep dive into the Prompt Engineering methodology, explaining the *why* behind every line of the system prompts.
- **[`reflection.md`](./reflection.md)**: A retrospective on the assignment, highlighting the impact of few-shot prompting and lessons learned regarding the GIGO principle.
