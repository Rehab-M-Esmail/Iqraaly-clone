import Image from "next/image";
import Link from "next/link";

const ReaderCard = ({ reader }: { reader: any }) => {
  return (
    <div
      className="w-64 h-64 bg-beige rounded-xl flex flex-col items-center justify-center shadow text-center px-4 py-6 mt-10"
      style={{ backgroundColor: "#f5f5dc" }}
    >
      <h2 className="text-md font-semibold text-gray-700 mb-2">Reader</h2>
      <Image
        src={reader.photo}
        alt={reader.name}
        width={70}
        height={70}
        className="rounded-full mb-2"
      />
      <Link
        href={`/readerprofile/${reader.id}`}
        className="text-sm font-bold text-gray-900 hover:underline mb-1"
      >
        {reader.name}
      </Link>
      <p className="text-xs text-gray-600">{reader.bio}</p>
    </div>
  );
};

export default ReaderCard;
