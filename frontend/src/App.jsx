import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./components/common/LoginPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import RequestScribe from "./pages/student/RequestScribe";
import ActiveRequests from "./pages/student/ActiveRequests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/request" element={<RequestScribe />} />
      <Route path="/student/active" element={<ActiveRequests />} />

    </Routes>
  );
}

export default App;
