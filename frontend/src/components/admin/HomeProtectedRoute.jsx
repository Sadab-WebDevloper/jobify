import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeProtectedRoute({ role, children }) {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      // Redirect to login page if not logged in
      navigate("/login");
    } else if (role === "student" && authUser.role === "recruiter") {
      navigate("/recruiter/home");
    } else if (role === "recruiter" && authUser.role === "student") {
      navigate("/student/home");
    }
  }, [authUser, navigate, role]);

  return <>{authUser ? children : null}</>;
}

export default HomeProtectedRoute;
