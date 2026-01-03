import React from 'react';
import { Calendar, MapPin, Share2 } from 'lucide-react';

const Events: React.FC = () => {
    const events = [
        {
            id: 1,
            title: 'Annual Science Fair',
            date: 'Oct 20, 2026',
            time: '10:00 AM',
            location: 'Main Hall',
            image: 'bg-blue-100', // Placeholder for gradient/image
            category: 'Academic'
        },
        {
            id: 2,
            title: 'Music Club Concert',
            date: 'Oct 22, 2026',
            time: '07:00 PM',
            location: 'Auditorium',
            image: 'bg-purple-100',
            category: 'Social'
        },
        {
            id: 3,
            title: 'Tech Career Talk',
            date: 'Oct 25, 2026',
            time: '02:00 PM',
            location: 'Room 304',
            image: 'bg-teal-100',
            category: 'Career'
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Events</h1>


            <div className="grid gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                        <div className={`sm:w-48 h-32 sm:h-auto ${event.image} dark:opacity-80 flex items-center justify-center`}>
                            <Calendar className="w-10 h-10 text-gray-400 opacity-50" />
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mb-2">
                                        {event.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                                </div>
                                <button className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {event.date} • {event.time}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {event.location}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
