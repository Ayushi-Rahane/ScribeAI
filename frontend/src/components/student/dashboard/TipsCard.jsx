import React from "react";
import { FaBookOpen } from "react-icons/fa";

const TipsCard = () => {
    return (
        <div className="bg-[#F63049] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-full">

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <FaBookOpen className="text-xl" />
                <h3 className="text-lg font-semibold">Tips</h3>
            </div>

            {/* Content */}
            <p className="text-sm leading-relaxed mb-6 opacity-95">
                Did you know? You can upload your reference material ahead of time to
                help your scribe prepare better.
            </p>

            {/* Button */}
            <button className="bg-white text-[#F63049] font-medium py-2.5 rounded-xl hover:bg-gray-100 transition">
                Upload Materials
            </button>

        </div>
    );
};

export default TipsCard;
