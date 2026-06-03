import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Home } from "./components/pages/Home";
import { Signup } from "./components/auth/Signup";
import Jobs from "./components/pages/Jobs";
import Layout from "./components/Layout";
import Browse from "./components/pages/Browse";
import Profile from "./components/pages/Profile";
import JobDetails from "./components/pages/JobDetails";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import JobsAdmin from "./components/admin/JobsAdmin";
import CreateAdminJob from "./components/admin/CreateAdminJob";
import Applicants from "./components/admin/Applicants";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AuthRedirect from "./components/auth/AuthRedirect";
import JobSetup from "./components/admin/JobSetup";
import { ForAllHomePage } from "./components/pages/ForAllHomePage";
import HomeRecruiter from "./components/admin/RecHome";
import ForgotPassword from "./components/auth/ForgotPass";
import { NewPassword } from "./components/auth/NewPassword";
import MeHomePage from "./components/me/MeHomePage";

// New Legal Pages
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import CookiePolicy from "./components/pages/CookiePolicy";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <AuthRedirect component={<ForAllHomePage />} /> },
      { path: "/student/home", element: <Home /> },
      {
        path: "/me",
        element: <MeHomePage />,
      },
      {
        path: "/recruiter/home",
        element: <HomeRecruiter />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/cookie-policy",
        element: <CookiePolicy />,
      },
      {
        path: "/forgotPass",
        element: <ForgotPassword />,
      },
      {
        path: "/forgotPass/NewPassword",
        element: <NewPassword />,
      },
      {
        path: "/login",
        element: <AuthRedirect component={<Login />} />,
      },
      {
        path: "/signup",
        element: <AuthRedirect component={<Signup />} />,
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute role="student">
            <Jobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs/jobDetails/:id",
        element: (
          <ProtectedRoute role="student">
            <JobDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/browse",
        element: (
          <ProtectedRoute role="student">
            <Browse />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute role="student">
            <Profile />
          </ProtectedRoute>
        ),
      },
      // Admin routes
      {
        path: "/admin/companies",
        element: (
          <ProtectedRoute role="admin">
            <Companies />
          </ProtectedRoute>
        ),
      },

      {
        path: "/admin/companies/create",
        element: (
          <ProtectedRoute role="admin">
            <CreateCompany />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/:id",
        element: (
          <ProtectedRoute role="admin">
            <CompanySetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute role="admin">
            <JobsAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoute role="admin">
            <CreateAdminJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:id",
        element: (
          <ProtectedRoute role="admin">
            <JobSetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: (
          <ProtectedRoute role="admin">
            <Applicants />
          </ProtectedRoute>
        ),
      },
      // Catch-all for 404
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={appRouter} />;
}
