import Image from "next/image";
import Link from "next/link";

const ReaderCard = ({ reader }: { reader: any }) => {
  return (
    <div className="relative w-56 h-72 bg-gradient-to-br from-blue-950/70 to-orange-700/20 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center shadow-lg border border-orange-700/40 transition-all duration-500 transform hover:scale-105 hover:shadow-orange-700/60 group animate-float">
      <div className="absolute inset-0 rounded-2xl border-2 border-orange-700/50 group-hover:animate-glow pointer-events-none"></div>
      <Image
        src={reader.photo}
        alt={reader.name}
        width={120}
        height={120}
        className="rounded-2xl border-2 border-orange-700/50 group-hover:animate-glow mb-4"
      />
      <h2 className="text-sm font-semibold text-orange-700 ">Reader</h2>
      <Link
        href={`/readerprofile/${reader.id}`}
        className="text-lg font-bold text-white hover:text-orange-700 transition-all duration-300 mt-2"
      >
        {reader.name}
      </Link>
      <p className="text-xs text-gray-200 px-4 text-center mt-2">{reader.bio}</p>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
            border-color: rgba(194, 65, 12, 0.5);
            text-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(194, 65, 12, 0.9);
            border-color: rgba(194, 65, 12, 0.9);
            text-shadow: 0 0 15px rgba(194, 65, 12, 0.9);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ReaderCard;