import React from 'react';
import { User, Mail, Hash, BookOpen, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Profile</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="px-6 pb-6">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="bg-white dark:bg-gray-800 p-1 rounded-full">
                            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 border-4 border-white dark:border-gray-800">
                                <User className="w-12 h-12" />
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2">
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.user_metadata?.full_name || 'Alex Johnson'}</h2>
                            <p className="text-gray-500 dark:text-gray-400">Computer Science • Sophomore</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Personal Information</h3>

                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Email</p>
                                        <p>{user?.email || 'alex.johnson@university.edu'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <Hash className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Student ID</p>
                                        <p>{user?.user_metadata?.student_id || '202604512'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Academic Overview</h3>

                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <BookOpen className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Major</p>
                                        <p>Bachelor of Computer Science</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Advisor</p>
                                        <p>Dr. Alan Grant</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
