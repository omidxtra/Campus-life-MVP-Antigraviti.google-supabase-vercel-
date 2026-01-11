import React, { useState } from 'react';
import { Search, Book, Bookmark, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from '../components/Modal';

import csImg from '../assets/library/cs.png';
import mathImg from '../assets/library/math.png';
import scienceImg from '../assets/library/science.png';
import litImg from '../assets/library/literature.png';

interface BookItem {
    id: number;
    title: string;
    author: string;
    category: string;
    stock: number;
    location: string;
    description: string;
    coverColor: string;
}

const Library: React.FC = () => {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
    const [reservationDuration, setReservationDuration] = useState('24 Hours');
    const [reservedBooks, setReservedBooks] = useState<number[]>([]);

    const categories = [
        { name: 'All', image: null },
        { name: 'Computer Science', image: csImg },
        { name: 'Mathematics', image: mathImg },
        { name: 'Science', image: scienceImg },
        { name: 'Literature', image: litImg }
    ];

    const books: BookItem[] = [
        // Computer Science
        { id: 1, title: 'Introduction to Algorithms', author: 'Cormen et al.', category: 'Computer Science', stock: 3, location: 'Shelf A1', description: 'The bible of algorithms, covering a broad range of algorithms in depth.', coverColor: 'bg-red-500' },
        { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Computer Science', stock: 0, location: 'Shelf B4', description: 'A handbook of agile software craftsmanship.', coverColor: 'bg-blue-500' },
        { id: 3, title: 'Design Patterns', author: 'Gamma et al.', category: 'Computer Science', stock: 5, location: 'Shelf C2', description: 'Elements of reusable object-oriented software.', coverColor: 'bg-gray-500' },
        { id: 4, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', category: 'Computer Science', stock: 2, location: 'Shelf A3', description: 'Your journey to mastery.', coverColor: 'bg-orange-500' },
        { id: 5, title: 'You Don\'t Know JS', author: 'Kyle Simpson', category: 'Computer Science', stock: 4, location: 'Shelf D1', description: 'Deep dive into the core mechanisms of the JavaScript language.', coverColor: 'bg-yellow-500' },

        // Mathematics
        { id: 6, title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', stock: 2, location: 'Shelf M1', description: 'Best seller calculus textbook.', coverColor: 'bg-indigo-500' },
        { id: 7, title: 'Linear Algebra Done Right', author: 'Sheldon Axler', category: 'Mathematics', stock: 1, location: 'Shelf M2', description: 'A text for a second course in linear algebra.', coverColor: 'bg-purple-500' },
        { id: 8, title: 'Concrete Mathematics', author: 'Graham, Knuth, Patashnik', category: 'Mathematics', stock: 3, location: 'Shelf M3', description: 'A foundation for computer science.', coverColor: 'bg-gray-600' },
        { id: 9, title: 'Principles of Mathematical Analysis', author: 'Walter Rudin', category: 'Mathematics', stock: 0, location: 'Shelf M4', description: 'The famous "Baby Rudin" book.', coverColor: 'bg-blue-600' },
        { id: 10, title: 'Introduction to Topology', author: 'Bert Mendelson', category: 'Mathematics', stock: 5, location: 'Shelf M5', description: 'Highly regarded introduction to topology.', coverColor: 'bg-green-500' },

        // Science
        { id: 11, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', stock: 4, location: 'Shelf S1', description: 'From the Big Bang to Black Holes.', coverColor: 'bg-black' },
        { id: 12, title: 'The Selfish Gene', author: 'Richard Dawkins', category: 'Science', stock: 2, location: 'Shelf S2', description: 'The gene-centred view of evolution.', coverColor: 'bg-teal-500' },
        { id: 13, title: 'Cosmos', author: 'Carl Sagan', category: 'Science', stock: 3, location: 'Shelf S3', description: 'The story of cosmic evolution, science and civilization.', coverColor: 'bg-blue-900' },
        { id: 14, title: 'Silent Spring', author: 'Rachel Carson', category: 'Science', stock: 1, location: 'Shelf S4', description: 'Environmental science classic.', coverColor: 'bg-green-600' },
        { id: 15, title: 'The Double Helix', author: 'James D. Watson', category: 'Science', stock: 0, location: 'Shelf S5', description: 'A personal account of the discovery of the structure of DNA.', coverColor: 'bg-pink-500' },

        // Literature
        { id: 16, title: '1984', author: 'George Orwell', category: 'Literature', stock: 6, location: 'Shelf L1', description: 'Dystopian social science fiction novel.', coverColor: 'bg-gray-800' },
        { id: 17, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Literature', stock: 2, location: 'Shelf L2', description: 'A novel about the serious issues of rape and racial inequality.', coverColor: 'bg-yellow-600' },
        { id: 18, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', stock: 3, location: 'Shelf L3', description: 'A portrait of the Jazz Age in all its decadence and excess.', coverColor: 'bg-indigo-900' },
        { id: 19, title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Literature', stock: 4, location: 'Shelf L4', description: 'Romantic novel of manners.', coverColor: 'bg-rose-400' },
        { id: 20, title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Literature', stock: 1, location: 'Shelf L5', description: 'A story about teenage angst and alienation.', coverColor: 'bg-red-700' },
    ];

    const filteredBooks = books.filter(b =>
        (activeCategory === 'All' || b.category === activeCategory) &&
        (b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()))
    );

    const handleBookClick = (book: BookItem) => {
        setSelectedBook(book);
    };

    const handleReserveClick = (e: React.MouseEvent, book: BookItem) => {
        e.stopPropagation();
        setSelectedBook(book);
        setIsReservationModalOpen(true);
    };

    const confirmReservation = () => {
        if (selectedBook && !reservedBooks.includes(selectedBook.id)) {
            setReservedBooks([...reservedBooks, selectedBook.id]);
            setIsReservationModalOpen(false);
            // Optionally close the details modal too if it's open, or keep it open.
            // Let's keep detail modal logic separate.
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-indigo-600 rounded-2xl p-8 text-white text-center sm:text-left">
                <h1 className="text-3xl font-bold mb-4">University Library</h1>
                <div className="relative max-w-2xl mx-auto sm:mx-0">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-indigo-400"
                    />
                </div>
            </div>

            {/* Categories with Images */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map(cat => (
                    <button
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`relative h-24 rounded-xl overflow-hidden group transition-all transform hover:scale-105 ${activeCategory === cat.name
                            ? 'ring-4 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900'
                            : 'opacity-80 hover:opacity-100'
                            }`}
                    >
                        {cat.image ? (
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600" />
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-center px-2 drop-shadow-md">
                                {cat.name}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        onClick={() => handleBookClick(book)}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <div className={`w-24 h-32 ${book.coverColor} rounded-lg shadow-md flex-shrink-0 flex items-center justify-center text-white/20`}>
                            <Book className="w-12 h-12" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">{book.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{book.author}</p>
                                <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                    {book.category}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className={`text-xs font-semibold ${book.stock > 0
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-500 dark:text-red-400'
                                    }`}>
                                    {book.stock > 0 ? `${book.stock} Available` : 'Out of Stock'}
                                </span>
                                {reservedBooks.includes(book.id) && (
                                    <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                                        <CheckCircle2 className="w-3 h-3" /> Reserved
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Book Details Modal */}
            <Modal
                isOpen={!!selectedBook && !isReservationModalOpen}
                onClose={() => setSelectedBook(null)}
                title="Book Details"
            >
                {selectedBook && (
                    <div className="space-y-6">
                        <div className="flex gap-6">
                            <div className={`w-32 h-44 ${selectedBook.coverColor} rounded-lg shadow-lg flex-shrink-0 flex items-center justify-center text-white/20`}>
                                <Book className="w-16 h-16" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedBook.title}</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">{selectedBook.author}</p>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Category:</span> {selectedBook.category}</p>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Location:</span> {selectedBook.location}</p>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">ISBN:</span> 978-0-123456-78-9</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {selectedBook.description}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={(e) => handleReserveClick(e, selectedBook)}
                                disabled={selectedBook.stock === 0 || reservedBooks.includes(selectedBook.id)}
                                className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${reservedBooks.includes(selectedBook.id)
                                    ? 'bg-green-500 cursor-default'
                                    : selectedBook.stock === 0
                                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/25'
                                    }`}
                            >
                                {reservedBooks.includes(selectedBook.id) ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Reserved Successfully
                                    </>
                                ) : selectedBook.stock === 0 ? (
                                    'Currently Unavailable'
                                ) : (
                                    <>
                                        <Bookmark className="w-5 h-5" />
                                        Reserve Book
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Reservation Duration Modal */}
            <Modal
                isOpen={isReservationModalOpen}
                onClose={() => setIsReservationModalOpen(false)}
                title="Confirm Reservation"
            >
                {selectedBook && (
                    <div className="space-y-6">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-indigo-900 dark:text-indigo-100">Pick-up Required</h3>
                                <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                                    Please pick up {selectedBook.title} from {selectedBook.location} within 2 hours of reservation confirmation.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                How long would you like to keep this book?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {['24 Hours', '3 Days', '1 Week'].map((duration) => (
                                    <button
                                        key={duration}
                                        onClick={() => setReservationDuration(duration)}
                                        className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${reservationDuration === duration
                                            ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <Clock className="w-5 h-5" />
                                            {duration}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setIsReservationModalOpen(false)}
                                className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReservation}
                                className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/25"
                            >
                                Confirm Reservation
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Library;
