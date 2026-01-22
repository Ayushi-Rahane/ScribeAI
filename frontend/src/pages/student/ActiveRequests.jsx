import React, { useState } from "react";
import { FaTrash, FaClock, FaCalendarAlt, FaBook } from "react-icons/fa";
import StudentSidebar from "../../components/student/StudentSidebar";

const initialRequests = [
    {
        id: 1,
        subject: "Advanced Calculus II",
        type: "Final Exam",
        date: "Oct 24, 2024",
        time: "10:00 AM",
        duration: "3 Hours",
        status: "Matching in Progress",
        matchProbability: 80,
        notifiedVolunteers: 5,
    },
    {
        id: 2,
        subject: "Physics 101",
        type: "Midterm",
        date: "Oct 28, 2024",
        time: "2:00 PM",
        duration: "2 Hours",
        status: "Pending",
        matchProbability: 60,
        notifiedVolunteers: 3,
    },
    {
        id: 3,
        subject: "Chemistry Lab",
        type: "Quiz",
        date: "Nov 02, 2024",
        time: "11:30 AM",
        duration: "1 Hour",
        status: "Matched",
        volunteer: "Sarah Johnson",
        matchProbability: 100,
    },
];

const ActiveRequests = () => {
    const [requests, setRequests] = useState(initialRequests);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDelete = (id) => {
        setRequests(requests.filter(req => req.id !== id));
        setDeleteConfirm(null);
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <StudentSidebar />

            <div className="flex-1 md:ml-64">
                {/* Top bar */}
                <div className="h-14 border-b bg-white flex items-center px-4 md:px-6 text-[#111F35] font-semibold">
                    Active Requests
                </div>

                <div className="p-4 md:p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#111F35] mb-1">Active Requests</h1>
                        <p className="text-gray-500">
                            Manage your pending and matched scribe requests
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <StatCard title="Total Active" value={requests.length} color="blue" />
                        <StatCard
                            title="Matching"
                            value={requests.filter(r => r.status === "Matching in Progress").length}
                            color="orange"
                        />
                        <StatCard
                            title="Matched"
                            value={requests.filter(r => r.status === "Matched").length}
                            color="green"
                        />
                    </div>

                    {/* Requests List */}
                    <div className="space-y-4">
                        {requests.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                                <div className="text-gray-400 mb-4">
                                    <FaBook className="text-5xl mx-auto" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Requests</h3>
                                <p className="text-gray-500">You don't have any active scribe requests at the moment.</p>
                            </div>
                        ) : (
                            requests.map((request) => (
                                <RequestCard
                                    key={request.id}
                                    request={request}
                                    onDelete={() => setDeleteConfirm(request.id)}
                                    deleteConfirm={deleteConfirm === request.id}
                                    onConfirmDelete={() => handleDelete(request.id)}
                                    onCancelDelete={() => setDeleteConfirm(null)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* -------------------- Components -------------------- */

const StatCard = ({ title, value, color }) => {
    const colorMap = {
        blue: "bg-blue-50 text-blue-600",
        orange: "bg-orange-50 text-orange-600",
        green: "bg-green-50 text-green-600",
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className={`text-3xl font-bold ${colorMap[color]}`}>{value}</h3>
        </div>
    );
};

const RequestCard = ({ request, onDelete, deleteConfirm, onConfirmDelete, onCancelDelete }) => {
    const statusColors = {
        "Matching in Progress": "bg-orange-100 text-orange-700",
        "Pending": "bg-yellow-100 text-yellow-700",
        "Matched": "bg-green-100 text-green-700",
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F63049] text-white flex items-center justify-center font-semibold">
                        {request.subject.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#111F35]">{request.subject}</h3>
                        <p className="text-sm text-gray-500">{request.type}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                        {request.status}
                    </span>

                    {!deleteConfirm ? (
                        <button
                            onClick={onDelete}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                            <FaTrash />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onCancelDelete}
                                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirmDelete}
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <InfoItem icon={<FaCalendarAlt />} label="Date" value={request.date} />
                    <InfoItem icon={<FaClock />} label="Time" value={request.time} />
                    <InfoItem icon={<FaClock />} label="Duration" value={request.duration} />
                    {request.volunteer && (
                        <InfoItem icon={<FaBook />} label="Volunteer" value={request.volunteer} />
                    )}
                </div>

                {/* Progress Bar (for matching requests) */}
                {request.status === "Matching in Progress" && (
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-600">Match Probability</p>
                            <p className="text-sm font-semibold text-[#F63049]">{request.matchProbability}%</p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#F63049] rounded-full transition-all"
                                style={{ width: `${request.matchProbability}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {request.notifiedVolunteers} qualified volunteers notified
                        </p>
                    </div>
                )}

                {/* Matched Info */}
                {request.status === "Matched" && (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-700">
                            ✓ Matched with <span className="font-semibold">{request.volunteer}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-2">
        <span className="text-gray-400 mt-0.5">{icon}</span>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-[#111F35]">{value}</p>
        </div>
    </div>
);

export default ActiveRequests;
