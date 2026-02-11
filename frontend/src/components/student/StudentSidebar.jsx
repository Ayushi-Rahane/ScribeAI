import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaFileAlt,
    FaCheckCircle,
    FaHistory,
    FaCalendarAlt,
    FaUser,
    FaCommentDots,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from "react-icons/fa";
import studentService from "../../services/studentService";
import authService from "../../services/authService";
import API_BASE_URL from "../../config/api";

const menuItems = [
    { label: "Dashboard", icon: <FaHome />, path: "/student/dashboard" },
    { label: "Request Scribe", icon: <FaFileAlt />, path: "/student/request" },
    { label: "Active Requests", icon: <FaCheckCircle />, path: "/student/active" },
    { label: "History", icon: <FaHistory />, path: "/student/history" },
    { label: "Availability", icon: <FaCalendarAlt />, path: "/student/availability" },
    { label: "Profile", icon: <FaUser />, path: "/student/profile" },
];

const DashboardSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [studentName, setStudentName] = useState("Loading...");
    const [studentInitials, setStudentInitials] = useState("??");
    const [profilePicture, setProfilePicture] = useState(null);

    // Fetch student profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await studentService.getProfile();
                if (profile && profile.fullName) {
                    setStudentName(profile.fullName);
                    // Get initials
                    const parts = profile.fullName.split(" ");
                    const initials = parts.length >= 2
                        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
                        : profile.fullName.substring(0, 2).toUpperCase();
                    setStudentInitials(initials);
                    // Set profile picture
                    setProfilePicture(profile.profilePicture);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                // Fallback to user email if profile fetch fails
                const user = authService.getUser();
                if (user && user.email) {
                    setStudentName(user.email.split('@')[0]);
                    setStudentInitials(user.email.substring(0, 2).toUpperCase());
                }
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.clear();
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className="md:hidden fixed top-3.5 left-4 z-50 bg-[#0F1E33] text-white p-2.5 rounded-lg shadow-lg"
            >
                {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sidebar - Using CSS Grid for proper layout */}
            <aside className={`
                w-64 bg-gradient-to-b from-[#0F1E33] to-[#121C2D] text-gray-300
                fixed left-0 top-0 h-screen z-40 transition-transform duration-300
                grid grid-rows-[auto_1fr_auto]
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>

                {/* Logo - Row 1: Auto height */}
                <div className="flex items-center gap-3 px-6 py-6 text-white text-xl font-bold">
                    <svg
                        className="w-8 h-8"
                        viewBox="0 0 96 96"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#F63049"
                    >
                        <path d="M77,55.2,75.77,54c-3.43-3.33-7.31-7.11-7.41-12.1a32.31,32.31,0,0,1,.63-6,41,41,0,0,0,.63-5,25.2,25.2,0,0,0-2.23-11.46c-3-6.57-8.74-10.15-17-10.64C36.08,8,19.79,14.1,15.52,29.73a36.22,36.22,0,0,0,4.05,27.68,38.37,38.37,0,0,0,3.87,5.16c.75.89,1.53,1.81,2.24,2.75a41.18,41.18,0,0,1,4.67,7.37,21.55,21.55,0,0,0,3.26,5.5,13,13,0,0,0,1.61,1.54c3.62,2.91,8.41,3.93,12.62,4.66a57.16,57.16,0,0,0,9.61,1,20.25,20.25,0,0,0,7.42-1.2A5.13,5.13,0,0,0,68,79.36a17.5,17.5,0,0,1,2.06-8.24l.39-.74-3.39-1.71a.14.14,0,0,1-.08-.16.15.15,0,0,1,.12-.14l3-.72a1.76,1.76,0,0,0,1.22-1.06A1.72,1.72,0,0,0,71.21,65a1.81,1.81,0,0,1-.33-1.62c.27-.72,1.26-1.34,2.86-1.79a5.77,5.77,0,0,0,3.47-2.7C78.21,57.07,77.62,55.88,77,55.2Zm-.62,3.2a4.74,4.74,0,0,1-2.86,2.23C71.53,61.18,70.34,62,70,63a2.77,2.77,0,0,0,.41,2.51.74.74,0,0,1,.07.69.78.78,0,0,1-.54.46l-3,.72a1.16,1.16,0,0,0-.25,2.16l2.48,1.25A18.75,18.75,0,0,0,67,79.45a4.1,4.1,0,0,1-2.52,3.81c-4.66,1.84-11,1.11-16.5.15-4.08-.71-8.73-1.7-12.16-4.46a11,11,0,0,1-1.48-1.42,20.61,20.61,0,0,1-3.12-5.26,42.28,42.28,0,0,0-4.77-7.55c-.73-1-1.51-1.89-2.27-2.79a38.2,38.2,0,0,1-3.78-5A35.23,35.23,0,0,1,16.49,30C20.6,14.91,36.43,9,50.29,9.82c7.9.47,13.35,3.85,16.19,10.06a24,24,0,0,1,2.14,11,39.76,39.76,0,0,1-.62,4.9A33.71,33.71,0,0,0,67.36,42c.11,5.4,4.15,9.33,7.71,12.80l1.17,1.14C76.48,56.14,77.19,56.86,76.33,58.4Z" fill="#F63049"
                            stroke="#F63049"
                            strokeWidth="1"></path>
                            strokeWidth="1"></path>
                </svg>
                <span className="text-xl font-semibold text-[#F63049]">
                    ScribeConnect
                </span>
            </div>

            {/* Menu - Row 2: Takes remaining space and scrolls */}
            <div className="overflow-y-auto px-4 py-4">
                <p className="text-xs uppercase text-gray-500 mb-3 tracking-wider">Menu</p>
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                            active={currentPath === item.path}
                            onClick={closeMobileMenu}
                        />
                    ))}
                </div>
            </div>

            {/* User Card - Row 3: Auto height, always visible */}
            <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-3 mb-3">
                    {profilePicture ? (
                        <img
                            src={`${API_BASE_URL.replace('/api/v1', '')}${profilePicture}`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                        />
                    ) : (
                        <div className="bg-[#F63049] w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                            {studentInitials}
                        </div>
                    )}
                    <div>
                        <p className="text-white text-sm font-medium">{studentName}</p>
                        <p className="text-xs text-gray-400">Student Account</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition w-full"
                >
                    <FaSignOutAlt />
                    Log Out
                </button>
            </div>

        </aside >
        </>
    );
};

const SidebarItem = ({ label, icon, active, path, onClick }) => {
    return (
        <Link
            to={path}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all
        ${active
                    ? "bg-[#F63049] text-white shadow-md"
                    : "hover:bg-white/5"}
      `}
        >
            <span className="text-lg">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
};

export default DashboardSidebar;
