import React, { useState } from "react";
import StudentSidebar from "../../components/student/StudentSidebar";

const Profile = () => {
    const [showToast, setShowToast] = useState(false);

    const handleSave = () => {
        // Here you would typically make an API call to save the data
        // For now, we'll just show the success message
        setShowToast(true);

        // Hide the toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <StudentSidebar />

            <div className="flex-1 md:ml-64">

                {/* Top Bar */}
                <div className="h-14 border-b bg-white flex items-center px-4 md:px-6 text-[#111F35] font-semibold">
                    Profile
                </div>

                <div className="p-4 md:p-10 max-w-6xl mx-auto">

                    <h1 className="text-2xl font-bold text-[#111F35] mb-6">My Profile</h1>

                    {/* Profile Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                        {/* Avatar Section */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-[#F63049] text-white flex items-center justify-center text-2xl font-semibold">
                                JD
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-[#111F35]">John Doe</h2>
                                <p className="text-gray-500 text-sm">Student Account</p>

                                <button className="mt-2 text-sm text-[#F63049] font-medium hover:underline">
                                    Change Photo
                                </button>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-[#111F35] mb-4 pb-2 border-b">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Full Name" value="John Doe" />
                                <Input label="Email Address" value="john@example.com" />
                                <Input label="Phone Number" value="+91 9876543210" />
                                <Input label="Date of Birth" type="date" value="2000-05-15" />
                                <Input label="University / College" value="ABC University" />
                                <Input label="Course / Program" value="B.Tech Computer Engineering" />
                            </div>
                        </div>

                        {/* Disability Information */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-[#111F35] mb-4 pb-2 border-b">Disability Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label="Type of Disability"
                                    options={[
                                        "Visual Impairment",
                                        "Hearing Impairment",
                                        "Motor Disability",
                                        "Learning Disability",
                                        "Multiple Disabilities",
                                        "Other"
                                    ]}
                                />
                                <Input label="Disability Certificate Number" value="DIS/2024/12345" />

                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600 mb-1">Specific Needs / Accommodations Required</label>
                                    <textarea
                                        defaultValue="Need someone to read questions aloud and write answers as dictated. Prefer slow and clear dictation."
                                        rows={3}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049] resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Academic Requirements */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-[#111F35] mb-4 pb-2 border-b">Academic Requirements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Current Year / Semester" value="3rd Year, 5th Semester" />
                                <Select
                                    label="Exam Type Frequency"
                                    options={["Weekly", "Monthly", "Quarterly", "Semester-wise"]}
                                />

                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600 mb-1">Preferred Subjects</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {["Mathematics", "Physics", "Computer Science", "Chemistry"].map((subject) => (
                                            <span
                                                key={subject}
                                                className="px-3 py-1.5 bg-red-50 text-[#F63049] rounded-lg text-sm border border-red-200"
                                            >
                                                {subject}
                                                <button className="ml-2 text-red-400 hover:text-red-600">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        placeholder="Type a subject and press Enter to add"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600 mb-1">Additional Academic Notes</label>
                                    <textarea
                                        defaultValue="Prefer scribes with background in STEM subjects. Need extra time for mathematical calculations."
                                        rows={3}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049] resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-[#111F35] mb-4 pb-2 border-b">Communication Preferences</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label="Preferred Language"
                                    options={["English", "Hindi", "Marathi", "Tamil", "Telugu"]}
                                />
                                <Select
                                    label="Notification Method"
                                    options={["Email", "SMS", "WhatsApp", "All"]}
                                />
                                <Select
                                    label="Preferred Time for Sessions"
                                    options={["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-10PM)", "Flexible"]}
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end gap-3">
                            <button className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition">
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-[#F63049] text-white px-6 py-2.5 rounded-lg hover:bg-[#e12a40] transition"
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* Success Toast Notification */}
            {showToast && (
                <div className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Profile updated successfully!</span>
                </div>
            )}
        </div>
    );
};

/* ---------------- Reusable Components ---------------- */

const Input = ({ label, value, type = "text" }) => (
    <div>
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
        <input
            type={type}
            defaultValue={value}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F63049]"
        />
    </div>
);

const Select = ({ label, options }) => (
    <div>
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F63049]">
            {options.map((o) => (
                <option key={o}>{o}</option>
            ))}
        </select>
    </div>
);

export default Profile;
