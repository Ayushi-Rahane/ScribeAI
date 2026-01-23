import React, { useState } from "react";
import { FaSave, FaMapMarkerAlt, FaClock, FaBook, FaLanguage } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";

const VolunteerProfile = () => {
    const [showToast, setShowToast] = useState(false);

    // Availability state
    const [availability, setAvailability] = useState({
        monday: { morning: false, afternoon: false, evening: false },
        tuesday: { morning: false, afternoon: false, evening: false },
        wednesday: { morning: false, afternoon: false, evening: false },
        thursday: { morning: false, afternoon: false, evening: false },
        friday: { morning: false, afternoon: false, evening: false },
        saturday: { morning: true, afternoon: true, evening: false },
        sunday: { morning: true, afternoon: false, evening: false },
    });

    const [skills, setSkills] = useState({
        subjects: ["Mathematics", "Physics"],
        languages: ["English", "Hindi"],
    });

    const [location, setLocation] = useState({
        city: "Mumbai",
        state: "Maharashtra",
        remoteAvailable: true,
    });

    const handleSave = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const toggleAvailability = (day, period) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [period]: !prev[day][period]
            }
        }));
    };

    const addSkill = (type, skill) => {
        if (skill && !skills[type].includes(skill)) {
            setSkills(prev => ({
                ...prev,
                [type]: [...prev[type], skill]
            }));
        }
    };

    const removeSkill = (type, skill) => {
        setSkills(prev => ({
            ...prev,
            [type]: prev[type].filter(s => s !== skill)
        }));
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <VolunteerSidebar />

            <div className="flex-1 md:ml-64">
                {/* Top Bar */}
                <div className="h-14 border-b bg-white flex items-center px-4 md:px-6 text-[#111F35] font-semibold">
                    <span className="pl-12 md:pl-0">Volunteer Profile</span>
                </div>

                <div className="p-4 md:p-10 max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-[#111F35] mb-6">My Profile</h1>

                    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-8">
                        {/* Personal Information */}
                        <section>
                            <h2 className="text-lg font-semibold text-[#111F35] mb-4 flex items-center gap-2">
                                <FaBook className="text-[#F63049]" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Full Name" type="text" defaultValue="Volunteer Name" />
                                <InputField label="Email Address" type="email" defaultValue="volunteer@example.com" />
                                <InputField label="Phone Number" type="tel" defaultValue="+91 9876543210" />
                                <InputField label="Date of Birth" type="date" defaultValue="1995-01-01" />
                            </div>
                        </section>

                        {/* Location Settings */}
                        <section>
                            <h2 className="text-lg font-semibold text-[#111F35] mb-4 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-[#F63049]" />
                                Location
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    label="City"
                                    type="text"
                                    value={location.city}
                                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                                />
                                <InputField
                                    label="State"
                                    type="text"
                                    value={location.state}
                                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                                />
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={location.remoteAvailable}
                                            onChange={(e) => setLocation({ ...location, remoteAvailable: e.target.checked })}
                                            className="w-4 h-4 text-[#F63049] rounded focus:ring-[#F63049]"
                                        />
                                        <span className="text-sm text-gray-700">Available for remote volunteering</span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h2 className="text-lg font-semibold text-[#111F35] mb-4 flex items-center gap-2">
                                <FaBook className="text-[#F63049]" />
                                Skills & Expertise
                            </h2>

                            {/* Subjects */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {skills.subjects.map(subject => (
                                        <span key={subject} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                                            {subject}
                                            <button onClick={() => removeSkill('subjects', subject)} className="hover:text-blue-900">×</button>
                                        </span>
                                    ))}
                                </div>
                                <select
                                    onChange={(e) => {
                                        addSkill('subjects', e.target.value);
                                        e.target.value = '';
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F63049] focus:border-transparent"
                                >
                                    <option value="">Add a subject...</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Chemistry">Chemistry</option>
                                    <option value="Biology">Biology</option>
                                    <option value="English">English</option>
                                    <option value="History">History</option>
                                    <option value="Computer Science">Computer Science</option>
                                </select>
                            </div>

                            {/* Languages */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <FaLanguage /> Languages
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {skills.languages.map(language => (
                                        <span key={language} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
                                            {language}
                                            <button onClick={() => removeSkill('languages', language)} className="hover:text-green-900">×</button>
                                        </span>
                                    ))}
                                </div>
                                <select
                                    onChange={(e) => {
                                        addSkill('languages', e.target.value);
                                        e.target.value = '';
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F63049] focus:border-transparent"
                                >
                                    <option value="">Add a language...</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="Tamil">Tamil</option>
                                    <option value="Telugu">Telugu</option>
                                    <option value="Bengali">Bengali</option>
                                </select>
                            </div>
                        </section>

                        {/* Availability Settings */}
                        <section>
                            <h2 className="text-lg font-semibold text-[#111F35] mb-4 flex items-center gap-2">
                                <FaClock className="text-[#F63049]" />
                                Availability Schedule
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Day</th>
                                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Morning<br />(8AM-12PM)</th>
                                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Afternoon<br />(12PM-5PM)</th>
                                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Evening<br />(5PM-9PM)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(availability).map(day => (
                                            <tr key={day} className="border-t">
                                                <td className="px-4 py-3 text-sm font-medium text-gray-700 capitalize">{day}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={availability[day].morning}
                                                        onChange={() => toggleAvailability(day, 'morning')}
                                                        className="w-5 h-5 text-[#F63049] rounded focus:ring-[#F63049] cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={availability[day].afternoon}
                                                        onChange={() => toggleAvailability(day, 'afternoon')}
                                                        className="w-5 h-5 text-[#F63049] rounded focus:ring-[#F63049] cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={availability[day].evening}
                                                        onChange={() => toggleAvailability(day, 'evening')}
                                                        className="w-5 h-5 text-[#F63049] rounded focus:ring-[#F63049] cursor-pointer"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                className="bg-[#F63049] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d9283f] transition flex items-center gap-2"
                            >
                                <FaSave />
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Success Toast */}
                    {showToast && (
                        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideIn">
                            <FaSave />
                            Profile updated successfully!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, type, value, defaultValue, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F63049] focus:border-transparent"
            />
        </div>
    );
};

export default VolunteerProfile;
