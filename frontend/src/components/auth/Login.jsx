import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading, setToken } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import apiRequest from "../../utils/axiosUtility";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export const Login = () => {
  useDocumentTitle("Login");
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Fetching token and loading state from Redux store
  const { token, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const endpoint = `${USER_API_END_POINT}/login`;
      const res = await apiRequest("POST", endpoint, input, token);

      Cookies.set("token", res.data.token, {
        expires: 1,
        path: "",
        secure: true,
        sameSite: "None",
      });

      dispatch(setAuthUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success(`${res.data.message}`, {
        duration: 1500,
        position: "top-center",
        style: {
          backgroundColor: "green",
          color: "white",
          borderRadius: "8px",
        },
      });

      setTimeout(
        () =>
          navigate(
            res.data.user.role === "recruiter" ? "/recHome" : "/studenthome"
          ),
        1000
      );
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";

      toast.error(errorMessage, {
        duration: 2000, // Duration for the toast
        position: "top-center", // Position of the toast
        style: {
          backgroundColor: "red", // Background color for error
          color: "white", // Text color
          borderRadius: "8px", // Rounded corners
        },
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex h-screen herosec ">
      {/* Left Section */}
      <div className="w-full hidden sm:flex sm:w-1/2 p-8 bg-transparent text-white flex-col items-center justify-center relative overflow-hidden">
        {/* Welcome Text */}
        <h1 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">
          Welcome Back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-100">Jobify</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg leading-relaxed text-center max-w-md drop-shadow-md">
          Log in to explore exciting job opportunities or manage your job
          postings. Your next career milestone is just a step away.
        </p>

        {/* Decorative Divider */}
        <div className="mt-6 w-24 h-1 bg-white rounded-full"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full sm:w-1/2 flex items-center justify-center relative">
        <form
          onSubmit={submitHandler}
          className="sm:w-[420px] w-[90%] p-10 space-y-6 transform transition-all duration-300 ease-in-out glass rounded-3xl animate-fade-in-up border border-white/20 shadow-2xl relative z-10"
        >
          <h1 className="font-extrabold text-3xl mb-4 text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Login to Your Account
          </h1>

          <div className="my-3 flex flex-col gap-3">
            <Label htmlFor="email" className="text-lg  font-medium text-white">
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <div className="my-3 flex flex-col gap-3">
            <Label
              htmlFor="password"
              className="text-lg font-medium text-white"
            >
              Password:
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="minimum 6 characters"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <div className="my-3">
            <Label className="text-lg  font-medium text-white">
              Choose Your Role
            </Label>
            <div className="flex gap-6 mt-2">
              <div className="flex items-center">
                <Input
                  id="student"
                  type="radio"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  name="role"
                  value="student"
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="ml-2 text-white ">
                  Student
                </Label>
              </div>
              <div className="flex items-center">
                <Input
                  id="recruiter"
                  type="radio"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="ml-2 text-white ">
                  Recruiter
                </Label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-primary/30"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-sm  mt-4 text-center text-white">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-teal-300 hover:underline font-bold">
              Signup
            </Link>
            <br />
            <Link to="/forgotPass" className="text-[red] hover:underline">
              Forgot Password
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
