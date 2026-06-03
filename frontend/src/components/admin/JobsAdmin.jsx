import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobsAdminTable from "./JobsAdminTable";
import useGetJobsAdmin from "../../hooks/useGetJobsAdmin";
import { setSearchJobByText } from "../../redux/jobSlice";

function JobsAdmin() {
  useGetJobsAdmin();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [dispatch, input]);

  return (
    <>
      <div className="max-w-6xl mx-auto my-10 px-4 md:px-0">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-teal-500"
            placeholder="Filter By Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold border-0"
          >
            New Jobs
          </Button>
        </div>
        <JobsAdminTable />
      </div>
    </>
  );
}

export default JobsAdmin;
