
const ActiveRequest = () => {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-[#F63049] lg:col-span-2">

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse-soft"></span>
                    <h3 className="font-semibold">Active Request</h3>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs animate-pulse-soft">
                    Matching in progress
                </span>
            </div>

            <h2 className="text-xl font-bold mb-1">Advanced Calculus II</h2>
            <p className="text-gray-500 text-sm mb-4">Tomorrow, 10:00 AM</p>

            {/* Progress */}
            <div className="mb-4">
                <p className="text-sm mb-1">Matching Probability</p>
                <div className="h-3 bg-red-100 rounded-full overflow-hidden animate-progress">
                    <div className="h-full bg-[#F63049] w-[80%] rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    We have notified 5 qualified volunteers.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div><span className="text-gray-500">Subject:</span> Mathematics</div>
                <div><span className="text-gray-500">Duration:</span> 3 Hours</div>
                <div><span className="text-gray-500">Language:</span> English</div>
            </div>

            <button className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                View Details
            </button>
        </div>
    );
};

export default ActiveRequest;