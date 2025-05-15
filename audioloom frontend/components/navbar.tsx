"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-950/80 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-orange-700/30 w-screen">
      <div className="flex justify-between items-center px-4">
        <Link href="/">
          <span className="text-orange-700 text-2xl font-bold animate-glow">Audioloom</span>
        </Link>
        <div className="space-x-4">
          {[
            { href: "/subscription", label: "Subscribe" },
            { href: "/chat", label: "Chat" },
            { href: "/admin", label: "Admin" },
            { href: "/userprofile", label: "Profile" },
            { href: "/streams", label: "Streams" }, // New Streams link
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="text-white hover:text-orange-700 hover:bg-gray-200/20 transition-all duration-300 transform hover:scale-105 px-2 py-1 rounded-lg">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(194, 65, 12, 0.9), 0 0 25px rgba(194, 65, 12, 0.7);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;