import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';

import scienceFairImg from '../assets/events/science-fair.png';
import concertImg from '../assets/events/concert.png';
import techTalkImg from '../assets/events/tech-talk.png';

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    category: string;
    description: string;
}

const Events: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [signedUpEvents, setSignedUpEvents] = useState<number[]>([]);

    const events: Event[] = [
        {
            id: 1,
            title: 'Annual Science Fair',
            date: 'Oct 20, 2026',
            time: '10:00 AM',
            location: 'Main Hall',
            image: scienceFairImg,
            category: 'Academic',
            description: 'Join us for the university\'s largest annual showcase of student innovation! The Science Fair features over 50 projects from various departments including Robotics, Biology, Physics, and Computer Science. Come meet the brilliant minds behind the projects, participate in interactive demos, and vote for the "Student Choice Award". Refreshments will be provided.'
        },
        {
            id: 2,
            title: 'Music Club Concert',
            date: 'Oct 22, 2026',
            time: '07:00 PM',
            location: 'Auditorium',
            image: concertImg,
            category: 'Social',
            description: 'Experience an electrifying night of live music performed by the university\'s top student bands. From Jazz and Rock to Classical and Pop, there\'s something for everyone. This year\'s lineup features special guest performances from alumni. Don\'t miss out on the post-concert social mixer!'
        },
        {
            id: 3,
            title: 'Tech Career Talk',
            date: 'Oct 25, 2026',
            time: '02:00 PM',
            location: 'Room 304',
            image: techTalkImg,
            category: 'Career',
            description: 'Thinking about your future in tech? Join industry leaders from top tech companies as they share insights on the current job market, resume tips, and interview strategies. There will be a Q&A session followed by a networking opportunity. Bring your resume!'
        }
    ];

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleSignUp = () => {
        if (selectedEvent && !signedUpEvents.includes(selectedEvent.id)) {
            setSignedUpEvents([...signedUpEvents, selectedEvent.id]);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Events</h1>

            <div className="grid gap-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <div className="sm:w-64 h-48 sm:h-auto overflow-hidden relative">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {signedUpEvents.includes(event.id) && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Signed Up
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mb-2">
                                        {event.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                                </div>

                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mt-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {event.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {event.time}
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

            {/* Event Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedEvent?.title || 'Event Details'}
            >
                {selectedEvent && (
                    <div className="space-y-6">
                        <div className="rounded-xl overflow-hidden h-64 w-full">
                            <img
                                src={selectedEvent.image}
                                alt={selectedEvent.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg">
                                <Calendar className="w-4 h-4 text-indigo-500" />
                                {selectedEvent.date}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg">
                                <Clock className="w-4 h-4 text-indigo-500" />
                                {selectedEvent.time}
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg">
                                <MapPin className="w-4 h-4 text-indigo-500" />
                                {selectedEvent.location}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">About this Event</h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {selectedEvent.description}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={handleSignUp}
                                disabled={signedUpEvents.includes(selectedEvent.id)}
                                className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${signedUpEvents.includes(selectedEvent.id)
                                    ? 'bg-green-500 cursor-default'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/25'
                                    }`}
                            >
                                {signedUpEvents.includes(selectedEvent.id) ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Signed Up!
                                    </>
                                ) : (
                                    'Sign Up Now'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Events;
