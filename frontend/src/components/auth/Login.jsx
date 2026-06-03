import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading, setToken } from "../../redux/authSlice";
import { Loader2, Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className={`flex h-screen transition-all duration-700 ease-in-out bg-slate-900`}>
      {/* Left Section */}
      <div className={`w-full hidden sm:flex sm:w-1/2 p-12 text-white flex-col items-center justify-center relative overflow-hidden transition-all duration-700 bg-slate-900/50`}>
        {/* Dynamic Background Effects */}
        {input.role === "recruiter" ? (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse delay-1000"></div>
          </>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-teal-400/10 to-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        )}

        {/* Dynamic Content */}
        <div className={`relative z-10 transition-all duration-500 transform ${input.role ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}>
          <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow-lg leading-tight">
            {input.role === "recruiter" ? (
              <>Empower Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Company's Future</span></>
            ) : input.role === "student" ? (
              <>Unlock Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-200">Career Potential</span></>
            ) : (
              <>Welcome Back to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-100">Jobify</span></>
            )}
          </h1>

          <p className="text-xl leading-relaxed text-center max-w-md drop-shadow-md text-gray-200 font-light mx-auto">
            {input.role === "recruiter" 
              ? "Access elite talent, manage applications seamlessly, and build the ultimate team for your organization."
              : input.role === "student"
              ? "Discover incredible opportunities, apply with a single click, and take the next big step in your career."
              : "Log in to explore exciting job opportunities or manage your job postings."}
          </p>
        </div>

        {/* Decorative Divider */}
        <div className={`mt-10 h-1.5 rounded-full transition-all duration-700 ease-in-out ${
          input.role === "recruiter" ? "w-32 bg-gradient-to-r from-purple-500 to-blue-500" : "w-24 bg-white/80"
        }`}></div>
      </div>

      {/* Right Section - Login Form */}
      <div className={`w-full sm:w-1/2 flex items-center justify-center relative transition-all duration-500 bg-slate-800 shadow-[-20px_0_40px_rgba(0,0,0,0.3)] z-20`}>
        <form
          onSubmit={submitHandler}
          className={`sm:w-[460px] w-[90%] p-8 sm:p-10 space-y-6 transform transition-all duration-500 ease-in-out rounded-3xl relative z-10 bg-slate-900 border border-slate-700 shadow-2xl ${
            input.role === "recruiter" ? "shadow-purple-900/20" : "shadow-teal-900/20"
          }`}
        >
          <div className="text-center mb-8">
            <h1 className={`font-extrabold text-3xl tracking-wide mb-2 ${
              input.role === "recruiter" 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400" 
                : "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400"
            }`}>
              {input.role === "recruiter" ? "Recruiter Portal" : input.role === "student" ? "Student Login" : "Login to Your Account"}
            </h1>
            <p className="text-sm text-slate-400">
              Please enter your credentials to continue
            </p>
          </div>

          {/* Role Selection */}
          <div className={`p-1 rounded-xl flex gap-1 transition-all duration-300 bg-slate-800 border border-slate-700`}>
            <label className={`flex-1 cursor-pointer text-center py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              input.role === "student" 
                ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md transform scale-[1.02]" 
                : "text-slate-400 hover:text-slate-200"
            }`}>
              <input type="radio" name="role" value="student" className="hidden" checked={input.role === "student"} onChange={changeEventHandler} />
              Student
            </label>
            <label className={`flex-1 cursor-pointer text-center py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
              input.role === "recruiter" 
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md transform scale-[1.02]" 
                : "text-slate-400 hover:text-slate-200"
            }`}>
              <input type="radio" name="role" value="recruiter" className="hidden" checked={input.role === "recruiter"} onChange={changeEventHandler} />
              Recruiter
            </label>
          </div>

          <div className="space-y-5 mt-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-semibold ml-1 text-slate-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                required
                className={`w-full p-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                  input.role === "recruiter" ? "focus:ring-purple-500 focus:border-purple-500" : "focus:ring-teal-500 focus:border-teal-500"
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-300">
                  Password
                </Label>
                <Link to="/forgotPass" className={`text-xs font-medium hover:underline transition-colors ${
                  input.role === "recruiter" ? "text-purple-400 hover:text-purple-300" : "text-teal-400 hover:text-teal-300"
                }`}>
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  required
                  className={`w-full p-3.5 pr-12 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                    input.role === "recruiter" ? "focus:ring-purple-500 focus:border-purple-500" : "focus:ring-teal-500 focus:border-teal-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-700`}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 mt-8 text-base ${
              input.role === "recruiter"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-purple-500/30 border border-purple-500/50"
                : "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-teal-500/30 border border-teal-500/50"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-sm mt-6 text-center font-medium text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className={`font-bold hover:underline ml-1 ${
              input.role === "recruiter" ? "text-blue-400 hover:text-blue-300" : "text-teal-400 hover:text-teal-300"
            }`}>
              Create one now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
