import React from "react";
import { FaStar, FaAward, FaCertificate, FaTrophy } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";

const RatingsCertificates = () => {
    const ratings = [
        { student: "John Doe", rating: 5, comment: "Excellent volunteer! Very helpful and patient.", date: "Oct 20, 2024" },
        { student: "Sarah Johnson", rating: 5, comment: "Great assistance during my exam.", date: "Oct 18, 2024" },
        { student: "Mike Chen", rating: 4, comment: "Very professional and supportive.", date: "Oct 15, 2024" },
    ];

    const achievements = [
        { title: "Bronze Volunteer", description: "Completed 10 assignments", icon: <FaAward className="text-orange-600" /> },
        { title: "5-Star Rated", description: "Maintained 4.8+ rating", icon: <FaStar className="text-yellow-500" /> },
        { title: "Certified Scribe", description: "Completed training program", icon: <FaCertificate className="text-blue-600" /> },
    ];

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <VolunteerSidebar />

            <div className="flex-1 md:ml-64">
                <div className="h-14 border-b bg-white flex items-center px-4 md:px-6 text-[#111F35] font-semibold">
                    <span className="pl-12 md:pl-0">Ratings & Certificates</span>
                </div>

                <div className="p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#111F35] mb-1">Ratings & Achievements</h1>
                        <p className="text-gray-500">Your performance and certifications</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <StatCard title="Average Rating" value="4.8" icon={<FaStar />} color="yellow" />
                        <StatCard title="Total Reviews" value="24" icon={<FaStar />} color="blue" />
                        <StatCard title="Achievements" value="3" icon={<FaTrophy />} color="orange" />
                        <StatCard title="Certificates" value="1" icon={<FaCertificate />} color="green" />
                    </div>

                    {/* Achievements */}
                    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                        <h3 className="text-lg font-semibold text-[#111F35] mb-4">Achievements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {achievements.map((achievement, idx) => (
                                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="text-3xl mb-2">{achievement.icon}</div>
                                    <h4 className="font-semibold text-[#111F35] mb-1">{achievement.title}</h4>
                                    <p className="text-sm text-gray-500">{achievement.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Ratings */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-[#111F35] mb-4">Recent Ratings</h3>
                        <div className="space-y-4">
                            {ratings.map((rating, idx) => (
                                <RatingCard key={idx} rating={rating} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => {
    const colorMap = {
        yellow: "bg-yellow-50 text-yellow-600",
        blue: "bg-blue-50 text-blue-600",
        orange: "bg-orange-50 text-orange-600",
        green: "bg-green-50 text-green-600",
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

const RatingCard = ({ rating }) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h4 className="font-semibold text-[#111F35]">{rating.student}</h4>
                    <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < rating.rating ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                    </div>
                </div>
                <span className="text-xs text-gray-500">{rating.date}</span>
            </div>
            <p className="text-sm text-gray-600 italic">"{rating.comment}"</p>
        </div>
    );
};

export default RatingsCertificates;
