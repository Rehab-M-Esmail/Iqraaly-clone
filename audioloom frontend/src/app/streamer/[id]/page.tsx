"use client";

import { useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter, useParams } from "next/navigation";
import Peer from "simple-peer";

const SIGNALING_SERVER_URL = "http://localhost:3001";

const StreamerPage = () => {
  const peerConnectionRef = useRef<{ [listenerId: string]: Peer.Instance }>({});
  const socketRef = useRef<Socket | null>(null);
  const audioInputRef = useRef<MediaStream | null>(null);
  const isMountedRef = useRef(true);
  const router = useRouter();
  const { id } = useParams();
  const signalingCompletedRef = useRef<{ [listenerId: string]: boolean }>({});

  useEffect(() => {
    isMountedRef.current = true;

    if (!id || typeof id !== "string") {
      console.log("Invalid stream ID:", id);
      return;
    }

    socketRef.current = io(SIGNALING_SERVER_URL);
    socketRef.current.emit("room:join", id);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        if (!isMountedRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        audioInputRef.current = stream;

        if (socketRef.current) {
          socketRef.current.on("room:listener-joined", (listenerId: string) => {
            console.log(`Listener ${listenerId} joined stream ${id} at ${new Date().toISOString()}`);
            if (!peerConnectionRef.current[listenerId] || peerConnectionRef.current[listenerId].destroyed) {
              const peer = new Peer({
                initiator: true,
                stream: stream,
                trickle: false,
              });

              peer.on("signal", (data) => {
                console.log(`Streamer sending signal to ${listenerId} at ${new Date().toISOString()}`);
                if (socketRef.current && isMountedRef.current) {
                  socketRef.current.emit("peer:signal", listenerId, data);
                }
              });

              peer.on("connect", () => {
                console.log(`Streamer connected to listener ${listenerId} at ${new Date().toISOString()}`);
                signalingCompletedRef.current[listenerId] = true;
              });

              peer.on("error", (err) => console.error("Peer error on streamer:", err));

              peerConnectionRef.current[listenerId] = peer;
              signalingCompletedRef.current[listenerId] = false;
            }
          });

          socketRef.current.on("peer:signal", (originId: string, data: any) => {
            console.log(`Streamer received signal from ${originId} at ${new Date().toISOString()}`);
            const peer = peerConnectionRef.current[originId];
            if (
              peer &&
              !peer.destroyed &&
              !signalingCompletedRef.current[originId]
            ) {
              // Type assertion for internal _pc property (non-public API)
              const signalingState = (peer as any)._pc?.signalingState;
              if (signalingState === "have-local-offer") {
                peer.signal(data);
              } else {
                console.warn(
                  `Ignoring signal from ${originId}: invalid state: ${signalingState || "unknown"}`
                );
              }
            } else {
              console.warn(
                `Ignoring signal from ${originId}:`,
                peer?.destroyed ? "peer is destroyed" :
                signalingCompletedRef.current[originId] ? "signaling already completed" :
                "peer is null"
              );
            }
          });
        }
      })
      .catch((err) => console.error("Microphone access error:", err));

    return () => {
      isMountedRef.current = false;
      audioInputRef.current?.getTracks().forEach((track) => track.stop());
      socketRef.current?.disconnect();
      Object.values(peerConnectionRef.current).forEach((peer) => peer.destroy());
      socketRef.current = null;
      peerConnectionRef.current = {};
      signalingCompletedRef.current = {};
    };
  }, [id]);

  const stopStream = () => {
    audioInputRef.current?.getTracks().forEach((track) => track.stop());
    socketRef.current?.disconnect();
    Object.values(peerConnectionRef.current).forEach((peer) => peer.destroy());
    socketRef.current = null;
    peerConnectionRef.current = {};
    signalingCompletedRef.current = {};
    router.push("/streams");
  };

  if (!id || typeof id !== "string") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-orange-700/10 to-blue-950/90 animate-holo-bg"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[900px] h-[900px] bg-orange-700/30 rounded-full -top-96 -left-96 blur-5xl animate-pulse-slow"></div>
        <div className="absolute w-[900px] h-[900px] bg-blue-950/30 rounded-full -bottom-96 -right-96 blur-5xl animate-pulse-slow delay-2000"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-12 z-10 text-white">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-yellow-500 animate-pulse mb-8">
          Streaming: {id}
        </h1>
        <button
          onClick={stopStream}
          className="bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-3 rounded-full hover:from-red-600 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Stop Stream
        </button>
      </div>
      <style jsx>{`
        @keyframes holo-bg { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.1); opacity: 0.6; } }
        @keyframes glow { 0%, 100% { text-shadow: 0 0 5px rgba(194, 65, 12, 0.5); } 50% { text-shadow: 0 0 15px rgba(194, 65, 12, 0.9), 0 0 25px rgba(194, 65, 12, 0.7); } }
        .animate-holo-bg { background-size: 200% 200%; animation: holo-bg 10s ease infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default StreamerPage;