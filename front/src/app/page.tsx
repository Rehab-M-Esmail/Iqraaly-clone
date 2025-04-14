import Image from "next/image";
import '../app/globals.css';
import  Carousel from "../../components/horizontalscroll";
import SubscriptionCard from "../../components/subscribtioncard";
import AudiobookCardsSection from "../../components/audiocardsection";
import AnotherQuoteCard from "../../components/quotecard";
import SubscriptionPlans from "../../components/subscribtionplans";
import Footer from '../../components/footer';

const homeAudiobooks = [
  { title: "Funny Story", rating: 4.5, image: "/images/book1.jpg" },
  { title: "Great Big Beautiful Life", rating: 4.8, image: "/images/book2.jpg" },
  { title: "Rich Dad Poor Dad", rating: 4.2, image: "/images/book3.jpg" },
  { title: "It Ends With Us", rating: 3.4, image: "/images/book5.jpg" },
  { title: "Good vibes,Good life", rating: 4.6, image: "/images/book7.jpg" },
  { title: "The Crash", rating: 3.7, image: "/images/book8.jpg" },
  { title: "The atomic Habits", rating: 4.1, image: "/images/book6.jpg" }
];

export default function Home() {

  return (
    <div>
      <Carousel />
      <SubscriptionCard />
      <AudiobookCardsSection audiobooks={homeAudiobooks} sectionTitle="Trending Now" />
      <AnotherQuoteCard />
      <SubscriptionPlans />
      <Footer />
    </div>
    
  );
};


