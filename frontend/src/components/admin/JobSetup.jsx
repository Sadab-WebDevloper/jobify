import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import { toast } from "sonner";
import useGetSingleJob from "../../hooks/useGetSingleJob";
import { JOB_API_END_POINT } from "../../utils/constant";
import { ArrowLeft } from "lucide-react"; // Import the back arrow icon
import apiRequest from "../../utils/axiosUtility";

function JobSetup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const jobId = params.id;

  // Custom hook to fetch single job
  useGetSingleJob(jobId);
  const { singleJob } = useSelector((state) => state.job);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    position: "",
    experience: "",
  });

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements.join(", ") || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        position: singleJob.position || "",
        experience: singleJob.experience || "",
      });
    }
  }, [singleJob]);
  const { token } = useSelector((store) => store.auth);

  const changeEventHandler = ({ target: { name, value } }) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const openDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const endpoint = `${JOB_API_END_POINT}/updateJob/${jobId}`;
      const res = await apiRequest("PUT", endpoint, input, token);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async () => {
    try {
      setLoading(true);
      const endpoint = `${JOB_API_END_POINT}/deleteJob/${params.id}`;

      const res = await apiRequest("DELETE", endpoint, {}, token);

      if (res.status === 200) {
        toast.success("Job Deleted Successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10 px-4 bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="p-8 max-w-4xl w-full bg-slate-800/80 backdrop-blur-md border border-slate-700 shadow-2xl rounded-3xl animate-fade-in-up"
      >
        <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 font-semibold text-slate-300 border-slate-600 hover:bg-slate-700 bg-slate-900 transition-colors"
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                navigate(-1);
              }}
            >
              <ArrowLeft className="w-4 h-4" /> <span>Back</span>
            </Button>
            <h1 className="text-3xl font-extrabold text-white">Job Setup</h1>
          </div>
          <Button
            variant="outline"
            className="text-red-400 border-red-500/30 hover:bg-red-500 hover:text-white transition-colors bg-slate-900"
            onClick={openDeleteModal}
          >
            DELETE
          </Button>
        </div>

        {error && <p className="text-red-400 font-medium mb-6 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(input).map((key) => (
            <div key={key}>
              <Label className="text-slate-300 font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <Input
                type={
                  key === "salary" || key === "experience" || key === "position"
                    ? "number"
                    : "text"
                }
                name={key}
                value={input[key]}
                onChange={changeEventHandler}
                className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
                required
                disabled={loading}
              />
            </div>
          ))}
        </div>
        <Button 
          className="w-full mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/25 transition-all border-0 py-6 text-lg rounded-xl" 
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Job"}
        </Button>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Delete"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#0f172a", // slate-900
            border: "1px solid #334155", // slate-700
            borderRadius: "16px",
            color: "white",
            padding: "24px",
            maxWidth: "400px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(4px)",
          }
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Are you sure you want to delete this job?
        </h2>
        <p className="text-slate-400 text-center mb-6">
          This action will also permanently remove all associated applications.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={closeDeleteModal} variant="outline" className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
            Cancel
          </Button>
          <Button onClick={deleteJob} className="bg-red-600 hover:bg-red-500 text-white border-0">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default JobSetup;
