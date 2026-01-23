import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaCheckCircle, FaClock, FaStar, FaClipboardList } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";

const VolunteerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <VolunteerSidebar />

            <div className="flex-1 md:ml-64">
                {/* Topbar */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
                    <h2 className="text-lg font-semibold pl-12 md:pl-0">Volunteer Dashboard</h2>
                    <div className="flex items-center gap-3 md:gap-4">
                        <FaBell className="text-gray-500 cursor-pointer" />
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 md:p-6 space-y-4 md:space-y-6">
                    {/* Welcome */}
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-[#111F35]">Welcome Back, Volunteer!</h1>
                        <p className="text-sm md:text-base text-gray-500">Here's your volunteering overview</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            icon={<FaClipboardList />}
                            title="Total Requests"
                            value="24"
                            color="blue"
                        />
                        <StatCard
                            icon={<FaCheckCircle />}
                            title="Active Assignments"
                            value="3"
                            color="green"
                        />
                        <StatCard
                            icon={<FaClock />}
                            title="Pending Requests"
                            value="5"
                            color="orange"
                        />
                        <StatCard
                            icon={<FaStar />}
                            title="Average Rating"
                            value="4.8"
                            color="yellow"
                        />
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-[#111F35] mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            <ActivityItem
                                title="New request from John Doe"
                                time="2 hours ago"
                                type="new"
                            />
                            <ActivityItem
                                title="Completed assignment for Physics Exam"
                                time="1 day ago"
                                type="completed"
                            />
                            <ActivityItem
                                title="Received 5-star rating"
                                time="2 days ago"
                                type="rating"
                            />
                        </div>
                    </div>

                    {/* Upcoming Assignments */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-[#111F35] mb-4">Upcoming Assignments</h3>
                        <div className="space-y-3">
                            <AssignmentCard
                                subject="Advanced Calculus"
                                student="Sarah Johnson"
                                date="Oct 25, 2024"
                                time="10:00 AM"
                            />
                            <AssignmentCard
                                subject="Physics 101"
                                student="Mike Chen"
                                date="Oct 27, 2024"
                                time="2:00 PM"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => {
    const colorMap = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
        yellow: "bg-yellow-50 text-yellow-600",
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${colorMap[color]} flex items-center justify-center mb-3`}>
                {icon}
            </div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-[#111F35]">{value}</h3>
        </div>
    );
};

const ActivityItem = ({ title, time, type }) => {
    const typeColors = {
        new: "bg-blue-100 text-blue-600",
        completed: "bg-green-100 text-green-600",
        rating: "bg-yellow-100 text-yellow-600",
    };

    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${typeColors[type]}`}></div>
            <div className="flex-1">
                <p className="text-sm font-medium text-[#111F35]">{title}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    );
};

const AssignmentCard = ({ subject, student, date, time }) => {
    return (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div>
                <h4 className="font-semibold text-[#111F35]">{subject}</h4>
                <p className="text-sm text-gray-500">Student: {student}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-[#111F35]">{date}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    );
};

export default VolunteerDashboard;
