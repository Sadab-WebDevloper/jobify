import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import useGetSingleJob from "../../hooks/useGetSingleJob";
import apiRequest from "../../utils/axiosUtility";
import { APPLICATION_API_END_POINT } from "../../utils/constant";

function JobDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  const { token } = useSelector((store) => store.auth);
  const { authUser } = useSelector((state) => state.auth);
  const { singleJob } = useSelector((state) => state.job);

  const { fetchSingleJob } = useGetSingleJob(jobId);

  const checkIfApplied = () => {
    return singleJob?.application?.some(
      (application) => application.applicant._id === authUser._id
    );
  };

  const isApplied = checkIfApplied();
  console.log(authUser.profile.resume);

  const applyJob = async () => {
    try {
      if(authUser.profile.resume)
      {
        const endpoint = `${APPLICATION_API_END_POINT}/applyJob/${jobId}`;
        await apiRequest("POST", endpoint, {}, token);
        fetchSingleJob();
        toast.success("Successfully applied for the job!");
      }
      else{
        toast.error("Please upload your resume before applying for the job.");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      toast.error("Failed to apply for the job.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 md:p-10 bg-slate-800/80 backdrop-blur-md shadow-2xl rounded-3xl border border-slate-700 relative overflow-hidden animate-fade-in-up">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start relative z-10">
        <div className="flex-1 w-full">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mb-6 bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
          >
            ← Back
          </Button>
          <h1 className="font-extrabold text-3xl md:text-4xl text-white">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold hover:bg-teal-500/20 px-3 py-1 text-sm rounded-md">
              {singleJob?.position} Position
            </Badge>
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold hover:bg-emerald-500/20 px-3 py-1 text-sm rounded-md">
              {singleJob?.salary} LPA
            </Badge>
            <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold hover:bg-purple-500/20 px-3 py-1 text-sm rounded-md">
              {singleJob?.jobType}
            </Badge>
          </div>
        </div>
        <div className="mt-6 md:mt-0 w-full md:w-auto md:flex md:justify-end">
          <Button
            disabled={isApplied}
            onClick={!isApplied ? applyJob : undefined}
            className={`w-full md:w-auto px-8 py-6 text-lg font-bold rounded-xl transition-all shadow-lg ${
              isApplied 
                ? "bg-slate-700 text-slate-400 cursor-not-allowed shadow-none" 
                : "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-1 hover:shadow-teal-500/25 border-0"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      <div className="mt-10 relative z-10">
        <h1 className="border-b border-b-slate-700 font-bold py-4 text-xl text-white">
          Job Description
        </h1>
        <p className="mt-4 text-slate-300 leading-relaxed">{singleJob?.description}</p>

        {/* Job Requirements Section */}
        <div className="my-8">
          <h1 className="font-bold text-xl text-white mb-4">Job Requirements</h1>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            {singleJob?.requirements?.map((requirement, index) => (
              <li key={index} className="leading-relaxed">{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="my-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Role", value: singleJob?.title },
              { label: "Location", value: singleJob?.location },
              { label: "Experience", value: `${singleJob?.experience} years` },
              { label: "Salary", value: `${singleJob?.salary} LPA` },
              {
                label: "Total Applicants",
                value: singleJob?.application?.length,
              },
              {
                label: "Posted Date",
                value: singleJob?.createdAt?.split("T")[0],
              },
            ].map(({ label, value }) => (
              <div className="flex flex-col sm:flex-row sm:items-center py-2" key={label}>
                <span className="font-bold text-white sm:w-40">{label}:</span>
                <span className="font-medium text-slate-400 mt-1 sm:mt-0">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
