import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, BookOpen, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';

interface Exam {
    id: number;
    course: string;
    title: string;
    date: string;
    time: string;
    location: string;
    duration: string;
    topics: string[];
    requirements: string;
}

const Exams: React.FC = () => {
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const exams: Exam[] = [
        {
            id: 1,
            course: 'Calculus II',
            title: 'Midterm Exam',
            date: '2026-10-28',
            time: '09:00 AM',
            location: 'Hall A',
            duration: '2h',
            topics: ['Integration Techniques', 'Sequences and Series', 'Parametric Equations', 'Polar Coordinates'],
            requirements: 'Scientific Calculator allowed. No graphing calculators.'
        },
        {
            id: 2,
            course: 'Intro to CS',
            title: 'Practical Exam',
            date: '2026-10-30',
            time: '11:00 AM',
            location: 'Lab 3',
            duration: '1.5h',
            topics: ['Arrays & Loops', 'Functions', 'Object-Oriented Programming', 'File I/O'],
            requirements: 'Exam will be conducted on provided lab computers. Internet access restricted.'
        },
        {
            id: 3,
            course: 'Physics',
            title: 'Final Exam',
            date: '2026-12-15',
            time: '01:00 PM',
            location: 'Hall B',
            duration: '3h',
            topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'],
            requirements: 'Formula sheet will be provided. Bring your own calculator and ruler.'
        },
    ];

    const handleViewDetails = (exam: Exam) => {
        setSelectedExam(exam);
        setIsModalOpen(true);
    };

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

                            <button
                                onClick={() => handleViewDetails(exam)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Exam Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedExam?.course || 'Exam Details'}
            >
                {selectedExam && (
                    <div className="space-y-6">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-indigo-900 dark:text-indigo-100">{selectedExam.title}</h3>
                                <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                                    Make sure to arrive at {selectedExam.location} at least 15 minutes before {selectedExam.time}.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                <h4 className="font-semibold text-gray-900 dark:text-white">Topics Covered</h4>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {selectedExam.topics.map((topic, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                <h4 className="font-semibold text-gray-900 dark:text-white">Requirements</h4>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                                    "{selectedExam.requirements}"
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Exams;
