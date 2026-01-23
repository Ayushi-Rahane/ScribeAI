import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./components/common/LoginPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import RequestScribe from "./pages/student/RequestScribe";
import ActiveRequests from "./pages/student/ActiveRequests";
import Profile from "./pages/student/Profile";
import Availability from "./pages/student/Availability";
import History from "./pages/student/History";

// Volunteer imports
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import IncomingRequests from "./pages/volunteer/IncomingRequests";
import ActiveAssignments from "./pages/volunteer/ActiveAssignments";
import VolunteerHistory from "./pages/volunteer/VolunteerHistory";
import RatingsCertificates from "./pages/volunteer/RatingsCertificates";
import VolunteerProfile from "./pages/volunteer/VolunteerProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Student Routes */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/request" element={<RequestScribe />} />
      <Route path="/student/active" element={<ActiveRequests />} />
      <Route path="/student/profile" element={<Profile />} />
      <Route path="/student/availability" element={<Availability />} />
      <Route path="/student/history" element={<History />} />

      {/* Volunteer Routes */}
      <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
      <Route path="/volunteer/incoming" element={<IncomingRequests />} />
      <Route path="/volunteer/active" element={<ActiveAssignments />} />
      <Route path="/volunteer/history" element={<VolunteerHistory />} />
      <Route path="/volunteer/ratings" element={<RatingsCertificates />} />
      <Route path="/volunteer/profile" element={<VolunteerProfile />} />

    </Routes>
  );
}

export default App;
