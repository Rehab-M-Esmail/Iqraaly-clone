"use client";

import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaRobot, FaPhoneAlt, FaVideo } from 'react-icons/fa';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Greetings! Ready to explore audiobooks?', sender: 'bot' },
  ]);
  const [prompt, setprompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  async function sendData() {
    console.log("Sending Data to chatbot......");
    try {
      const response = await fetch("http://localhost:3003/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt }),
      });
      if(response)
      {
        const responseData = await response.json(); // Or response.json() if your API returns JSON
        let messageText = '';
        if (typeof responseData === 'string') {
          messageText = responseData; // If it's already a string, use it directly.
        } else if (responseData && responseData.response) {
          messageText = responseData.response; //  *responseData is an object, and you want the "response" property.*
        }
         else if (responseData && responseData.text) {
          messageText = responseData.text; //  *responseData is an object, and you want the "text" property.*
        }
        else {
          console.warn("Unexpected response structure:", responseData);
          messageText = "Sorry, I couldn't understand the response."; // Provide a default message
        }
        console.log("answer is",responseData);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: responseData.response,
            sender: 'bot',
          },
        ]);
      }
    }
    catch(error)
    {
      console.log(`Error sending message to chatbot ${error}`);
    }
  }
  const handleSendMessage = () => {
    if (prompt.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: prompt, sender: 'user' },
      ]);
      setprompt('');
      // setTimeout(() => {
      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       id: prev.length + 1,
      //       text: 'Try "Dune" by Frank Herbert or "The Name of the Wind"!',
      //       sender: 'bot',
      //     },
      //   ]);
      // }, 1000);
      sendData();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendData();
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center relative overflow-hidden">
      {/* Holographic Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-blue-950 to-orange-700 animate-gradient-bg"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80vw] h-[20vh] bg-orange-700/20 blur-3xl rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60vw] h-[30vh] bg-blue-950/20 blur-2xl rounded-full animate-pulse-slow delay-2000"></div>
      </div>

      {/* Chat Box Container */}
      <div className="w-full max-w-4xl h-[90vh] bg-gray-950/60 rounded-2xl shadow-2xl flex flex-col border border-orange-700/20 backdrop-blur-md overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-orange-700/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaRobot className="text-orange-700 text-2xl animate-glow" />
            <h1 className="text-xl font-bold text-white animate-slide-in">Audioloom AI</h1>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto px-4 py-2 space-y-3 scrollbar-thin scrollbar-thumb-orange-700/50 scrollbar-track-transparent">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'bot' ? 'justify-start' : 'justify-end'
              } animate-message-pop`}
            >
              <div
                className={`relative max-w-[70%] px-5 py-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 group ${
                  message.sender === 'bot'
                    ? 'bg-gray-50/70 text-orange-700 border border-orange-700/40'
                    : 'bg-gradient-to-r from-orange-700 to-orange-600 text-white'
                }`}
              >
                <span className="z-10 relative">{message.text}</span>
                <div
                  className={`absolute w-3 h-3 transform rotate-45 -z-10 ${
                    message.sender === 'bot'
                      ? 'bg-blue-950/70 -left-1.5 top-1/2 -translate-y-1/2 border-l border-t border-orange-700/40'
                      : 'bg-orange-700 -right-1.5 top-1/2 -translate-y-1/2'
                  }`}
                ></div>
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br from-orange-700/20 to-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-orange-700/30">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setprompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-5 py-3 bg-gray-950/50 border border-orange-700/40 text-orange-700 placeholder-orange-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-700 focus:border-transparent transition-all duration-300"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-orange-700 to-orange-600 text-white p-3 rounded-full hover:from-orange-800 hover:to-orange-700 focus:ring-4 focus:ring-orange-700/50 transition-all duration-300 transform hover:scale-110"
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes holo-bg {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        @keyframes message-pop {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(194, 65, 12, 0.9), 0 0 25px rgba(194, 65, 12, 0.7);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        .animate-holo-bg {
          background-size: 200% 200%;
          animation: holo-bg 10s ease infinite;
        }
        .animate-message-pop {
          animation: message-pop 0.5s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-orange-700\/50 {
          scrollbar-color: rgba(194, 65, 12, 0.5) transparent;
        }
        .scrollbar-track-transparent {
          scrollbar-track-color: transparent;
        }
          .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;