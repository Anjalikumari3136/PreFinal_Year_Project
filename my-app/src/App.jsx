import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Requests from './pages/dashboard/Requests';
import Profile from './pages/dashboard/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './layouts/AdminLayout';
import AdminOverview from './pages/admin/Overview';
import StudentManagement from './pages/admin/StudentManagement';
import AdminRequests from './pages/admin/AdminRequests';
import Feedback from './pages/dashboard/Feedback';
import FacultyLayout from './layouts/FacultyLayout';
import FacultyOverview from './pages/faculty/Overview';
import Attendance from './pages/faculty/Attendance';
import Performance from './pages/faculty/Performance';
import NoticeBoard from './pages/faculty/NoticeBoard';
import Resources from './pages/faculty/Resources';
import FacultyProfile from './pages/faculty/Profile';
import FacultyMentorship from './pages/faculty/Mentorship';
import GrievanceResolution from './pages/faculty/Grievances';
import FacultyManagement from './pages/admin/FacultyManagement';
import FeedbackManagement from './pages/admin/FeedbackManagement';
import Mentorship from './pages/dashboard/Mentorship';
import MentorshipManagement from './pages/admin/MentorshipManagement';
import RegistrationRequests from './pages/admin/RegistrationRequests';
import FeaturesPage from './pages/Features';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    if (user.role === 'ADMIN') return <Navigate to="/admin-dashboard" />;
    if (user.role === 'FACULTY') return <Navigate to="/faculty-dashboard" />;
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    if (user.role === 'ADMIN') return <Navigate to="/admin-dashboard" />;
    if (user.role === 'FACULTY') return <Navigate to="/faculty-dashboard" />;
    return <Navigate to="/dashboard" />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            <Route path="/dashboard" element={
              <RoleProtectedRoute allowedRoles={['STUDENT']}>
                <DashboardLayout />
              </RoleProtectedRoute>
            }>
              <Route index element={<Overview />} />
              <Route path="requests" element={<Requests />} />
              <Route path="mentorship" element={<Mentorship />} />
              <Route path="notifications" element={<div>Notifications Page</div>} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/admin-dashboard" element={
              <RoleProtectedRoute allowedRoles={['ADMIN']}>
                <AdminLayout />
              </RoleProtectedRoute>
            }>
              <Route index element={<AdminOverview />} />
              <Route path="approvals" element={<RegistrationRequests />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="faculty" element={<FacultyManagement />} />
              <Route path="requests" element={<AdminRequests />} />
              <Route path="feedback" element={<FeedbackManagement />} />
              <Route path="mentorship" element={<MentorshipManagement />} />
            </Route>

            <Route path="/faculty-dashboard" element={
              <RoleProtectedRoute allowedRoles={['FACULTY']}>
                <FacultyLayout />
              </RoleProtectedRoute>
            }>
              <Route index element={<FacultyOverview />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="performance" element={<Performance />} />
              <Route path="resources" element={<Resources />} />
              <Route path="my-attendance" element={<div>My Personal Attendance Records</div>} />
              <Route path="notice" element={<NoticeBoard />} />
              <Route path="profile" element={<FacultyProfile />} />
              <Route path="mentorship" element={<FacultyMentorship />} />
              <Route path="grievances" element={<GrievanceResolution />} />

              <Route path="students" element={<Navigate to="/faculty-dashboard" />} />
              <Route path="courses" element={<Navigate to="/faculty-dashboard/resources" />} />
            </Route>
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </NotificationProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
