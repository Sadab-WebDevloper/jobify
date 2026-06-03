/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import apiRequest from "../utils/axiosUtility";
import { USER_API_END_POINT } from "../utils/constant";
import { setSavedJobs } from "../redux/authSlice";
import { toast } from "sonner";

function Jobcard({ job }) {
  const daysAgo = (mongoTime) => {
    const timeDifference = new Date() - new Date(mongoTime);
    const minutes = Math.floor(timeDifference / (60 * 1000));
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser, token } = useSelector((store) => store.auth);

  const savedJobs = authUser?.profile?.savedJobs;
  const isSaved = Array.isArray(savedJobs) && savedJobs.some(savedJob => 
    savedJob._id === job?._id || savedJob === job?._id
  );

  const toggleSave = async (e) => {
    e.stopPropagation();
    if (!authUser) {
      toast.error("Please login to save jobs");
      return;
    }
    if (authUser.role !== "student") {
      toast.error("Only students can save jobs");
      return;
    }
    try {
      const res = await apiRequest("POST", `${USER_API_END_POINT}/saved-jobs/${job._id}`, {}, token);
      dispatch(setSavedJobs(res.data.data)); 
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save job");
    }
  };

  return (
    <div className="rounded-xl p-6 shadow-lg bg-slate-800 border border-slate-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-gradient-to-br group-hover:from-teal-500/10 group-hover:to-emerald-500/10 transition-colors duration-500" />

      <div>
        {/* Top Section: Job Date and Bookmark */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="bg-slate-700 text-slate-300 hover:bg-slate-600 text-xs font-medium px-2 py-1">
            {daysAgo(job?.createdAt)}
          </Badge>
          <Button
            variant="ghost"
            className={`rounded-full w-8 h-8 p-0 transition-colors z-10 ${
              isSaved 
                ? "text-teal-400 bg-teal-500/10" 
                : "text-slate-500 hover:text-teal-400 hover:bg-teal-500/10"
            }`}
            size="icon"
            aria-label="Bookmark Job"
            onClick={toggleSave}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-teal-400 text-teal-400" : ""}`} />
          </Button>
        </div>

        {/* Middle Section: Company Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 my-2 relative z-10">
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-700 shadow-sm group-hover:border-teal-500/30 transition-colors">
            <Avatar className="w-14 h-14 rounded-lg bg-slate-800">
              <AvatarImage
                src={job?.company?.logo || "default-logo.png"}
                alt="Company Logo"
                className="object-contain"
              />
            </Avatar>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-bold text-lg md:text-xl text-white group-hover:text-teal-400 transition-colors">
              {job?.company?.name || "Unknown Company"}
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-0.5"> {job?.location} </p>
          </div>
        </div>

        {/* Job Title and Description */}
        <div className="mt-4 relative z-10">
          <h1 className="font-bold text-xl md:text-2xl my-2 text-white">{job?.title}</h1>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{job?.description}</p>
        </div>
      </div>

      <div className="relative z-10">
        {/* Badges Section */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold hover:bg-teal-500/20 rounded-md px-3 py-1">
            {job?.position} Positions
          </Badge>
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold hover:bg-emerald-500/20 rounded-md px-3 py-1">
            {job?.salary} LPA
          </Badge>
          <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold hover:bg-purple-500/20 rounded-md px-3 py-1">
            {job?.jobType}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-3 mt-6">
          <Button
            onClick={() => navigate(`/jobs/jobDetails/${job._id}`)}
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 hover:from-teal-400 hover:to-emerald-400 transition-all font-semibold rounded-lg border-0"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Jobcard;
