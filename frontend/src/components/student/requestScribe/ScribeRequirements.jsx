import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import SelectField from "../SelectField";

const languages = ["English", "Spanish", "French", "German", "Mandarin", "Hindi", "Arabic"];

const ScribeRequirements = ({ setStep }) => {
    const [allowRecording, setAllowRecording] = useState(false);

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="border-t-4 border-[#F63049] p-8">

                <h3 className="font-semibold text-[#111F35] mb-6">Scribe Requirements</h3>

                <div className="space-y-6">

                    {/* Preferred Language */}
                    <SelectField label="Preferred Language" options={languages} defaultOption="English" />

                    {/* Required Subject Expertise */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Required Subject Expertise</label>
                        <input
                            placeholder="Mathematics / STEM"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                        />
                    </div>

                    {/* Specific Requirements */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Specific Requirements</label>
                        <textarea
                            placeholder="E.g., Need someone familiar with scientific notation, or need slow dictation support."
                            rows={4}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049] resize-none"
                        />
                    </div>

                    {/* Recording Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="recording"
                            checked={allowRecording}
                            onChange={(e) => setAllowRecording(e.target.checked)}
                            className="w-4 h-4 accent-[#F63049] cursor-pointer"
                        />
                        <label htmlFor="recording" className="text-sm text-gray-600 cursor-pointer">
                            I allow the session to be recorded for quality assurance
                        </label>
                    </div>

                </div>

            </div>

            {/* Footer buttons */}
            <div className="flex justify-between items-center px-8 py-5 border-t bg-[#FAFBFD]">

                <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <FaArrowLeft />
                    Back
                </button>

                <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 bg-[#F63049] text-white px-6 py-2 rounded-lg hover:bg-[#e12a40] transition"
                >
                    Next
                    <FaArrowRight />
                </button>

            </div>

        </div>
    );
};

export default ScribeRequirements;
