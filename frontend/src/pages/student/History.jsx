import React, { useState } from "react";
import StudentSidebar from "../../components/student/StudentSidebar";
import { FaStar, FaCalendar, FaClock, FaBook, FaTimes } from "react-icons/fa";

const History = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    // Mock data for completed requests
    const completedRequests = [
        {
            id: 1,
            examName: "Mathematics Final Exam",
            subject: "Mathematics",
            date: "2024-01-15",
            time: "10:00 AM",
            duration: "3 hours",
            volunteer: {
                name: "Priya Sharma",
                avatar: "PS",
                color: "bg-purple-500"
            },
            status: "Completed",
            hasFeedback: false
        },
        {
            id: 2,
            examName: "Physics Mid-term",
            subject: "Physics",
            date: "2024-01-10",
            time: "2:00 PM",
            duration: "2 hours",
            volunteer: {
                name: "Rahul Verma",
                avatar: "RV",
                color: "bg-blue-500"
            },
            status: "Completed",
            hasFeedback: true,
            feedback: {
                rating: 5,
                comment: "Excellent support! Very patient and helpful."
            }
        },
        {
            id: 3,
            examName: "Computer Science Quiz",
            subject: "Computer Science",
            date: "2024-01-05",
            time: "11:00 AM",
            duration: "1 hour",
            volunteer: {
                name: "Vikram Singh",
                avatar: "VS",
                color: "bg-red-500"
            },
            status: "Completed",
            hasFeedback: false
        },
        {
            id: 4,
            examName: "Chemistry Lab Exam",
            subject: "Chemistry",
            date: "2023-12-20",
            time: "9:00 AM",
            duration: "2.5 hours",
            volunteer: {
                name: "Anjali Patel",
                avatar: "AP",
                color: "bg-green-500"
            },
            status: "Completed",
            hasFeedback: true,
            feedback: {
                rating: 4,
                comment: "Great experience overall. Very professional."
            }
        }
    ];

    const openFeedbackModal = (request) => {
        setSelectedRequest(request);
        setShowFeedbackModal(true);
    };

    const closeFeedbackModal = () => {
        setShowFeedbackModal(false);
        setSelectedRequest(null);
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <StudentSidebar />

            <div className="flex-1 ml-64">
                {/* Top Bar */}
                <div className="h-14 border-b bg-white flex items-center px-6 text-[#111F35] font-semibold">
                    Request History
                </div>

                <div className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#111F35] mb-2">Your Request History</h1>
                        <p className="text-gray-600">View your past requests and provide feedback</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard title="Total Requests" value={completedRequests.length} color="bg-blue-500" />
                        <StatCard title="Feedback Given" value={completedRequests.filter(r => r.hasFeedback).length} color="bg-green-500" />
                        <StatCard title="Pending Feedback" value={completedRequests.filter(r => !r.hasFeedback).length} color="bg-orange-500" />
                    </div>

                    {/* Request Cards */}
                    {completedRequests.length > 0 ? (
                        <div className="space-y-4">
                            {completedRequests.map(request => (
                                <RequestCard
                                    key={request.id}
                                    request={request}
                                    onFeedback={() => openFeedbackModal(request)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                            <div className="text-gray-400 text-5xl mb-4">📚</div>
                            <h3 className="text-lg font-semibold text-[#111F35] mb-2">No history yet</h3>
                            <p className="text-gray-600">Your completed requests will appear here</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Feedback Modal */}
            {showFeedbackModal && selectedRequest && (
                <FeedbackModal
                    request={selectedRequest}
                    onClose={closeFeedbackModal}
                />
            )}
        </div>
    );
};

/* ---------------- Stat Card Component ---------------- */

const StatCard = ({ title, value, color }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                {value}
            </div>
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-[#111F35]">{value}</p>
            </div>
        </div>
    </div>
);

/* ---------------- Request Card Component ---------------- */

const RequestCard = ({ request, onFeedback }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-start justify-between gap-4">
            {/* Left Section */}
            <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                    {/* Volunteer Avatar */}
                    <div className={`w-12 h-12 rounded-full ${request.volunteer.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                        {request.volunteer.avatar}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#111F35] mb-1">{request.examName}</h3>
                        <p className="text-sm text-gray-600 mb-2">Volunteer: <span className="font-semibold text-[#111F35]">{request.volunteer.name}</span></p>

                        {/* Details */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <FaBook className="text-[#F63049]" />
                                <span>{request.subject}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaCalendar className="text-[#F63049]" />
                                <span>{request.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FaClock className="text-[#F63049]" />
                                <span>{request.time} ({request.duration})</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                {request.hasFeedback ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-green-700">Your Feedback</span>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < request.feedback.rating ? "text-yellow-400" : "text-gray-300"}
                                        size={14}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-700">{request.feedback.comment}</p>
                    </div>
                ) : (
                    <button
                        onClick={onFeedback}
                        className="bg-[#F63049] text-white px-6 py-2 rounded-lg hover:bg-[#e12a40] transition text-sm font-medium"
                    >
                        Write Feedback
                    </button>
                )}
            </div>

            {/* Status Badge */}
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                {request.status}
            </span>
        </div>
    </div>
);

/* ---------------- Feedback Modal Component ---------------- */

const FeedbackModal = ({ request, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        // Here you would send the feedback to your backend
        console.log("Submitting feedback:", { rating, comment, requestId: request.id });

        // Show success message and close modal
        alert("Thank you for your feedback!");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8 animate-scaleIn">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#111F35]">Write Feedback</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Volunteer Info */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                    <div className={`w-12 h-12 rounded-full ${request.volunteer.color} text-white flex items-center justify-center text-sm font-bold`}>
                        {request.volunteer.avatar}
                    </div>
                    <div>
                        <p className="font-semibold text-[#111F35]">{request.volunteer.name}</p>
                        <p className="text-sm text-gray-600">{request.examName}</p>
                    </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#111F35] mb-3">Rate your experience</label>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="transition-transform hover:scale-110"
                            >
                                <FaStar
                                    size={32}
                                    className={
                                        star <= (hoveredRating || rating)
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            </button>
                        ))}
                        {rating > 0 && (
                            <span className="ml-2 text-sm text-gray-600">
                                {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Comment */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#111F35] mb-2">Your feedback (optional)</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience with this volunteer..."
                        rows={4}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049] resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg hover:bg-gray-100 transition font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className={`flex-1 py-2.5 rounded-lg transition font-medium ${rating === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-[#F63049] text-white hover:bg-[#e12a40]"
                            }`}
                    >
                        Submit Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

export default History;
