# AudioLoom

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-green)](https://expressjs.com/)

AudioLoom is a full-stack web application for streaming audiobooks and podcasts, inspired by iqraaly.com. It features a modern Next.js frontend, a robust Express.js API, and a suite of AI-powered features for a personalized listening experience.

## 🎧 Features

### Essential Features
- **👤 User Account Management**: Secure sign up, login, and profile management.
- **📚 Content Management System (CMS)**: Admin dashboard to add, edit, and manage audiobooks, podcasts, and categories.
- **🎵 Audiobook & Music Library**: Browse a vast catalog of audio content.
- **🎙️ Podcast Streaming**: Stream podcast episodes in real-time.
- **⏯️ Advanced Playback Controls**: Play, pause, skip, adjust speed, set bookmarks, and resume from last listened position.
- **📱 Offline Mode**: Download content for offline listening.
- **⭐ Reviews & Ratings**: Rate and review content to share your opinion with the community.

### Bonus AI Features
- **🤖 Personalized Recommendations**: AI-driven suggestions based on your listening history, sentiment, and topic analysis.
- **🧠 AI-Powered Summaries & Transcriptions**: Get auto-generated summaries and transcripts for audiobooks and podcasts.
- **💬 AI Chatbot Assistant**: Get help and content recommendations through an intelligent chatbot.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **File Storage**: AWS S3 (or Firebase Storage for uploads)
- **AI Services**: GoogleGenAI API (or Hugging Face) for summaries, recommendations, and chatbot


## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+
- PostgreSQL database
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Rehab-M-Esmail/Iqraaly-clone.git
    ```

2.  **Install dependencies**
    ```bash
    # Install frontend dependencies
    cd audioloom frontend
    npm install
    # Install backend dependencies
    cd backend/src && npm install
    ```

3.  **Set up environment variables**
    ```bash
    cp .env.example .env
    # Edit .env with your actual values
    ```


4.  **Run the development servers**
    ```bash
    # Terminal 1: Frontend (port 3000)
    npm run dev
    # Terminal 2: Backend (port 3001)
    npm run server:dev
    ```

5.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Scripts

- `npm run dev`: Start Next.js dev server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run server:dev`: Start Express dev server
- `npm run server:start`: Start Express production server
- `npm run db:studio`: Open Prisma Studio

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [iqraaly.com](https://www.iqraaly.com/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
