import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaUserFriends, FaShieldAlt } from "react-icons/fa";

const roles = [
    { id: "student", label: "Student", icon: <FaGraduationCap /> },
    { id: "volunteer", label: "Volunteer", icon: <FaUserFriends /> },
    { id: "admin", label: "Admin", icon: <FaShieldAlt /> },
];

const LoginPage = () => {
    const [role, setRole] = useState("student");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Add real authentication here

        if (role === "student") {
            navigate("/student/dashboard");
        } else if (role === "volunteer") {
            navigate("/volunteer/dashboard");
        } else if (role === "admin") {
            navigate("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center px-4">

            {/* Logo */}
            <div className="mb-4 text-[#F63049]">
                {/* Replace with your SVG logo */}
                <span className="text-3xl font-bold">🧠</span>
            </div>

            <h1 className="text-2xl font-semibold text-[#111F35] mb-1">
                Welcome to ScribeAI
            </h1>
            <p className="text-gray-500 mb-6 text-sm">
                Sign in to access your dashboard
            </p>

            {/* Role Selector */}
            <div className="flex bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                {roles.map((r) => (
                    <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium transition
              ${role === r.id
                                ? "bg-[#F63049] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {r.icon}
                        {r.label}
                    </button>
                ))}
            </div>

            {/* Login Card */}
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

                <h2 className="text-lg font-semibold text-[#111F35] mb-1">Login</h2>
                <p className="text-sm text-gray-500 mb-5">
                    Enter your credentials to access your {role} account.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-sm text-gray-600">Password</label>
                            <a href="#" className="text-sm text-[#F63049] hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F63049]"
                        />
                    </div>

                    {/* Remember */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="accent-[#F63049]" />
                        Remember me for 30 days
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-[#F63049] hover:bg-[#e02b42] text-white py-2.5 rounded-lg font-medium transition"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-5 text-gray-400 text-sm">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="px-3">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Social Buttons */}
                <div className="flex gap-3">
                    <button className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50">
                        Google
                    </button>
                    <button className="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-50">
                        Microsoft
                    </button>
                </div>

                {/* Signup */}
                <p className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <a href="#" className="text-[#F63049] font-medium hover:underline">
                        Sign up
                    </a>
                </p>

            </div>
        </div>
    );
};

export default LoginPage;
