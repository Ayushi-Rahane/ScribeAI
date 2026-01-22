import React from "react";
import {
    FaBell,
    FaPlus
} from "react-icons/fa";
import StudentSidebar from "../../components/student/StudentSidebar";
import RecentActivity from "../../components/student/dashboard/RecentActivity";
import TipsCard from "../../components/student/dashboard/TipsCard";
import UpcomingSchedule from "../../components/student/dashboard/UpcomingSchedule";
import StatsCards from "../../components/student/dashboard/StatsCards";
import ActiveRequest from "../../components/student/dashboard/ActiveRequest";
const StudentDashboard = () => {
    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">

            {/* Sidebar */}
            <StudentSidebar />

            {/* Main */}
            <div className="flex-1 flex flex-col ml-64">

                {/* Topbar */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                    <h2 className="text-lg font-semibold">Dashboard</h2>

                    <div className="flex items-center gap-4">
                        <button className="bg-[#F63049] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            <FaPlus /> New Request
                        </button>
                        <FaBell className="text-gray-500" />
                    </div>
                </header>

                {/* Content */}
                <main className="p-6 space-y-6">

                    {/* Welcome */}
                    <div>
                        <h1 className="text-2xl font-bold text-[#111F35]">Dashboard</h1>
                        <p className="text-gray-500">Welcome back, John! Here's what's happening today.</p>
                    </div>

                    {/* Stats */}
                    <StatsCards />
                    {/* Main grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Active Request (Animated) */}
                        <ActiveRequest />

                        {/* Tips */}
                        <TipsCard />
                    </div>

                    {/* Bottom grid */}
                    <div className="grid grid-cols-3 gap-6 mt-6">
                        {/* Recent Activity – wider */}
                        <div className="col-span-2">
                            <RecentActivity />
                        </div>

                        {/* Upcoming Schedule – narrower */}
                        <div className="col-span-1">
                            <UpcomingSchedule />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

/* Components */

const SideItem = ({ icon, label, active }) => (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-sm
    ${active ? "bg-[#F63049] text-white" : "hover:bg-[#1c2e4a]"}
  `}>
        {icon} {label}
    </div>
);

const Stat = ({ title, value, note }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-xs text-gray-400">{note}</p>
    </div>
);

export default StudentDashboard;
