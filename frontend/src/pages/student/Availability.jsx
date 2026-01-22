import React, { useState } from "react";
import StudentSidebar from "../../components/student/StudentSidebar";
import { FaStar, FaEnvelope, FaPhone, FaWhatsapp, FaFilter, FaSearch } from "react-icons/fa";

const Availability = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSubject, setFilterSubject] = useState("All");
    const [filterLanguage, setFilterLanguage] = useState("All");

    // Mock data for available volunteers
    const volunteers = [
        {
            id: 1,
            name: "Priya Sharma",
            rating: 4.8,
            totalReviews: 45,
            subjects: ["Mathematics", "Physics", "Chemistry"],
            languages: ["English", "Hindi"],
            availability: "Mon-Fri: 9AM-5PM",
            experience: "3 years",
            email: "priya.sharma@example.com",
            phone: "+91 9876543210",
            whatsapp: "+91 9876543210",
            avatar: "PS",
            color: "bg-purple-500",
            isPaid: false,
            tasksCompleted: 28,
            hoursVolunteered: 84
        },
        {
            id: 2,
            name: "Rahul Verma",
            rating: 4.9,
            totalReviews: 62,
            subjects: ["Computer Science", "Mathematics"],
            languages: ["English", "Hindi", "Marathi"],
            availability: "Mon-Sat: 10AM-6PM",
            experience: "5 years",
            email: "rahul.verma@example.com",
            phone: "+91 9876543211",
            whatsapp: "+91 9876543211",
            avatar: "RV",
            color: "bg-blue-500",
            isPaid: true,
            ratePerHour: 150,
            tasksCompleted: 65,
            hoursVolunteered: 195
        },
        {
            id: 3,
            name: "Anjali Patel",
            rating: 4.7,
            totalReviews: 38,
            subjects: ["Biology", "Chemistry", "English"],
            languages: ["English", "Gujarati"],
            availability: "Tue-Sat: 11AM-7PM",
            experience: "2 years",
            email: "anjali.patel@example.com",
            phone: "+91 9876543212",
            whatsapp: "+91 9876543212",
            avatar: "AP",
            color: "bg-green-500",
            isPaid: false,
            tasksCompleted: 15,
            hoursVolunteered: 45
        },
        {
            id: 4,
            name: "Vikram Singh",
            rating: 5.0,
            totalReviews: 28,
            subjects: ["Physics", "Mathematics", "Computer Science"],
            languages: ["English", "Hindi"],
            availability: "Mon-Fri: 2PM-8PM",
            experience: "4 years",
            email: "vikram.singh@example.com",
            phone: "+91 9876543213",
            whatsapp: "+91 9876543213",
            avatar: "VS",
            color: "bg-red-500",
            isPaid: true,
            ratePerHour: 200,
            tasksCompleted: 52,
            hoursVolunteered: 156
        },
        {
            id: 5,
            name: "Sneha Reddy",
            rating: 4.6,
            totalReviews: 51,
            subjects: ["English", "History", "Political Science"],
            languages: ["English", "Telugu", "Hindi"],
            availability: "Mon-Thu: 9AM-3PM",
            experience: "3 years",
            email: "sneha.reddy@example.com",
            phone: "+91 9876543214",
            whatsapp: "+91 9876543214",
            avatar: "SR",
            color: "bg-pink-500",
            isPaid: false,
            tasksCompleted: 22,
            hoursVolunteered: 66
        },
        {
            id: 6,
            name: "Arjun Nair",
            rating: 4.9,
            totalReviews: 42,
            subjects: ["Mathematics", "Statistics", "Economics"],
            languages: ["English", "Malayalam"],
            availability: "Flexible",
            experience: "6 years",
            email: "arjun.nair@example.com",
            phone: "+91 9876543215",
            whatsapp: "+91 9876543215",
            avatar: "AN",
            color: "bg-indigo-500",
            isPaid: true,
            ratePerHour: 180,
            tasksCompleted: 78,
            hoursVolunteered: 234
        }
    ];

    const allSubjects = ["All", "Mathematics", "Physics", "Chemistry", "Computer Science", "Biology", "English", "History", "Political Science", "Statistics", "Economics"];
    const allLanguages = ["All", "English", "Hindi", "Marathi", "Gujarati", "Telugu", "Malayalam"];

    // Filter volunteers based on search and filters
    const filteredVolunteers = volunteers.filter(volunteer => {
        const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteer.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesSubject = filterSubject === "All" || volunteer.subjects.includes(filterSubject);
        const matchesLanguage = filterLanguage === "All" || volunteer.languages.includes(filterLanguage);

        return matchesSearch && matchesSubject && matchesLanguage;
    });

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex">
            <StudentSidebar />

            <div className="flex-1 ml-64">
                {/* Top Bar */}
                <div className="h-14 border-b bg-white flex items-center px-6 text-[#111F35] font-semibold">
                    Available Volunteers
                </div>

                <div className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-[#111F35] mb-2">Browse Available Volunteers</h1>
                        <p className="text-gray-600">Connect with volunteers who can assist you with your exams</p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or subject..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                                />
                            </div>

                            {/* Subject Filter */}
                            <div className="relative">
                                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={filterSubject}
                                    onChange={(e) => setFilterSubject(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                                >
                                    {allSubjects.map(subject => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Language Filter */}
                            <div className="relative">
                                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={filterLanguage}
                                    onChange={(e) => setFilterLanguage(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                                >
                                    {allLanguages.map(language => (
                                        <option key={language} value={language}>{language}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-gray-600">
                        Showing <span className="font-semibold text-[#111F35]">{filteredVolunteers.length}</span> volunteer{filteredVolunteers.length !== 1 ? 's' : ''}
                    </div>

                    {/* Volunteer Cards Grid */}
                    {filteredVolunteers.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredVolunteers.map(volunteer => (
                                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                            <div className="text-gray-400 text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold text-[#111F35] mb-2">No volunteers found</h3>
                            <p className="text-gray-600">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ---------------- Volunteer Card Component ---------------- */

// Helper function to determine volunteer badge
const getBadge = (tasksCompleted, hoursVolunteered) => {
    if (hoursVolunteered >= 100) {
        return { name: "Certificate", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: "🏆" };
    } else if (tasksCompleted >= 50) {
        return { name: "Gold Badge", color: "bg-gradient-to-r from-yellow-400 to-yellow-600", icon: "🥇" };
    } else if (tasksCompleted >= 20) {
        return { name: "Silver Badge", color: "bg-gradient-to-r from-gray-300 to-gray-500", icon: "🥈" };
    } else if (tasksCompleted >= 5) {
        return { name: "Bronze Badge", color: "bg-gradient-to-r from-orange-400 to-orange-600", icon: "🥉" };
    }
    return null;
};

const VolunteerCard = ({ volunteer }) => {
    const [showContact, setShowContact] = useState(false);
    const badge = getBadge(volunteer.tasksCompleted, volunteer.hoursVolunteered);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full ${volunteer.color} text-white flex items-center justify-center text-xl font-bold flex-shrink-0`}>
                    {volunteer.avatar}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-[#111F35]">{volunteer.name}</h3>
                        {badge && (
                            <span className={`${badge.color} text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1`}>
                                <span>{badge.icon}</span>
                                <span>{badge.name}</span>
                            </span>
                        )}
                    </div>

                    {/* Payment Info */}
                    <div className="mb-2">
                        {volunteer.isPaid ? (
                            <span className="text-sm font-semibold text-green-600">
                                ₹{volunteer.ratePerHour}/hr
                            </span>
                        ) : (
                            <span className="text-sm font-semibold text-blue-600">
                                Free Volunteering
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={i < Math.floor(volunteer.rating) ? "text-yellow-400" : "text-gray-300"}
                                    size={14}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-[#111F35]">{volunteer.rating}</span>
                        <span className="text-sm text-gray-500">({volunteer.totalReviews} reviews)</span>
                    </div>

                    <p className="text-sm text-gray-600">{volunteer.experience} of experience</p>
                </div>
            </div>

            {/* Subjects */}
            <div className="mb-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">SUBJECTS</p>
                <div className="flex flex-wrap gap-2">
                    {volunteer.subjects.map(subject => (
                        <span key={subject} className="px-3 py-1 bg-red-50 text-[#F63049] rounded-lg text-xs border border-red-200">
                            {subject}
                        </span>
                    ))}
                </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">LANGUAGES</p>
                <div className="flex flex-wrap gap-2">
                    {volunteer.languages.map(language => (
                        <span key={language} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs border border-blue-200">
                            {language}
                        </span>
                    ))}
                </div>
            </div>

            {/* Availability */}
            <div className="mb-4 pb-4 border-b">
                <p className="text-xs font-semibold text-gray-600 mb-1">AVAILABILITY</p>
                <p className="text-sm text-[#111F35]">{volunteer.availability}</p>
            </div>

            {/* Contact Information */}
            <div>
                <button
                    onClick={() => setShowContact(!showContact)}
                    className="w-full bg-[#F63049] text-white py-2.5 rounded-lg hover:bg-[#e12a40] transition font-medium mb-3"
                >
                    {showContact ? "Hide Contact Info" : "Show Contact Info"}
                </button>

                {showContact && (
                    <div className="space-y-2 bg-gray-50 rounded-lg p-4 animate-fadeIn">
                        <ContactItem icon={FaEnvelope} label="Email" value={volunteer.email} href={`mailto:${volunteer.email}`} />
                        <ContactItem icon={FaPhone} label="Phone" value={volunteer.phone} href={`tel:${volunteer.phone}`} />
                        <ContactItem icon={FaWhatsapp} label="WhatsApp" value={volunteer.whatsapp} href={`https://wa.me/${volunteer.whatsapp.replace(/[^0-9]/g, '')}`} color="text-green-600" />
                    </div>
                )}
            </div>
        </div>
    );
};

/* ---------------- Contact Item Component ---------------- */

const ContactItem = ({ icon: Icon, label, value, href, color = "text-[#F63049]" }) => (
    <div className="flex items-center gap-3">
        <Icon className={`${color} flex-shrink-0`} size={16} />
        <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">{label}</p>
            <a href={href} className={`text-sm ${color} hover:underline truncate block`}>
                {value}
            </a>
        </div>
    </div>
);

export default Availability;
