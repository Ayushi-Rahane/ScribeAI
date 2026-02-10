import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaBook, FaUser, FaDownload } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";
import volunteerService from "../../services/volunteerService";
import API_BASE_URL from "../../config/api";

const ActiveAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchActiveAssignments();
    }, []);

    const fetchActiveAssignments = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await volunteerService.getActiveAssignments();
            setAssignments(data);
        } catch (err) {
            console.error("Error fetching active assignments:", err);
            setError(err.message || "Failed to load assignments");
        } finally {
            setLoading(false);
        }
    };

    // Calculate stats
    const thisWeekCount = assignments.filter(a => {
        const examDate = new Date(a.examDate);
        const today = new Date();
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        return examDate >= today && examDate <= weekFromNow;
    }).length;

    const thisMonthCount = assignments.filter(a => {
        const examDate = new Date(a.examDate);
        const today = new Date();
        return examDate.getMonth() === today.getMonth() && examDate.getFullYear() === today.getFullYear();
    }).length;

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <VolunteerSidebar />

            <div className="flex-1 md:ml-64">
                <div className="h-14 border-b bg-white flex items-center px-4 md:px-6 text-[#111F35] font-semibold">
                    <span className="pl-12 md:pl-0">Active Assignments</span>
                </div>

                <div className="p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#111F35] mb-1">Active Assignments</h1>
                        <p className="text-gray-500">Your current volunteering commitments</p>
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
                            <p className="font-medium">Error loading assignments</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {/* Content */}
                    {!loading && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <StatCard title="Total Active" value={assignments.length} color="blue" />
                                <StatCard title="This Week" value={thisWeekCount} color="green" />
                                <StatCard title="This Month" value={thisMonthCount} color="orange" />
                            </div>

                            <div className="space-y-4">
                                {assignments.length === 0 ? (
                                    <div className="bg-white rounded-2xl p-12 text-center">
                                        <FaBook className="text-5xl text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Assignments</h3>
                                        <p className="text-gray-500">You don't have any active assignments yet.</p>
                                    </div>
                                ) : (
                                    assignments.map(assignment => (
                                        <AssignmentCard key={assignment._id} assignment={assignment} />
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => {
    const colorMap = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className={`text-3xl font-bold ${colorMap[color]}`}>{value}</h3>
        </div>
    );
};

const AssignmentCard = ({ assignment }) => {
    // Format the exam date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const studentName = assignment.studentId?.fullName || 'Unknown Student';
    const studentInitials = studentName.split(' ').map(n => n[0]).join('');

    // Determine status badge
    const getStatusBadge = () => {
        const now = new Date();
        const examDate = new Date(assignment.examDate);

        if (assignment.status === 'in-progress') {
            return { text: 'In Progress', color: 'bg-blue-100 text-blue-700' };
        } else if (examDate < now) {
            return { text: 'Completed', color: 'bg-gray-100 text-gray-700' };
        } else {
            return { text: 'Upcoming', color: 'bg-green-100 text-green-700' };
        }
    };

    const statusBadge = getStatusBadge();

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {assignment.studentId?.profilePicture ? (
                        <img
                            src={`${API_BASE_URL.replace('/api/v1', '')}${assignment.studentId.profilePicture}`}
                            alt={studentName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-[#F63049] text-white flex items-center justify-center font-semibold">
                            {studentInitials}
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-[#111F35]">{assignment.subject}</h3>
                        <p className="text-sm text-gray-500">Student: {studentName}</p>
                        {assignment.studentId?.university && (
                            <p className="text-xs text-gray-400">{assignment.studentId.university}</p>
                        )}
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                    {statusBadge.text}
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoItem icon={<FaBook />} label="Exam Type" value={assignment.examType} />
                <InfoItem icon={<FaCalendarAlt />} label="Date" value={formatDate(assignment.examDate)} />
                <InfoItem icon={<FaClock />} label="Time" value={assignment.examTime} />
                <InfoItem icon={<FaClock />} label="Duration" value={assignment.duration} />
            </div>

            {/* Reference Materials */}
            {assignment.materials && assignment.materials.length > 0 && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <h4 className="text-sm font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                        <FaBook /> Reference Materials
                    </h4>
                    <div className="space-y-2">
                        {assignment.materials.map((material, index) => {
                            const fileName = material.split('/').pop();
                            // Ensure proper URL formatting
                            const baseUrl = API_BASE_URL.replace('/api/v1', '');
                            const fileUrl = `${baseUrl}${material.startsWith('/') ? '' : '/'}${material}`;

                            return (
                                <a
                                    key={index}
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-2 bg-white rounded border border-indigo-100 hover:border-indigo-300 transition text-sm text-gray-700 group"
                                >
                                    <span className="truncate pr-2 group-hover:text-indigo-600">{fileName}</span>
                                    <FaDownload className="text-indigo-400 group-hover:text-indigo-600" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Student Contact Info */}
            {assignment.studentId?.phone && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                        <strong>Contact:</strong> {assignment.studentId.phone}
                    </p>
                </div>
            )}
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

export default ActiveAssignments;
