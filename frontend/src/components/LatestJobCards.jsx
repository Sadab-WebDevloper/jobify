/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import apiRequest from "../utils/axiosUtility";
import { USER_API_END_POINT } from "../utils/constant";
import { setSavedJobs } from "../redux/authSlice";
import { toast } from "sonner";

function LatestJobCards({ job }) {
  const navigate = useNavigate();

  // Destructure job properties
  const { _id, company, title, description, position, salary, jobType } = job;
  const dispatch = useDispatch();
  const { authUser, token } = useSelector((store) => store.auth);

  const savedJobsList = authUser?.profile?.savedJobs;
  const isSaved = Array.isArray(savedJobsList) && savedJobsList.some(savedJob => 
    savedJob._id === _id || savedJob === _id
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
      const res = await apiRequest("POST", `${USER_API_END_POINT}/saved-jobs/${_id}`, {}, token);
      dispatch(setSavedJobs(res.data.data)); 
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save job");
    }
  };

  return (
    <div
      onClick={() => navigate(`/jobs/jobDetails/${_id}`)}
      role="button"
      aria-label={`View details for ${title} at ${company?.name}`}
      className="p-6 rounded-xl shadow-lg bg-slate-800 border border-slate-700 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

      <div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-bold text-lg text-white group-hover:text-teal-400 transition-colors">{company?.name}</h1>
            <p className="text-sm text-slate-400 font-medium flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5" /> India
            </p>
          </div>
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
        <div className="mt-4">
          <h1 className="font-bold text-xl my-2 text-white">{title}</h1>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-700">
        <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold hover:bg-teal-500/20 rounded-md px-3 py-1">
          {position} Positions
        </Badge>
        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold hover:bg-emerald-500/20 rounded-md px-3 py-1">
          {salary} LPA
        </Badge>
        <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold hover:bg-purple-500/20 rounded-md px-3 py-1">
          {jobType}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
