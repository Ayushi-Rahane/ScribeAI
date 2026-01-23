import React, { useState } from "react";
import { FaCheck, FaTimes, FaCalendarAlt, FaClock, FaBook, FaUser } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";

const mockRequests = [
    {
        id: 1,
        student: "John Doe",
        subject: "Advanced Calculus II",
        examType: "Final Exam",
        date: "Oct 28, 2024",
        time: "10:00 AM",
        duration: "3 Hours",
        requirements: "Need help with writing and reading questions",
    },
    {
        id: 2,
        student: "Sarah Johnson",
        subject: "Physics 101",
        examType: "Midterm",
        date: "Oct 30, 2024",
        time: "2:00 PM",
        duration: "2 Hours",
        requirements: "Assistance with calculations and diagrams",
    },
];

const IncomingRequests = () => {
    const [requests, setRequests] = useState(mockRequests);

    const handleAccept = (id) => {
        setRequests(requests.filter(r => r.id !== id));
        // In real app, would send to backend
    };

    const handleDecline = (id) => {
        setRequests(requests.filter(r => r.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <VolunteerSidebar />

            <div className="flex-1 md:ml-64">
                <div className="h-14 border-b bg-white flex items-center px-4 md:px-6 text-[#111F35] font-semibold">
                    <span className="pl-12 md:pl-0">Incoming Requests</span>
                </div>

                <div className="p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#111F35] mb-1">Incoming Requests</h1>
                        <p className="text-gray-500">Review and respond to student requests</p>
                    </div>

                    <div className="space-y-4">
                        {requests.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <FaBook className="text-5xl text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Pending Requests</h3>
                                <p className="text-gray-500">You're all caught up!</p>
                            </div>
                        ) : (
                            requests.map(request => (
                                <RequestCard
                                    key={request.id}
                                    request={request}
                                    onAccept={() => handleAccept(request.id)}
                                    onDecline={() => handleDecline(request.id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RequestCard = ({ request, onAccept, onDecline }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#F63049] text-white flex items-center justify-center font-semibold">
                        {request.student.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#111F35]">{request.subject}</h3>
                        <p className="text-sm text-gray-500">Student: {request.student}</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {request.examType}
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <InfoItem icon={<FaCalendarAlt />} label="Date" value={request.date} />
                <InfoItem icon={<FaClock />} label="Time" value={request.time} />
                <InfoItem icon={<FaClock />} label="Duration" value={request.duration} />
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600"><strong>Requirements:</strong> {request.requirements}</p>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onAccept}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                    <FaCheck /> Accept
                </button>
                <button
                    onClick={onDecline}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-2"
                >
                    <FaTimes /> Decline
                </button>
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

export default IncomingRequests;
