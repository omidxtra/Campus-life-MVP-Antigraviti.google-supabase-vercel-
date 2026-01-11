import React from 'react';
import { Clock, MapPin, Bell, Calendar } from 'lucide-react';
import Modal from '../components/Modal';
import { weeklySchedule } from '../data/schedule';

const Dashboard: React.FC = () => {
    const [isAnnouncementsModalOpen, setIsAnnouncementsModalOpen] = React.useState(false);

    // Get today's classes
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayClasses = weeklySchedule[today] || [];

    const announcements = [
        { title: 'Campus Job Fair', date: 'Oct 15, 2026', content: 'Join us for the annual job fair at the Student Center.' },
        { title: 'Library Maintenance', date: 'Oct 12, 2026', content: 'The library will be closed for maintenance this Sunday.' },
        { title: 'Guest Lecture: AI Ethics', date: 'Oct 10, 2026', content: 'Special lecture by Dr. Alan Turing (AI Reincarnate).' },
    ];

    const stats = [
        { label: 'GPA', value: '3.8', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
        { label: 'Credits', value: '45/120', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
        { label: 'Attendance', value: '95%', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Hello, Student! 👋</h1>
                <p className="opacity-90">
                    {todayClasses.length > 0
                        ? `Ready for another productive day? You have ${todayClasses.length} classes today.`
                        : 'No classes scheduled for today. Enjoy your free time!'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Schedule & Stats */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className={`rounded-xl p-4 flex flex-col items-center justify-center ${stat.color}`}>
                                <span className="text-2xl font-bold">{stat.value}</span>
                                <span className="text-sm font-medium opacity-80 dark:opacity-90">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Today's Classes */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-500" />
                                Today's Classes
                            </h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString()}</span>
                        </div>

                        <div className="space-y-4">
                            {todayClasses.length > 0 ? (
                                todayClasses.map((cls, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-l-4 border-indigo-500">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{cls.course}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{cls.type}</p>
                                        </div>
                                        <div className="mt-2 sm:mt-0 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {cls.time}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {cls.room}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    <p>No classes scheduled for today.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Announcements */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-full">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-orange-500" />
                            Announcements
                        </h2>
                        <div className="space-y-4">
                            {announcements.map((ann, i) => (
                                <div key={i} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">News</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {ann.date}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mt-1">{ann.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{ann.content}</p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsAnnouncementsModalOpen(true)}
                            className="w-full mt-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        >
                            View All
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isAnnouncementsModalOpen}
                onClose={() => setIsAnnouncementsModalOpen(false)}
                title="All Announcements"
            >
                <div className="space-y-6">
                    {announcements.map((ann, i) => (
                        <div key={i} className="pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">News</span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {ann.date}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{ann.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{ann.content}</p>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default Dashboard;
