import React, { useState } from 'react';
import { Users, BookOpen, Plus, Clock, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';

interface Group {
    id: number;
    topic: string;
    course: string;
    members: number;
    max: number;
    time: string;
}

const StudyGroups: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([
        { id: 1, topic: 'Calculus Finals Prep', course: 'MATH201', members: 4, max: 6, time: 'Tue, 4 PM' },
        { id: 2, topic: 'React Project Help', course: 'CS305', members: 2, max: 4, time: 'Wed, 2 PM' },
        { id: 3, topic: 'Physics Lab Discussion', course: 'PHYS101', members: 3, max: 5, time: 'Thu, 1 PM' },
    ]);

    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [joinedGroups, setJoinedGroups] = useState<number[]>([]);

    // Form State
    const [newGroup, setNewGroup] = useState({
        topic: '',
        course: '',
        max: 4,
        time: ''
    });

    const handleJoinClick = (group: Group) => {
        setSelectedGroup(group);
        setIsJoinModalOpen(true);
    };

    const confirmJoin = () => {
        if (selectedGroup && !joinedGroups.includes(selectedGroup.id)) {
            setGroups(groups.map(g =>
                g.id === selectedGroup.id ? { ...g, members: Math.min(g.members + 1, g.max) } : g
            ));
            setJoinedGroups([...joinedGroups, selectedGroup.id]);
            setIsJoinModalOpen(false);
        }
    };

    const handleCreateClick = () => {
        setIsCreateModalOpen(true);
    };

    const confirmCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const group: Group = {
            id: Date.now(),
            topic: newGroup.topic,
            course: newGroup.course,
            members: 1,
            max: newGroup.max,
            time: newGroup.time
        };
        setGroups([...groups, group]);
        setJoinedGroups([...joinedGroups, group.id]);
        setIsCreateModalOpen(false);
        setNewGroup({ topic: '', course: '', max: 4, time: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Groups</h1>
                <button
                    onClick={handleCreateClick}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
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
                                {[...Array(Math.min(group.members, 5))].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-500 dark:text-gray-300">
                                        S{i + 1}
                                    </div>
                                ))}
                                {group.members > 5 && (
                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-500">
                                        +{group.members - 5}
                                    </div>
                                )}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {group.members}/{group.max} Joined
                            </span>
                        </div>
                        <button
                            onClick={() => handleJoinClick(group)}
                            disabled={joinedGroups.includes(group.id) || group.members >= group.max}
                            className={`w-full mt-4 py-2 border font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${joinedGroups.includes(group.id)
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 text-green-600 dark:text-green-400 cursor-default'
                                : 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
                                }`}
                        >
                            {joinedGroups.includes(group.id) ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Joined
                                </>
                            ) : group.members >= group.max ? (
                                'Group Full'
                            ) : (
                                'Join Group'
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* Join Modal */}
            <Modal
                isOpen={isJoinModalOpen}
                onClose={() => setIsJoinModalOpen(false)}
                title="Join Study Group"
            >
                {selectedGroup && (
                    <div className="space-y-6">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-1">{selectedGroup.topic}</h3>
                            <p className="text-indigo-600 dark:text-indigo-300 font-medium">{selectedGroup.course}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-xs font-medium uppercase tracking-wider">Time</span>
                                </div>
                                <p className="font-semibold text-gray-900 dark:text-white">{selectedGroup.time}</p>
                            </div>
                            <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                                    <Users className="w-4 h-4" />
                                    <span className="text-xs font-medium uppercase tracking-wider">Availability</span>
                                </div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {selectedGroup.max - selectedGroup.members} spots left
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Join this study group to collaborate with peers, share resources, and prepare for exams together.
                            You will be added to the group chat automatically.
                        </p>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setIsJoinModalOpen(false)}
                                className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmJoin}
                                className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/25"
                            >
                                Confirm Join
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Create Group Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create New Group"
            >
                <form onSubmit={confirmCreate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
                        <input
                            type="text"
                            required
                            value={newGroup.topic}
                            onChange={e => setNewGroup({ ...newGroup, topic: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="e.g. Finals Review"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Code</label>
                        <input
                            type="text"
                            required
                            value={newGroup.course}
                            onChange={e => setNewGroup({ ...newGroup, course: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="e.g. CS101"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                            <input
                                type="text"
                                required
                                value={newGroup.time}
                                onChange={e => setNewGroup({ ...newGroup, time: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="e.g. Mon 2pm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Members</label>
                            <input
                                type="number"
                                required
                                min="2"
                                max="10"
                                value={newGroup.max}
                                onChange={e => setNewGroup({ ...newGroup, max: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-500/25 mt-4"
                    >
                        Create Group
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default StudyGroups;
