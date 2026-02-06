import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";

const ReviewStep = ({ setStep, onSubmit, formData, loading }) => {
    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "Not set";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Format time for display
    const formatTime = (timeString) => {
        if (!timeString) return "Not set";
        return timeString;
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="border-t-4 border-[#F63049] p-8">
                <h3 className="font-semibold text-[#111F35] mb-6">Review Your Request</h3>

                {/* Exam Summary */}
                <div className="mb-8">
                    <h4 className="font-semibold text-[#111F35] mb-4">Exam Summary</h4>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Subject</p>
                            <p className="text-sm text-[#111F35]">{formData.subject || "Not set"}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 mb-1">Type</p>
                            <p className="text-sm text-[#111F35]">{formData.examType || "Not set"}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 mb-1">Date & Time</p>
                            <p className="text-sm text-[#111F35]">
                                {formatDate(formData.examDate)} at {formatTime(formData.examTime)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 mb-1">Duration</p>
                            <p className="text-sm text-[#111F35]">{formData.duration || "Not set"}</p>
                        </div>
                    </div>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                    <h4 className="font-semibold text-[#111F35] mb-4">Requirements</h4>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {formData.requirements || "No requirements specified"}
                        </p>
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
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 border border-gray-300 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
                    disabled={loading}
                >
                    <FaArrowLeft />
                    Back
                </button>

                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={loading}
                    className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        'Submit Request'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ReviewStep;
