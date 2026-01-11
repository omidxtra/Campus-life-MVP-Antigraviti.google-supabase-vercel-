import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, AlertCircle, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';

interface Task {
    id: number;
    title: string;
    course: string;
    due: string;
    status: 'pending' | 'completed';
    priority: 'high' | 'medium' | 'low';
}

const Assignments: React.FC = () => {
    // Initialize from localStorage or fallback to default mock data
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('assignments');
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, title: 'Calculus Problem Set 3', course: 'Calculus II', due: '2026-10-15', status: 'pending', priority: 'high' },
            { id: 2, title: 'Read Chapter 4', course: 'Intro to CS', due: '2026-10-16', status: 'completed', priority: 'medium' },
            { id: 3, title: 'Lab Report', course: 'Physics Lab', due: '2026-10-18', status: 'pending', priority: 'medium' },
            { id: 4, title: 'Art Analysis Essay', course: 'Art History', due: '2026-10-25', status: 'pending', priority: 'low' },
        ];
    });

    // Save to localStorage whenever tasks change
    React.useEffect(() => {
        localStorage.setItem('assignments', JSON.stringify(tasks));
    }, [tasks]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTask, setNewTask] = useState<Partial<Task>>({
        title: '',
        course: '',
        due: '',
        priority: 'medium',
        status: 'pending'
    });

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
        ));
    };

    const deleteTask = (id: number) => {
        if (confirm('Are you sure you want to delete this assignment forever?')) {
            setTasks(tasks.filter(t => t.id !== id));
        }
    };

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.title || !newTask.course || !newTask.due) return;

        const task: Task = {
            id: Date.now(),
            title: newTask.title,
            course: newTask.course,
            due: newTask.due,
            priority: newTask.priority as 'high' | 'medium' | 'low',
            status: 'pending'
        };

        setTasks([...tasks, task]);
        setIsAddModalOpen(false);
        setNewTask({
            title: '',
            course: '',
            due: '',
            priority: 'medium',
            status: 'pending'
        });
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
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
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
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    title="Delete Assignment"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {tasks.length === 0 && (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No assignments found. Add one to get started!
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Assignment"
            >
                <form onSubmit={addTask} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            placeholder="e.g., Calculus Problem Set 3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Course
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                            value={newTask.course}
                            onChange={e => setNewTask({ ...newTask, course: e.target.value })}
                            placeholder="e.g., Calculus II"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Due Date
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                value={newTask.due}
                                onChange={e => setNewTask({ ...newTask, due: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Priority
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                value={newTask.priority}
                                onChange={e => setNewTask({ ...newTask, priority: e.target.value as any })}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Add Assignment
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Assignments;
