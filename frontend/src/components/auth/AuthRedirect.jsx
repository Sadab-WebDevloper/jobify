import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthRedirect({ component }) {
  const { authUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      if (authUser.role === "student") {
        navigate("/student/home");
      } else if (authUser.role === "recruiter") {
        navigate("/recruiter/home");
      }
    }
  }, [authUser, navigate]);

  // Render the component if the user is not logged in
  return !authUser ? component : null;
}

export default AuthRedirect;
