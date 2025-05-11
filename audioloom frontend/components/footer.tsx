"use client";

import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950/80 backdrop-blur-md text-white py-8 border-t border-orange-700/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-orange-700 ">Audioloom</h3>
          <p className="text-sm text-gray-200">© {new Date().getFullYear()} Audioloom. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          {[
            { href: "#", label: "Privacy Policy" },
            { href: "#", label: "Terms of Service" },
            { href: "#", label: "Contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white hover:text-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-200 hover:text-orange-700 transition-all duration-300 transform hover:scale-110">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-200 hover:text-orange-700 transition-all duration-300 transform hover:scale-110">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-200 hover:text-orange-700 transition-all duration-300 transform hover:scale-110">
            <FaFacebook size={20} />
          </a>
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
    </footer>
  );
};

export default Footer;