import { useState } from 'react';

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    cover: "https://m.media-amazon.com/images/I/81StSOpmkjL._AC_UF1000,1000_QL80_.jpg"
  }
];

export function BookCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevBook = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? books.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-64">
        <img 
          src={books[currentIndex].cover} 
          alt={books[currentIndex].title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 rounded-b-lg">
          <h3 className="text-lg font-bold">{books[currentIndex].title}</h3>
          <p className="text-sm">{books[currentIndex].author}</p>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <button 
          onClick={prevBook}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <button 
          onClick={nextBook}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
