import React, { useState, useEffect } from "react";
import { FaSave, FaMapMarkerAlt, FaClock, FaBook, FaLanguage, FaMoneyBillWave, FaUser } from "react-icons/fa";
import VolunteerSidebar from "../../components/volunteer/VolunteerSidebar";
import volunteerService from "../../services/volunteerService";

const VolunteerProfile = () => {
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);

    // Personal information state
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        phone: '',
        dateOfBirth: '',
        volunteerType: 'free',
        hourlyRate: 0
    });

    // Availability state
    const [availability, setAvailability] = useState({
        monday: { morning: false, afternoon: false, evening: false },
        tuesday: { morning: false, afternoon: false, evening: false },
        wednesday: { morning: false, afternoon: false, evening: false },
        thursday: { morning: false, afternoon: false, evening: false },
        friday: { morning: false, afternoon: false, evening: false },
        saturday: { morning: false, afternoon: false, evening: false },
        sunday: { morning: false, afternoon: false, evening: false },
    });

    const [skills, setSkills] = useState({
        subjects: [],
        languages: [],
    });

    const [location, setLocation] = useState({
        city: "",
        state: "",
        remoteAvailable: false,
    });

    // Fetch profile data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await volunteerService.getProfile();
                setProfile(data);

                // Populate form fields with fetched data
                if (data) {
                    setPersonalInfo({
                        fullName: data.fullName || '',
                        phone: data.phone || '',
                        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                        volunteerType: data.volunteerType || 'free',
                        hourlyRate: data.hourlyRate || 0
                    });

                    setLocation({
                        city: data.city || '',
                        state: data.state || '',
                        remoteAvailable: data.remoteAvailable || false
                    });

                    setSkills({
                        subjects: data.subjects || [],
                        languages: data.languages || []
                    });

                    setAvailability(data.availability || {
                        monday: { morning: false, afternoon: false, evening: false },
                        tuesday: { morning: false, afternoon: false, evening: false },
                        wednesday: { morning: false, afternoon: false, evening: false },
                        thursday: { morning: false, afternoon: false, evening: false },
                        friday: { morning: false, afternoon: false, evening: false },
                        saturday: { morning: false, afternoon: false, evening: false },
                        sunday: { morning: false, afternoon: false, evening: false }
                    });
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            const updates = {
                ...personalInfo,
                ...location,
                subjects: skills.subjects,
                languages: skills.languages,
                availability
            };

            await volunteerService.updateProfile(updates);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.message);
        }
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
                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F63049]"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                            <p className="font-medium">Error loading profile</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {!loading && (
                        <>
                            <h1 className="text-2xl font-bold text-[#111F35] mb-6">My Profile</h1>

                            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-8">
                                {/* Profile Picture Section */}
                                <section>
                                    <h2 className="text-lg font-semibold text-[#111F35] mb-4 flex items-center gap-2">
                                        <FaUser className="text-[#F63049]" />
                                        Profile Picture
                                    </h2>
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F63049] to-[#d9283f] text-white flex items-center justify-center text-3xl font-semibold overflow-hidden">
                                            <img
                                                src="https://via.placeholder.com/150"
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <label className="bg-[#F63049] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d9283f] transition cursor-pointer inline-block">
                                                Upload Photo
                                                <input type="file" accept="image/*" className="hidden" />
                                            </label>
                                            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Personal Information */}
                                <section>
                                    <h2 className="text-lg font-semibold text-[#111F35] mb-4 flex items-center gap-2">
                                        <FaBook className="text-[#F63049]" />
                                        Personal Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            label="Full Name"
                                            type="text"
                                            value={personalInfo.fullName}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                                        />
                                        <InputField
                                            label="Email Address"
                                            type="email"
                                            value={JSON.parse(localStorage.getItem('user') || '{}').email || ''}
                                            disabled={true}
                                        />
                                        <InputField
                                            label="Phone Number"
                                            type="tel"
                                            value={personalInfo.phone}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                        />
                                        <InputField
                                            label="Date of Birth"
                                            type="date"
                                            value={personalInfo.dateOfBirth}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                                        />
                                    </div>
                                </section>

                                {/* Payment Preferences */}
                                <section>
                                    <h2 className="text-lg font-semibold text-[#111F35] mb-4 flex items-center gap-2">
                                        <FaMoneyBillWave className="text-[#F63049]" />
                                        Volunteering Preferences
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Volunteering Type</label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="volunteerType"
                                                        value="free"
                                                        checked={personalInfo.volunteerType === 'free'}
                                                        onChange={(e) => setPersonalInfo({ ...personalInfo, volunteerType: e.target.value })}
                                                        className="w-4 h-4 text-[#F63049] focus:ring-[#F63049]"
                                                    />
                                                    <span className="text-sm text-gray-700">Free (Volunteer)</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="volunteerType"
                                                        value="paid"
                                                        checked={personalInfo.volunteerType === 'paid'}
                                                        onChange={(e) => setPersonalInfo({ ...personalInfo, volunteerType: e.target.value })}
                                                        className="w-4 h-4 text-[#F63049] focus:ring-[#F63049]"
                                                    />
                                                    <span className="text-sm text-gray-700">Paid Service</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Hourly Rate (₹)
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter hourly rate (e.g., 200)"
                                                value={personalInfo.hourlyRate}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, hourlyRate: Number(e.target.value) })}
                                                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F63049] focus:border-transparent"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Leave blank if volunteering for free</p>
                                        </div>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, type, value, defaultValue, onChange, disabled }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={disabled}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F63049] focus:border-transparent ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
        </div>
    );
};

export default VolunteerProfile;
