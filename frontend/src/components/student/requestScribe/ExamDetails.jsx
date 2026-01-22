
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";

const durations = ["1 Hour", "2 Hours", "3 Hours", "4 Hours"];
const ExamDetails = ({ setStep }) => {
    const [selectedDuration, setSelectedDuration] = useState(null);
    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="border-t-4 border-[#F63049] p-8">

                <h3 className="font-semibold text-[#111F35] mb-6">Exam Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InputField label="Subject / Course Name" placeholder="e.g. Advanced Calculus II" />
                    <SelectField label="Exam Type" />

                    {/* Date */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                        />
                    </div>

                    {/* Time */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Time</label>
                        <input
                            type="time"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                        />
                    </div>

                </div>

                {/* Duration */}
                <div className="mt-8">
                    <p className="text-sm font-medium text-gray-600 mb-3">Duration (Hours)</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {durations.map((d) => (
                            <button
                                key={d}
                                onClick={() => setSelectedDuration(d)}
                                className={`border rounded-xl py-3 text-sm font-medium transition
                                ${selectedDuration === d
                                        ? "border-[#F63049] bg-red-50 text-[#F63049]"
                                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Footer buttons */}
            <div className="flex justify-between items-center px-8 py-5 border-t bg-[#FAFBFD]">

                <button className="flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-100 transition">
                    <FaArrowLeft />
                    Back
                </button>

                <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 bg-[#F63049] text-white px-6 py-2 rounded-lg hover:bg-[#e12a40] transition"
                >
                    Next
                    <FaArrowRight />
                </button>

            </div>

        </div>
    );
};

export default ExamDetails;