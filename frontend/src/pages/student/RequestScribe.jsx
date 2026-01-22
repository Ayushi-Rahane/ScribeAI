import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../components/student/StudentSidebar";
import ExamDetails from "../../components/student/requestScribe/ExamDetails";
import ScribeRequirements from "../../components/student/requestScribe/ScribeRequirements";
import ReviewStep from "../../components/student/requestScribe/ReviewStep";



const RequestScribe = () => {
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setShowSuccess(true);
        // Redirect to active requests after 2 seconds
        setTimeout(() => {
            navigate("/student/active");
        }, 2000);
    };


    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <StudentSidebar />

            <div className="flex-1 md:ml-64">

                {/* Top bar */}
                <div className="h-14 border-b bg-white flex items-center px-4 md:px-6 text-[#111F35] font-semibold">
                    Request Scribe
                </div>

                <div className="p-10">

                    {/* Center header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-[#111F35] mb-2">Request a Scribe</h1>
                        <p className="text-gray-500">
                            Fill in the details below to get matched with a verified volunteer.
                        </p>
                    </div>

                    {/* Stepper */}
                    <Stepper currentStep={step} />

                    {/* Conditional Step Rendering */}
                    {step === 1 && <ExamDetails setStep={setStep} />}
                    {step === 2 && <ScribeRequirements setStep={setStep} />}
                    {step === 3 && <ReviewStep setStep={setStep} onSubmit={handleSubmit} />}
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && <SuccessModal />}
        </div>
    );
};

/* ---------------- Components ---------------- */

const Stepper = ({ currentStep }) => {
    const steps = ["Exam Details", "Scribe Requirements", "Review"];

    return (
        <div className="flex items-center justify-center max-w-3xl mx-auto">

            {steps.map((label, index) => {
                const stepNum = index + 1;
                const isActive = currentStep === stepNum;
                const isCompleted = currentStep > stepNum;

                return (
                    <React.Fragment key={label}>
                        <div className="flex flex-col items-center">

                            <div
                                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold
                  ${isCompleted
                                        ? "bg-[#F63049] text-white"
                                        : isActive
                                            ? "bg-[#F63049] text-white"
                                            : "bg-gray-100 text-gray-400"
                                    }`}
                            >
                                {isCompleted ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    stepNum
                                )}
                            </div>

                            <span
                                className={`mt-2 text-sm ${isActive || isCompleted ? "text-[#F63049] font-medium" : "text-gray-400"
                                    }`}
                            >
                                {label}
                            </span>
                        </div>

                        {index !== steps.length - 1 && (
                            <div className={`w-28 h-[2px] mx-4 mb-6 ${isCompleted ? "bg-[#F63049]" : "bg-gray-200"
                                }`} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

const InputField = ({ label, placeholder, icon }) => (
    <div>
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
        <div className="relative">
            <input
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049]"
            />
            {icon && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </span>
            )}
        </div>
    </div>
);

const SelectField = ({ label }) => (
    <div>
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
        <div className="relative">
            <select className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F63049]">
                <option>Select type</option>
                <option>Midterm</option>
                <option>Final</option>
                <option>Quiz</option>
                <option>Assignment</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
        </div>
    </div>
);

const SuccessModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scaleIn">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            {/* Message */}
            <h3 className="text-2xl font-bold text-[#111F35] mb-2">Request Submitted!</h3>
            <p className="text-gray-600 mb-4">
                Your scribe request has been successfully submitted. We're notifying qualified volunteers now.
            </p>

            {/* Loading indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-[#F63049] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#F63049] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#F63049] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    </div>
);

export default RequestScribe;
