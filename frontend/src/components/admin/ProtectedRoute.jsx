import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    } else if (role === "student" && authUser.role === "recruiter") {
      navigate("/admin/companies");
    } else if (role === "admin" && authUser.role === "student") {
      navigate("/");
    }
  }, [authUser, navigate, role]);

  return <>{authUser ? children : null}</>;
}

export default ProtectedRoute;
