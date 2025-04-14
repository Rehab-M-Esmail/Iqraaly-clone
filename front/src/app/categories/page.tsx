import { allBooks } from "@/app/data/books";
import Footer from "../../../components/footer";
import SearchBar from "../../../components/searchbar"; 
import CategoryTagCard from "../../../components/categorytagcard"; 
import AnotherQuoteCard from "../../../components/quotecard";
import LinkedBooksSection from "../../../components/linkedaudiocardsection";

export default function CategoriesPage() {
  const fictionBooks = allBooks.filter((book) => book.category === "Thriller");
  const topSellers = allBooks.filter((book) => book.category === "Self Love");
  const financeBooks = allBooks.filter((book) => book.category === "Motivation");
  const latestNovels = allBooks.filter((book) => book.category === "Comedy");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AnotherQuoteCard />
        <SearchBar />

        {/* Category Tags */}
        <div className="flex flex-wrap gap-4 my-6">
          <CategoryTagCard />
        </div>

        {/* Sections by Category */}
        <section className="my-10">
          <h2 className="text-3xl font-bold mb-1">Popular in Fiction</h2>
          <LinkedBooksSection sectionTitle="Continue Listening" books={fictionBooks} />
        </section>

        <section className="my-10">
          <h2 className="text-3xl font-bold mb-1">Top Seller Books</h2>
          <LinkedBooksSection sectionTitle="Continue Listening" books={topSellers} />
        </section>

        <section className="my-10">
          <h2 className="text-3xl font-bold mb-1">Top Finance Books</h2>
          <LinkedBooksSection sectionTitle="Continue Listening" books={financeBooks} />
        </section>

        <section className="my-10">
          <h2 className="text-3xl font-bold mb-1">Latest Novels</h2>
          <LinkedBooksSection sectionTitle="Continue Listening" books={latestNovels} />
        </section>
      </div>

      <Footer />
    </div>
  );
}
