import React, { useState } from 'react';
import { Coffee, Pizza, Utensils, Search } from 'lucide-react';

const Cafeteria: React.FC = () => {
    const [category, setCategory] = useState('All');

    const menuItems = [
        { id: 1, name: 'Grilled Chicken Sandwich', price: 6.50, category: 'Lunch', calories: 450, icon: Utensils },
        { id: 2, name: 'Vegetarian Pizza Slice', price: 3.00, category: 'Lunch', calories: 300, icon: Pizza },
        { id: 3, name: 'Caesar Salad', price: 5.50, category: 'Lunch', calories: 250, icon: Utensils },
        { id: 4, name: 'Morning Brew Coffee', price: 2.50, category: 'Beverage', calories: 10, icon: Coffee },
        { id: 5, name: 'Blueberry Muffin', price: 2.75, category: 'Breakfast', calories: 350, icon: Coffee },
    ];

    const filteredItems = category === 'All' ? menuItems : menuItems.filter(item => item.category === category);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cafeteria Menu</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search food..."
                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Breakfast', 'Lunch', 'Beverage'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === cat
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="h-32 bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/20 flex items-center justify-center">
                            <item.icon className="w-12 h-12 text-orange-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">${item.price.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <span>{item.category}</span>
                                <span>{item.calories} cal</span>
                            </div>
                            <button className="w-full mt-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-sm">
                                Add to Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cafeteria;
