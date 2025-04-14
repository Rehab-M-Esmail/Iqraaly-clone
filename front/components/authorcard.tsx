import Image from "next/image";
import Link from "next/link";

const AuthorCard = ({ author }: { author: any }) => {
  return (
    <div
      className="w-64 h-64 bg-beige rounded-xl flex flex-col items-center justify-center shadow text-center px-4 py-6 mr-24 mt-10"
      style={{ backgroundColor: "#f5f5dc" }}
    >
      <h2 className="text-md font-semibold text-gray-700 mb-2">Author</h2>
      <Image
        src={author.photo}
        alt={author.name}
        width={70}
        height={70}
        className="rounded-full mb-2"
      />
      <Link
        href={`/authorprofile/${author.id}`}
        className="text-sm font-bold text-gray-900 hover:underline mb-1"
      >
        {author.name}
      </Link>
      <p className="text-xs text-gray-600">{author.bio}</p>
    </div>
  );
};

export default AuthorCard;
