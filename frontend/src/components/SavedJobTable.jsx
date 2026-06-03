import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { BookmarkMinus } from "lucide-react";
import apiRequest from "../utils/axiosUtility";
import { USER_API_END_POINT } from "../utils/constant";
import { setSavedJobs } from "../redux/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function SavedJobTable() {
  const { authUser, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedJobs = authUser?.profile?.savedJobs || [];

  const handleRemove = async (jobId) => {
    try {
      const res = await apiRequest("POST", `${USER_API_END_POINT}/saved-jobs/${jobId}`, {}, token);
      dispatch(setSavedJobs(res.data.data));
      toast.success("Job removed from saved items");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove job");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-sm bg-slate-900/50">
      <Table>
        <TableCaption className="font-medium text-slate-400 pb-4">
          {savedJobs.length <= 0
            ? "You haven't saved any jobs yet."
            : "A List Of Your Saved Jobs"}
        </TableCaption>
        <TableHeader className="bg-slate-800/80">
          <TableRow className="border-b border-slate-700 hover:bg-slate-800">
            <TableHead className="font-semibold text-slate-300">Job Title</TableHead>
            <TableHead className="font-semibold text-slate-300">Company</TableHead>
            <TableHead className="font-semibold text-slate-300">Location</TableHead>
            <TableHead className="font-semibold text-slate-300 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedJobs.map((job, index) => (
            <TableRow key={index} className="hover:bg-slate-800/50 transition-colors border-b border-slate-800">
              <TableCell 
                className="font-medium text-white cursor-pointer hover:text-teal-400 hover:underline"
                onClick={() => navigate(`/jobs/jobDetails/${job._id}`)}
              >
                {job?.title}
              </TableCell>
              <TableCell className="text-slate-300"> {job?.company?.name} </TableCell>
              <TableCell className="text-slate-400">{job?.location}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 h-auto transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(job._id);
                  }}
                >
                  <BookmarkMinus className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SavedJobTable;
