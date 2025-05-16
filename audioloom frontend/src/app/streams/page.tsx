"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../../../components/navbar";
import { io, Socket } from "socket.io-client";
import Link from "next/link";
import Peer from "simple-peer";

interface ChatMessage {
  username: string;
  message: string;
}

interface Stream {
  id: string;
  title: string;
  duration: string;
  listeners: number;
  initialMessages: ChatMessage[];
}

const SIGNALING_SERVER_URL = "http://localhost:3001";

const StreamsPage = () => {
  const [streams] = useState<Stream[]>([
    { id: "1", title: "Cosmic Podcast", duration: "45:32", listeners: 120, initialMessages: [{ username: "StarGazer", message: "Great talk!" }, { username: "LunaLover", message: "Loving the vibe!" }, { username: "CosmoFan", message: "Amazing energy!" }] },
    { id: "2", title: "Future Talks", duration: "30:15", listeners: 85, initialMessages: [{ username: "TechWizard", message: "Amazing insights!" }, { username: "FutureThinker", message: "Can't wait for more!" }, { username: "InnoVator", message: "Mind blown!" }] },
  ]);

  const [activeStream, setActiveStream] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: string]: ChatMessage[] }>(
    streams.reduce((acc, stream) => ({ ...acc, [stream.id]: [...stream.initialMessages] }), {})
  );
  const [newMessage, setNewMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState<{ [key: string]: number }>(
    streams.reduce((acc, stream) => ({ ...acc, [stream.id]: 0 }), {})
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionRef = useRef<Peer.Instance | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const currentUser = "You";
  const chatRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  const streamerIdRef = useRef<string | null>(null);
  const signalingCompletedRef = useRef(false);

  const handleJoinStream = (streamId: string) => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.destroy();
      peerConnectionRef.current = null;
    }
    streamerIdRef.current = null;
    signalingCompletedRef.current = false;

    const socket = io(SIGNALING_SERVER_URL);
    socketRef.current = socket;

    socket.emit("room:join", streamId);

    socket.on("room:streamer-connected", (streamerId: string) => {
      console.log(`Connected to streamer ${streamerId} at ${new Date().toISOString()}`);
      streamerIdRef.current = streamerId;

      if (!peerConnectionRef.current) {
        const peer = new Peer({ initiator: false, trickle: false });
        peerConnectionRef.current = peer;

        peer.on("signal", (data) => {
          console.log(`Listener sending signal to ${streamerId} at ${new Date().toISOString()}, state: ${(peer as any)._pc?.signalingState || "unknown"}`);
          if (socketRef.current && streamerIdRef.current && isMountedRef.current && !signalingCompletedRef.current) {
            socketRef.current.emit("peer:signal", streamerIdRef.current, data);
          }
        });

        peer.on("stream", (stream) => {
          console.log("Listener received stream at:", new Date().toISOString());
          if (audioRef.current && (!audioRef.current.srcObject || audioRef.current.paused)) {
            audioRef.current.srcObject = stream;
            audioRef.current
              .play()
              .then(() => console.log("Audio playback started at:", new Date().toISOString()))
              .catch((err) => console.error("Audio playback error:", err));
          }
        });

        peer.on("connect", () => {
          console.log("Listener connected to streamer at:", new Date().toISOString());
          signalingCompletedRef.current = true;
        });

        peer.on("error", (err) => console.error("Peer error:", err));
      }
    });

    socket.on("peer:signal", (_: string, data: any) => {
      console.log(`Listener received signal at ${new Date().toISOString()}, peer state: ${peerConnectionRef.current?.destroyed ? "destroyed" : "active"}`);
      if (peerConnectionRef.current && !peerConnectionRef.current.destroyed && !signalingCompletedRef.current) {
        peerConnectionRef.current.signal(data);
      } else {
        console.warn("Ignoring signal: peer is destroyed, null, or signaling completed");
      }
    });

    socket.on("connect_error", (err) => console.error("Socket.IO connection error:", err));
    socket.on("disconnect", () => {
      console.log("Socket disconnected on listener at:", new Date().toISOString());
      peerConnectionRef.current?.destroy();
      peerConnectionRef.current = null;
      socketRef.current = null;
      streamerIdRef.current = null;
      signalingCompletedRef.current = false;
    });
  };

  const sendMessage = (e: React.FormEvent, streamId: string) => {
    e.preventDefault();
    if (newMessage.trim() && socketRef.current) {
      setChatMessages((prev) => ({
        ...prev,
        [streamId]: [...(prev[streamId] || []), { username: currentUser, message: newMessage }],
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
          [activeStream]: [...(prev[activeStream] || []), stream.initialMessages[currentIndex]],
        }));
        setMessageIndex((prev) => ({ ...prev, [activeStream]: currentIndex + 1 }));
      } else {
        setMessageIndex((prev) => ({ ...prev, [activeStream]: 0 }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeStream, messageIndex, streams]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages, activeStream]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      peerConnectionRef.current?.destroy();
      socketRef.current?.disconnect();
      peerConnectionRef.current = null;
      socketRef.current = null;
      streamerIdRef.current = null;
      signalingCompletedRef.current = false;
    };
  }, []);

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
        <div className="mb-4">
          <Link href="/streamer/1">
            <span className="text-orange-500 hover:underline cursor-pointer">Start Streaming (Stream ID: 1)</span>
          </Link>
        </div>
        <div className="space-y-6">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-blue-900/50 backdrop-blur-md border border-orange-700/40 rounded-xl p-6 transition-all duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => {
                  setActiveStream(activeStream === stream.id ? null : stream.id);
                  if (activeStream !== stream.id) handleJoinStream(stream.id);
                }}
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
                  <div className="bg-blue-900/60 backdrop-blur-lg border border-orange-700/30 rounded-xl p-6 shadow-[0_0_20px_rgba(194,65,12,0.3)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-orange-500 text-lg font-medium animate-glow">
                        LIVE NOW
                      </span>
                    </div>
                    <audio ref={audioRef} controls autoPlay className="w-full bg-gray-900/50 rounded-lg p-2">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div className="chat-overlay bg-gray-900/70 backdrop-blur-md border border-orange-700/20 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-orange-400 mb-4 animate-glow">
                      Chat Room
                    </h4>
                    <div ref={chatRef} className="chat-messages h-48 overflow-y-auto mb-4 bg-gray-800/50 rounded p-3 space-y-2">
                      {chatMessages[stream.id].map((msg, index) => (
                        <div key={index} className="flex items-start animate-slide-in" style={{ animationDelay: `${index * 0.2}s` }}>
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-700 to-yellow-600 rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs font-semibold">{msg.username.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <span className="text-orange-400 text-sm font-medium">{msg.username}</span>
                            <p className="text-white text-sm">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={(e) => sendMessage(e, stream.id)} className="flex gap-3">
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
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-orange-700/20">
                    <h4 className="text-xl font-semibold text-orange-400 mb-4 animate-glow">
                      Stream Insights
                    </h4>
                    <p className="text-white mb-2"><span className="text-gray-400">Duration:</span> {stream.duration}</p>
                    <p className="text-white"><span className="text-gray-400">Listeners:</span> {stream.listeners}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes holo-bg { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.1); opacity: 0.6; } }
        @keyframes glow { 0%, 100% { text-shadow: 0 0 5px rgba(194, 65, 12, 0.5); } 50% { text-shadow: 0 0 15px rgba(194, 65, 12, 0.9), 0 0 25px rgba(194, 65, 12, 0.7); } }
        @keyframes slide-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-holo-bg { background-size: 200% 200%; animation: holo-bg 10s ease infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default StreamsPage;