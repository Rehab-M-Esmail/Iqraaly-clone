import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 indigo-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-xl font-bold">Audioloom</span>
        </Link>
        <div className="space-x-4">
          <Link href="/login">
            <span className="text-white">Login</span>
          </Link>
          <Link href="/signup">
            <span className="text-white">Sign Up</span>
          </Link>
          <Link href="/subscription">
            <span className="text-white">Subscribe</span>
          </Link>
          <Link href="/categories">
            <span className="text-white">Categories</span>
          </Link>
          <Link href="/userprofile">
            <span className="text-white">Profile</span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

