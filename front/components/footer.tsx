const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Company Name</h3>
            <p className="text-sm">&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
          </div>
          <div className="space-x-4">
            <a href="#" className="text-sm hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-gray-400">Terms of Service</a>
            <a href="#" className="text-sm hover:text-gray-400">Contact</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  