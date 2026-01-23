import React from "react";
import { FaCalendarAlt, FaClock, FaBook, FaStar } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";

const mockHistory = [
    {
        id: 1,
        student: "John Doe",
        subject: "Mathematics",
        examType: "Final Exam",
        date: "Oct 15, 2024",
        time: "10:00 AM",
        duration: "3 Hours",
        rating: 5,
        status: "Completed",
    },
    {
        id: 2,
        student: "Sarah Johnson",
        subject: "Physics",
        examType: "Midterm",
        date: "Oct 10, 2024",
        time: "2:00 PM",
        duration: "2 Hours",
        rating: 5,
        status: "Completed",
    },
    {
        id: 3,
        student: "Mike Chen",
        subject: "Chemistry",
        examType: "Quiz",
        date: "Oct 5, 2024",
        time: "11:00 AM",
        duration: "1 Hour",
        rating: 4,
        status: "Completed",
    },
];

const VolunteerHistory = () => {
    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <VolunteerSidebar />

            <div className="flex-1 md:ml-64">
                <div className="h-14 border-b bg-white flex items-center px-4 md:px-6 text-[#111F35] font-semibold">
                    <span className="pl-12 md:pl-0">Volunteer History</span>
                </div>

                <div className="p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#111F35] mb-1">Assignment History</h1>
                        <p className="text-gray-500">Your completed volunteering assignments</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <StatCard title="Total Completed" value={mockHistory.length} color="blue" />
                        <StatCard title="This Month" value="3" color="green" />
                        <StatCard title="Average Rating" value="4.7" color="yellow" />
                    </div>

                    {/* History List */}
                    <div className="space-y-4">
                        {mockHistory.map(assignment => (
                            <HistoryCard key={assignment.id} assignment={assignment} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color }) => {
    const colorMap = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        yellow: "bg-yellow-50 text-yellow-600",
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className={`text-3xl font-bold ${colorMap[color]}`}>{value}</h3>
        </div>
    );
};

const HistoryCard = ({ assignment }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#F63049] text-white flex items-center justify-center font-semibold">
                        {assignment.student.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#111F35]">{assignment.subject}</h3>
                        <p className="text-sm text-gray-500">Student: {assignment.student}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {assignment.status}
                    </span>
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span className="text-sm font-semibold">{assignment.rating}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoItem icon={<FaBook />} label="Exam Type" value={assignment.examType} />
                <InfoItem icon={<FaCalendarAlt />} label="Date" value={assignment.date} />
                <InfoItem icon={<FaClock />} label="Time" value={assignment.time} />
                <InfoItem icon={<FaClock />} label="Duration" value={assignment.duration} />
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

export default VolunteerHistory;
