import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const Schedule: React.FC = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const weeklySchedule: Record<string, any[]> = {
        Monday: [
            { id: 1, course: 'CS101 Intro to CS', time: '09:00 - 10:30', room: '301', type: 'Lecture' },
            { id: 2, course: 'MATH201 Calculus II', time: '11:00 - 12:30', room: '205', type: 'Lecture' },
        ],
        Tuesday: [
            { id: 3, course: 'PHYS101 Physics Lab', time: '14:00 - 16:00', room: 'Lab B', type: 'Lab' },
        ],
        Wednesday: [
            { id: 1, course: 'CS101 Intro to CS', time: '09:00 - 10:30', room: '301', type: 'Lecture' },
            { id: 2, course: 'MATH201 Calculus II', time: '11:00 - 12:30', room: '205', type: 'Lecture' },
        ],
        Thursday: [
            { id: 4, course: 'ART101 Art History', time: '10:00 - 11:30', room: 'Art Hall', type: 'Lecture' },
        ],
        Friday: [
            { id: 2, course: 'MATH201 Calculus II', time: '11:00 - 12:00', room: '205', type: 'Tutorial' },
        ],
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Schedule</h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">Fall Semester 2026</div>
            </div>

            <div className="grid gap-6">
                {days.map((day) => (
                    <div key={day} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className={`px-6 py-3 border-b border-gray-100 dark:border-gray-700 font-semibold ${new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day
                            ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400'
                            : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                            }`}>
                            {day}
                        </div>
                        {weeklySchedule[day]?.length > 0 ? (
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {weeklySchedule[day].map((cls) => (
                                    <div key={cls.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{cls.course}</h3>
                                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                                {cls.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-indigo-500" />
                                                {cls.time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-orange-500" />
                                                {cls.room}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-400 italic">No classes scheduled</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
