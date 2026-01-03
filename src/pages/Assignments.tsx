import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

const Assignments: React.FC = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Calculus Problem Set 3', course: 'Calculus II', due: '2026-10-15', status: 'pending', priority: 'high' },
        { id: 2, title: 'Read Chapter 4', course: 'Intro to CS', due: '2026-10-16', status: 'completed', priority: 'medium' },
        { id: 3, title: 'Lab Report', course: 'Physics Lab', due: '2026-10-18', status: 'pending', priority: 'medium' },
        { id: 4, title: 'Art Analysis Essay', course: 'Art History', due: '2026-10-25', status: 'pending', priority: 'low' },
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
        ));
    };

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'high': return 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
            case 'medium': return 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30';
            case 'low': return 'text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
            default: return 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                    + Add New
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {tasks.map((task) => (
                        <div key={task.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`flex-shrink-0 transition-colors ${task.status === 'completed' ? 'text-green-500' : 'text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                                    }`}
                            >
                                {task.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                            </button>

                            <div className="flex-1 min-w-0">
                                <h3 className={`font-medium truncate ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                                    {task.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{task.course}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                <div className={`flex items-center gap-1 text-sm ${new Date(task.due) < new Date() && task.status !== 'completed' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {new Date(task.due) < new Date() && task.status !== 'completed' ? <AlertCircle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                                    {new Date(task.due).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Assignments;
