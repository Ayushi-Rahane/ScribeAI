import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaCalendarAlt, FaClock, FaBook, FaUser } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";
import volunteerService from "../../services/volunteerService";
import API_BASE_URL from "../../config/api";



const IncomingRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchIncomingRequests();
    }, []);

    const fetchIncomingRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await volunteerService.getIncomingRequests();
            setRequests(data);
        } catch (err) {
            console.error("Error fetching incoming requests:", err);
            setError(err.message || "Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (requestId) => {
        try {
            await volunteerService.acceptRequest(requestId);
            // Remove from list after accepting
            setRequests(requests.filter(r => r._id !== requestId));
        } catch (err) {
            console.error("Error accepting request:", err);
            alert("Failed to accept request. Please try again.");
        }
    };

    const handleDecline = (requestId) => {
        // For now, just remove from list
        // TODO: Add backend endpoint for declining requests
        setRequests(requests.filter(r => r._id !== requestId));
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

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F63049]"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                            <p className="font-medium">Error loading requests</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {/* Requests List */}
                    {!loading && (
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
                                        key={request._id}
                                        request={request}
                                        onAccept={() => handleAccept(request._id)}
                                        onDecline={() => handleDecline(request._id)}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const RequestCard = ({ request, onAccept, onDecline }) => {
    // Format the exam date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const studentName = request.studentId?.fullName || 'Unknown Student';
    const studentInitials = studentName.split(' ').map(n => n[0]).join('');

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {request.studentId?.profilePicture ? (
                        <img
                            src={`${API_BASE_URL.replace('/api/v1', '')}${request.studentId.profilePicture}`}
                            alt={studentName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-[#F63049] text-white flex items-center justify-center font-semibold">
                            {studentInitials}
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-[#111F35]">{request.subject}</h3>
                        <p className="text-sm text-gray-500">Student: {studentName}</p>
                        {request.studentId?.university && (
                            <p className="text-xs text-gray-400">{request.studentId.university}</p>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    {request.materials && request.materials.length > 0 && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <FaBook className="text-xs" /> Material Available
                        </span>
                    )}
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {request.examType}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <InfoItem icon={<FaCalendarAlt />} label="Date" value={formatDate(request.examDate)} />
                <InfoItem icon={<FaClock />} label="Time" value={request.examTime} />
                <InfoItem icon={<FaClock />} label="Duration" value={request.duration} />
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600"><strong>Requirements:</strong> {request.requirements}</p>
                {request.studentId?.specificNeeds && (
                    <p className="text-sm text-gray-600 mt-2"><strong>Special Needs:</strong> {request.studentId.specificNeeds}</p>
                )}
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
