import React, { useState, useEffect } from 'react';
import { User, Mail, Hash, BookOpen, Edit2, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Initial profile state
    const [profileData, setProfileData] = useState({
        fullName: 'Alex Johnson',
        major: 'Computer Science',
        email: 'alex.johnson@university.edu',
        studentId: '202604512',
        advisor: 'Dr. Alan Grant',
        year: 'Sophomore'
    });

    // Sync with auth user if available
    useEffect(() => {
        if (user) {
            setProfileData(prev => ({
                ...prev,
                fullName: user.user_metadata?.full_name || prev.fullName,
                email: user.email || prev.email,
                studentId: user.user_metadata?.student_id || prev.studentId
            }));
        }
    }, [user]);

    const [editForm, setEditForm] = useState(profileData);

    const handleEditClick = () => {
        setEditForm(profileData);
        setIsEditModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setProfileData(editForm);
        setIsEditModalOpen(false);
    };

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
                        <button
                            onClick={handleEditClick}
                            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.fullName}</h2>
                            <p className="text-gray-500 dark:text-gray-400">{profileData.major} • {profileData.year}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Personal Information</h3>

                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Email</p>
                                        <p>{profileData.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <Hash className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Student ID</p>
                                        <p>{profileData.studentId}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Academic Overview</h3>

                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <BookOpen className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Major</p>
                                        <p>{profileData.major}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Advisor</p>
                                        <p>{profileData.advisor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Profile"
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={editForm.fullName}
                            onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Major</label>
                            <input
                                type="text"
                                value={editForm.major}
                                onChange={(e) => setEditForm({ ...editForm, major: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                            <select
                                value={editForm.year}
                                onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option>Freshman</option>
                                <option>Sophomore</option>
                                <option>Junior</option>
                                <option>Senior</option>
                                <option>Graduate</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student ID</label>
                            <input
                                type="text"
                                value={editForm.studentId}
                                onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Advisor</label>
                            <input
                                type="text"
                                value={editForm.advisor}
                                onChange={(e) => setEditForm({ ...editForm, advisor: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Profile;
