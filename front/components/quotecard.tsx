const AnotherQuoteCard = () => {
    return (
      <div className="flex items-center justify-between p-8 bg-gray-200 text-black rounded-lg my-12">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">"Escape into Stories"</h3>
          <p className="mb-4">Immerse yourself in captivating tales and adventures.</p>
        </div>
        <div className="flex-1">
          <img
            src="/images/audi8.png"
            alt="Audiobook"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    );
  };
  
  export default AnotherQuoteCard;
  