import React from "react";
import { FaCalendarAlt, FaClock, FaBook, FaUser } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";

const mockAssignments = [
    {
        id: 1,
        student: "Sarah Johnson",
        subject: "Advanced Calculus",
        examType: "Final Exam",
        date: "Oct 25, 2024",
        time: "10:00 AM",
        duration: "3 Hours",
        status: "Upcoming",
    },
    {
        id: 2,
        student: "Mike Chen",
        subject: "Physics 101",
        examType: "Midterm",
        date: "Oct 27, 2024",
        time: "2:00 PM",
        duration: "2 Hours",
        status: "Upcoming",
    },
];

const ActiveAssignments = () => {
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <StatCard title="Total Active" value={mockAssignments.length} color="blue" />
                        <StatCard title="This Week" value="2" color="green" />
                        <StatCard title="This Month" value="5" color="orange" />
                    </div>

                    <div className="space-y-4">
                        {mockAssignments.map(assignment => (
                            <AssignmentCard key={assignment.id} assignment={assignment} />
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
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {assignment.status}
                </span>
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

export default ActiveAssignments;
