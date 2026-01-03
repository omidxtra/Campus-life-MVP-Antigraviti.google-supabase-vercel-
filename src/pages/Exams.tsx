import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const Exams: React.FC = () => {
    const exams = [
        { id: 1, course: 'Calculus II', title: 'Midterm Exam', date: '2026-10-28', time: '09:00 AM', location: 'Hall A', duration: '2h' },
        { id: 2, course: 'Intro to CS', title: 'Practical Exam', date: '2026-10-30', time: '11:00 AM', location: 'Lab 3', duration: '1.5h' },
        { id: 3, course: 'Physics', title: 'Final Exam', date: '2026-12-15', time: '01:00 PM', location: 'Hall B', duration: '3h' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exam Calendar</h1>

            <div className="grid gap-6">
                {exams.map((exam) => (
                    <div key={exam.id} className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10">
                            <Calendar className="w-32 h-32 dark:text-white" />
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 rounded-lg w-20 h-20 text-indigo-700 dark:text-indigo-400">
                                    <span className="text-xs font-bold uppercase">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-2xl font-bold">{new Date(exam.date).getDate()}</span>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{exam.course}</h2>
                                    <p className="font-medium text-gray-600 dark:text-gray-300">{exam.title}</p>
                                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {exam.time} ({exam.duration})</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {exam.location}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Exams;
