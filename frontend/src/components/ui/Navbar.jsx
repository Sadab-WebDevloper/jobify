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

  const logOutHandler = async () => {
    try {
      const endpoint = `${USER_API_END_POINT}/logOut`;
      const res = await apiRequest("GET", endpoint, {}, token);
      setIsPopoverOpen(false);
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

  const handleLogo = () => {
    if (authUser && role === "recruiter") {
      navigate("/recHome");
    } else if (authUser && role === "student") {
      navigate("/studenthome");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold cursor-pointer tracking-tight text-gray-900" onClick={handleLogo}>
          Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ify</span>
        </h1>

        {/* Menu and Buttons */}
        <div className="flex items-center gap-6">
          {/* Toggle Button for Mobile */}
          <button
            className="lg:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Nav Links */}
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } flex-col lg:flex-row lg:flex items-center gap-8 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none p-6 lg:p-0 font-medium text-gray-600`}
          >
            {role === "student" && (
              <>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/studentHome" className="hover:text-primary transition-colors">Home</Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/browse" className="hover:text-primary transition-colors">Browse</Link>
                </li>
              </>
            )}
            {role === "recruiter" && (
              <>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/admin/companies" className="hover:text-primary transition-colors">Company</Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)}>
                  <Link to="/admin/jobs" className="hover:text-primary transition-colors">Jobs</Link>
                </li>
              </>
            )}
          </ul>

          {/* User Profile / Auth Buttons */}
          <div className="flex items-center gap-4">
            {authUser ? (
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
                    <AvatarImage
                      src={authUser?.profile?.profilePhoto || "/images/default-avatar.png"}
                      alt="User Avatar"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {authUser?.fullname?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 mt-2 p-0 border border-gray-100 rounded-xl shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary/5 to-secondary/5">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={authUser?.profile?.profilePhoto || "/images/default-avatar.png"}
                        alt="User Avatar"
                      />
                      <AvatarFallback className="bg-primary text-white font-bold">
                        {authUser?.fullname?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="font-bold text-gray-900">{authUser?.fullname}</h1>
                      <p className="text-sm text-gray-500 font-medium">
                        {authUser?.profile?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>
                  <div className="p-2">
                    {role === "student" && (
                      <Link to="/profile">
                        <button
                          onClick={() => setIsPopoverOpen(false)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <User2 className="w-4 h-4 text-gray-500" />
                          View Profile
                        </button>
                      </Link>
                    )}
                    <button 
                      onClick={logOutHandler}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:text-primary hover:border-primary hover:bg-primary/5 font-semibold transition-all"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-white shadow-md font-semibold transition-all">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
