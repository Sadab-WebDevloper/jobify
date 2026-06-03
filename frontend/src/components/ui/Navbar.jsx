import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LogOut, User2, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setAuthUser, setToken } from "../../redux/authSlice";
import {
  setAllJobs,
  setAllJobsAdmin,
  setSingleJob,
} from "../../redux/jobSlice";
import { setAllCompanies } from "../../redux/companySlice";
import apiRequest from "../../utils/axiosUtility";
import { useState } from "react";
import "../../CSS/Navbar.css";

export const Navbar = () => {
  const { authUser, token } = useSelector((store) => store.auth);
  const role = authUser?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const logOutHandler = async () => {
    try {
      const endpoint = `${USER_API_END_POINT}/logOut`;
      const res = await apiRequest("GET", endpoint, {}, token);
      setIsPopoverOpen(false);
      setShowLogoutConfirm(false);
      if (res.data.success) {
        toast.success(`${res.data.message}`, {
          duration: 1500,
          position: "top-center",
        });
        dispatch(setAuthUser(null));
        dispatch(setSingleJob(null));
        dispatch(setAllJobs(null));
        dispatch(setAllCompanies(null));
        dispatch(setToken(""));
        dispatch(setAllJobsAdmin(null));
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed.", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const handleLogoutClick = () => {
    setIsPopoverOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleLogo = () => {
    if (authUser && role === "recruiter") {
      navigate("/recruiter/home");
    } else if (authUser && role === "student") {
      navigate("/student/home");
    } else {
      navigate("/");
    }
  };

  return (
    <>
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 transition-all duration-300 shadow-lg shadow-slate-900/20">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold cursor-pointer tracking-tight text-white" onClick={handleLogo}>
          Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">ify</span>
        </h1>

        {/* Menu and Buttons */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Toggle Button for Mobile */}
          <button
            className="lg:hidden text-slate-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Nav Links */}
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } flex-col lg:flex-row lg:flex items-center gap-8 absolute lg:static top-full left-0 w-full lg:w-auto bg-slate-900 lg:bg-transparent shadow-lg lg:shadow-none p-6 lg:p-0 font-medium text-slate-300`}
          >
            {role === "student" && (
              <>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/student/home" className="hover:text-teal-400 transition-colors">Home</Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/jobs" className="hover:text-teal-400 transition-colors">Jobs</Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/browse" className="hover:text-teal-400 transition-colors">Browse</Link>
                </li>
              </>
            )}
            {role === "recruiter" && (
              <>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/admin/companies" className="hover:text-purple-400 transition-colors">Company</Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/admin/jobs" className="hover:text-purple-400 transition-colors">Jobs</Link>
                </li>
              </>
            )}
          </ul>

          {/* User Profile / Auth Buttons */}
          <div className="flex items-center gap-4">
            {authUser ? (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer border-2 border-transparent hover:border-teal-500 transition-colors">
                    <AvatarImage
                      src={authUser?.profile?.profilePhoto || "/images/default-avatar.png"}
                      alt="User Avatar"
                    />
                    <AvatarFallback className="bg-slate-800 text-teal-400 font-bold border border-slate-700">
                      {authUser?.fullname?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 mt-2 p-0 border border-slate-700 rounded-xl shadow-2xl overflow-hidden bg-slate-800 text-white">
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={authUser?.profile?.profilePhoto || "/images/default-avatar.png"}
                        alt="User Avatar"
                      />
                      <AvatarFallback className="bg-slate-700 text-white font-bold border border-slate-600">
                        {authUser?.fullname?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="font-bold text-white">{authUser?.fullname}</h1>
                      <p className="text-sm text-slate-400 font-medium">
                        {authUser?.profile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-800">
                    {role === "student" && (
                      <Link to="/profile">
                        <button
                          onClick={() => setIsPopoverOpen(false)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <User2 className="w-4 h-4 text-slate-400" />
                          View Profile
                        </button>
                      </Link>
                    )}
                    <button 
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex gap-2 sm:gap-3">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 bg-transparent hover:text-white hover:border-slate-500 hover:bg-slate-800 font-semibold transition-all px-3 sm:px-4 text-xs sm:text-sm h-9 sm:h-10"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-lg shadow-teal-500/20 font-semibold transition-all border-0 px-3 sm:px-4 text-xs sm:text-sm h-9 sm:h-10">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>

    {/* Logout Confirmation Modal */}
    {showLogoutConfirm && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ backgroundColor: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(8px)" }}
      >
        <div
          className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 w-[90%] max-w-sm flex flex-col items-center gap-4 animate-fade-in-up"
        >
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-1">
            <LogOut className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Logout?</h2>
          <p className="text-slate-400 text-sm text-center">
            Are you sure you want to logout from your account?
          </p>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={logOutHandler}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-400 hover:to-red-500 transition-all shadow-lg shadow-red-500/20"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
