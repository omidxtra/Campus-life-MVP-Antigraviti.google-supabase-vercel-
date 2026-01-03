import React, { useState } from 'react';
import { Search, Book, Bookmark } from 'lucide-react';

const Library: React.FC = () => {
    const [query, setQuery] = useState('');

    const books = [
        { id: 1, title: 'Introduction to Algorithms', author: 'Cormen et al.', stock: 3, location: 'Shelf A1' },
        { id: 2, title: 'Clean Code', author: 'Robert C. Martin', stock: 0, location: 'Shelf B4' },
        { id: 3, title: 'Design Patterns', author: 'Gamma et al.', stock: 5, location: 'Shelf C2' },
        { id: 4, title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', stock: 2, location: 'Shelf A3' },
    ];

    const filteredBooks = books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()));

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

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Search Results</h2>
                {filteredBooks.map((book) => (
                    <div key={book.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                                <Book className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{book.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">{book.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${book.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                }`}>
                                {book.stock > 0 ? `${book.stock} Available` : 'Out of Stock'}
                            </span>
                            <button
                                disabled={book.stock === 0}
                                className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
                            >
                                <Bookmark className="w-4 h-4" />
                                Reserve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
