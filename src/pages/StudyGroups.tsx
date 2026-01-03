import React from 'react';
import { Users, BookOpen, MessageCircle } from 'lucide-react';

const StudyGroups: React.FC = () => {
    const groups = [
        { id: 1, topic: 'Calculus Finals Prep', course: 'MATH201', members: 4, max: 6, time: 'Tue, 4 PM' },
        { id: 2, topic: 'React Project Help', course: 'CS305', members: 2, max: 4, time: 'Wed, 2 PM' },
        { id: 3, topic: 'Physics Lab Discussion', course: 'PHYS101', members: 3, max: 5, time: 'Thu, 1 PM' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Groups</h1>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                    Create Group
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                    <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                    {group.course}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{group.topic}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <BookOpen className="w-4 h-4" />
                                <span>Study Session • {group.time}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {[...Array(group.members)].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-500 dark:text-gray-300">
                                        S{i + 1}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {group.members}/{group.max} Joined
                            </span>
                            <button className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <button className="w-full mt-4 py-2 border border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors">
                            Join Group
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyGroups;
