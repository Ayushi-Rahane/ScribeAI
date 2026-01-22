import React from "react";
import { FaClock } from "react-icons/fa";

const scheduleData = [
    {
        id: 1,
        month: "OCT",
        day: "24",
        title: "Physics Midterm",
        time: "10:00 AM - 1:00 PM",
    },
    {
        id: 2,
        month: "NOV",
        day: "02",
        title: "History Final",
        time: "2:00 PM - 5:00 PM",
    },
];

const UpcomingSchedule = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

            <h3 className="text-lg font-semibold text-[#111F35] mb-4">
                Upcoming Schedule
            </h3>

            <div className="space-y-4">
                {scheduleData.map((item) => (
                    <ScheduleCard key={item.id} {...item} />
                ))}
            </div>

        </div>
    );
};

const ScheduleCard = ({ month, day, title, time }) => {
    return (
        <div className="flex items-center gap-4 
      border border-gray-200 
      rounded-xl p-4 
      bg-white
      shadow-sm 
      hover:shadow-md 
      transition-all duration-200">

            {/* Date box */}
            <div className="w-14 h-16 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center shadow-sm">
                <span className="text-xs font-semibold text-[#F63049]">{month}</span>
                <span className="text-lg font-bold text-[#111F35]">{day}</span>
            </div>

            {/* Info */}
            <div>
                <p className="font-semibold text-[#111F35]">{title}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <FaClock className="text-gray-400" />
                    {time}
                </div>
            </div>

        </div>
    );
};

export default UpcomingSchedule;
