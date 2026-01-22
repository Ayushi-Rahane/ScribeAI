import React from "react";
import { FaArrowUp, FaEllipsisH } from "react-icons/fa";

const statsData = [
    {
        id: 1,
        title: "Total Requests",
        value: "12",
        subtitle: "+2 this month",
        type: "up",
    },
    {
        id: 2,
        title: "Upcoming Exams",
        value: "3",
        subtitle: "Next in 2 days",
        type: "menu",
    },
    {
        id: 3,
        title: "Hours Saved",
        value: "24h",
        subtitle: "Total scribe time",
        type: "up",
    },
    {
        id: 4,
        title: "Avg. Rating",
        value: "4.9",
        subtitle: "Based on feedback",
        type: "up",
    },
];

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat) => (
                <StatCard key={stat.id} {...stat} />
            ))}
        </div>
    );
};

const StatCard = ({ title, value, subtitle, type }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500 font-medium">{title}</p>

                {type === "up" && (
                    <span className="bg-green-100 text-green-600 p-1.5 rounded-full">
                        <FaArrowUp size={12} />
                    </span>
                )}

                {type === "menu" && (
                    <span className="text-gray-400">
                        <FaEllipsisH />
                    </span>
                )}
            </div>

            {/* Value */}
            <h2 className="text-3xl font-bold text-[#111F35] mb-1">{value}</h2>

            {/* Subtitle */}
            <p className="text-sm text-gray-500">{subtitle}</p>

        </div>
    );
};

export default StatsCards;
