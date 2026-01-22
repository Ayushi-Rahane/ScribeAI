import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";

const ReviewStep = ({ setStep, onSubmit }) => {
    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="border-t-4 border-[#F63049] p-8">

                <h3 className="font-semibold text-[#111F35] mb-6">Review</h3>

                {/* Exam Summary */}
                <div className="mb-8">
                    <h4 className="font-semibold text-[#111F35] mb-4">Exam Summary</h4>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Subject</p>
                            <p className="text-sm text-[#111F35]">Advanced Calculus II</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 mb-1">Type</p>
                            <p className="text-sm text-[#111F35]">Final Exam</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                            <p className="text-sm text-[#111F35]">Oct 24, 2024 at 10:00 AM</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 mb-1">Duration</p>
                            <p className="text-sm text-[#111F35]">3 Hours</p>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="mb-8">
                    <h4 className="font-semibold text-[#111F35] mb-4">Preferences</h4>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Language</p>
                            <p className="text-sm text-[#111F35]">English</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 mb-1">Expertise</p>
                            <p className="text-sm text-[#111F35]">Mathematics / STEM</p>
                        </div>
                    </div>
                </div>

                {/* Notice */}
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <FaInfoCircle className="text-[#F63049] mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">
                        By submitting this request, you agree to our code of conduct. Our system will immediately start notifying eligible volunteers.
                    </p>
                </div>

            </div>

            {/* Footer buttons */}
            <div className="flex justify-between items-center px-8 py-5 border-t bg-[#FAFBFD]">

                <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <FaArrowLeft />
                    Back
                </button>

                <button
                    onClick={onSubmit}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                >
                    Submit Request
                </button>

            </div>

        </div>
    );
};

export default ReviewStep;
