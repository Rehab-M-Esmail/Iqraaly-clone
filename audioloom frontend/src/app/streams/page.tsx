"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../../../components/navbar";

interface ChatMessage {
  username: string;
  message: string;
}

interface Stream {
  id: string;
  title: string;
  audioUrl: string;
  duration: string;
  listeners: number;
  initialMessages: ChatMessage[];
}

const StreamsPage = () => {
  const [streams] = useState<Stream[]>([
    {
      id: "1",
      title: "Cosmic Podcast",
      audioUrl: "/audio/stream.wav",
      duration: "45:32",
      listeners: 120,
      initialMessages: [
        { username: "StarGazer", message: "Great talk!" },
        { username: "LunaLover", message: "Loving the vibe!" },
        { username: "CosmoFan", message: "Amazing energy!" },
      ],
    },
    {
      id: "2",
      title: "Future Talks",
      audioUrl: "/audio/stream.wav.mp3",
      duration: "30:15",
      listeners: 85,
      initialMessages: [
        { username: "TechWizard", message: "Amazing insights!" },
        { username: "FutureThinker", message: "Can't wait for more!" },
        { username: "InnoVator", message: "Mind blown!" },
      ],
    },
  ]);

  const [activeStream, setActiveStream] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: string]: ChatMessage[] }>(
    streams.reduce((acc, stream) => ({
      ...acc,
      [stream.id]: [...stream.initialMessages],
    }), {})
  );
  const [newMessage, setNewMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState<{ [key: string]: number }>(
    streams.reduce((acc, stream) => ({ ...acc, [stream.id]: 0 }), {})
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentUser = "You"; 
  const chatRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio play failed:", err));
    }
  };

  const sendMessage = (e: React.FormEvent, streamId: string) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages((prev) => ({
        ...prev,
        [streamId]: [
          ...(prev[streamId] || []),
          { username: currentUser, message: newMessage },
        ],
      }));
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!activeStream) return;

    const interval = setInterval(() => {
      const currentIndex = messageIndex[activeStream];
      const stream = streams.find((s) => s.id === activeStream);
      if (stream && currentIndex < stream.initialMessages.length) {
        setChatMessages((prev) => ({
          ...prev,
          [activeStream]: [
            ...(prev[activeStream] || []),
            stream.initialMessages[currentIndex],
          ],
        }));
        setMessageIndex((prev) => ({
          ...prev,
          [activeStream]: currentIndex + 1,
        }));
      } else {
        setMessageIndex((prev) => ({
          ...prev,
          [activeStream]: 0, // Reset to cycle messages
        }));
      }
    }, 5000); // Add a new message every 3 seconds

    return () => clearInterval(interval);
  }, [activeStream, messageIndex, streams]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages, activeStream]);

  return (
    <div className="min-h-screen bg-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-orange-700/10 to-blue-950/90 animate-holo-bg"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[900px] h-[900px] bg-orange-700/30 rounded-full -top-96 -left-96 blur-5xl animate-pulse-slow"></div>
        <div className="absolute w-[900px] h-[900px] bg-blue-950/30 rounded-full -bottom-96 -right-96 blur-5xl animate-pulse-slow delay-2000"></div>
      </div>

      <nav className="w-screen">
        <Navbar />
      </nav>
      <div className="relative max-w-7xl mx-auto px-6 py-12 z-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-yellow-500 animate-pulse mb-8">
          Live Streams
        </h1>
        <div className="space-y-6">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-blue-900/50 backdrop-blur-md border border-orange-700/40 rounded-xl p-6 transition-all duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setActiveStream(activeStream === stream.id ? null : stream.id)
                }
              >
                <h2 className="text-xl font-semibold text-orange-500 animate-glow">
                  {stream.title}
                </h2>
                <div className="w-16 h-16 bg-orange-700/20 rounded-full flex items-center justify-center animate-pulse-slow">
                  <span className="text-white text-sm">LIVE</span>
                </div>
              </div>
              {activeStream === stream.id && (
                <div className="mt-6 space-y-6">
                  {/* Audio Player Section */}
                  <div className="bg-blue-900/60 backdrop-blur-lg border border-orange-700/30 rounded-xl p-6 shadow-[0_0_20px_rgba(194,65,12,0.3)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-orange-500 text-lg font-medium animate-glow">
                        LIVE NOW
                      </span>
                      <button
                        onClick={handlePlay}
                        className="bg-gradient-to-r from-orange-700 to-yellow-600 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Join Stream
                      </button>
                    </div>
                    <audio
                      ref={audioRef}
                      controls
                      className="w-full bg-gray-900/50 rounded-lg p-2"
                    >
                      <source src={stream.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Chat Section with Live Animation */}
                  <div className="chat-overlay bg-gray-900/70 backdrop-blur-md border border-orange-700/20 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-orange-400 mb-4 animate-glow">
                      Chat Room
                    </h4>
                    <div
                      ref={chatRef}
                      className="chat-messages h-48 overflow-y-auto mb-4 bg-gray-800/50 rounded p-3 space-y-2"
                    >
                      {chatMessages[stream.id].map((msg, index) => (
                        <div
                          key={index}
                          className="flex items-start animate-slide-in"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-700 to-yellow-600 rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs font-semibold">
                              {msg.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="text-orange-400 text-sm font-medium">
                              {msg.username}
                            </span>
                            <p className="text-white text-sm">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form
                      onSubmit={(e) => sendMessage(e, stream.id)}
                      className="flex gap-3"
                    >
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-3 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-700 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-300"
                      >
                        Send
                      </button>
                    </form>
                  </div>

                  {/* Stream Data Section */}
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-orange-700/20">
                    <h4 className="text-xl font-semibold text-orange-400 mb-4 animate-glow">
                      Stream Insights
                    </h4>
                    <p className="text-white mb-2">
                      <span className="text-gray-400">Duration:</span>{" "}
                      {stream.duration}
                    </p>
                    <p className="text-white">
                      <span className="text-gray-400">Listeners:</span>{" "}
                      {stream.listeners}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes holo-bg {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(194, 65, 12, 0.5); }
          50% { text-shadow: 0 0 15px rgba(194, 65, 12, 0.9), 0 0 25px rgba(194, 65, 12, 0.7); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-holo-bg { background-size: 200% 200%; animation: holo-bg 10s ease infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default StreamsPage;