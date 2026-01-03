import React from 'react';
import { Bell, Moon, Sun, Lock, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">

                {/* Appearance */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>

                {/* Notifications (Mock) */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts for classes and assignments</p>
                            </div>
                        </div>
                        <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-indigo-600`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6`} />
                        </button>
                    </div>
                </div>

                {/* Account (Mock) */}
                <div className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account</h2>

                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Lock className="w-5 h-5 text-gray-400" />
                            <span>Change Password</span>
                        </div>
                        <span className="text-gray-400 text-2xl">›</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <span>Language</span>
                        </div>
                        <span className="text-gray-400 text-sm">English ›</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Settings;
