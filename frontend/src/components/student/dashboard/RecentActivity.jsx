import React from "react";
import { FaCheckCircle, FaInfoCircle, FaPlus } from "react-icons/fa";

const activities = [
    {
        id: 1,
        type: "confirmed",
        title: "Request Confirmed",
        desc: "Physics 101 scribe assigned",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "message",
        title: "New Message",
        desc: "Volunteer Sarah sent a message",
        time: "5 hours ago",
    },
    {
        id: 3,
        type: "created",
        title: "Request Created",
        desc: "Calculus II exam request",
        time: "Yesterday",
    },
];

const iconMap = {
    confirmed: {
        icon: <FaCheckCircle />,
        color: "text-green-500",
        bg: "bg-green-50",
    },
    message: {
        icon: <FaInfoCircle />,
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    created: {
        icon: <FaPlus />,
        color: "text-red-500",
        bg: "bg-red-50",
    },
};

const RecentActivity = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

            <h3 className="text-lg font-semibold text-[#111F35] mb-4">
                Recent Activity
            </h3>

            <div className="divide-y divide-gray-200">
                {activities.map((item) => (
                    <ActivityRow key={item.id} {...item} />
                ))}
            </div>

        </div>
    );
};

const ActivityRow = ({ type, title, desc, time }) => {
    const { icon, color, bg } = iconMap[type];

    return (
        <div className="flex items-center justify-between py-4">

            <div className="flex items-center gap-4">

                {/* Icon */}
                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 ${bg}`}
                >
                    <span className={`${color} text-lg`}>{icon}</span>
                </div>

                {/* Text */}
                <div>
                    <p className="font-semibold text-[#111F35]">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                </div>

            </div>

            {/* Time */}
            <span className="text-sm text-gray-400">{time}</span>

        </div>
    );
};

export default RecentActivity;
