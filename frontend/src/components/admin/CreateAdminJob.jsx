import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import apiRequest from "../../utils/axiosUtility";

function CreateAdminJob() {
  const { allCompanies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: 1,
    position: 0,
    company: "",
  });
  const { token } = useSelector((store) => store.auth);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = allCompanies.find(
      (company) => company.name.toLowerCase() === value
    );

    setInput({
      ...input,
      company: selectedCompany._id,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = `${JOB_API_END_POINT}/postjob`;

      const res = await apiRequest("POST", endpoint, input, token);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
        setLoading(false);
      }
      setInput({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: 1,
        position: 0,
        company: "",
      });
    } catch (error) {
      console.error("Error submitting the job:", error);
      setError("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10 px-4 bg-slate-900">
      <form
        onSubmit={submitHandler}
        className="p-8 max-w-4xl w-full bg-slate-800/80 backdrop-blur-md border border-slate-700 shadow-2xl rounded-3xl animate-fade-in-up"
      >
        <div className="flex items-center mb-8 border-b border-slate-700 pb-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-semibold text-slate-300 border-slate-600 hover:bg-slate-700 bg-slate-900 transition-colors mr-6"
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              navigate(-1);
            }}
          >
            <ArrowLeft className="w-4 h-4" /> <span>Back</span>
          </Button>
          <h1 className="text-3xl font-extrabold text-white">Post New Job</h1>
        </div>
        
        {error && <p className="text-red-400 font-medium mb-6 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-slate-300 font-medium">Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
            />
          </div>

          <div>
            <Label className="text-slate-300 font-medium">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
            />
          </div>

          <div>
            <Label className="text-slate-300 font-medium">Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
              placeholder="Comma separated..."
            />
          </div>

          <div>
            <Label className="text-slate-300 font-medium">Salary (LPA)</Label>
            <Input
              type="number"
              placeholder="e.g. 12"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
            />
          </div>

          <div>
            <Label className="text-slate-300 font-medium">Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
            />
          </div>

          <div>
            <Label className="text-slate-300 font-medium">Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
              placeholder="e.g. Full Time"
            />
          </div>

          <div>
            <Label className="text-slate-300 font-medium">No Of Positions</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
            />
          </div>

          <div>
            <Label className="text-slate-300 font-medium">Experience Level (Years)</Label>
            <Input
              type="number"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-colors"
            />
          </div>
        </div>

        <div className="mt-6 mb-8">
          <Label className="text-slate-300 font-medium block mb-2">Company</Label>
          {allCompanies.length > 0 ? (
            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-full bg-slate-900 border-slate-700 text-slate-200 focus:ring-teal-500 transition-colors">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                <SelectGroup>
                  {allCompanies.map((c) => (
                    <SelectItem key={c._id} value={c?.name?.toLowerCase()} className="hover:bg-slate-700 cursor-pointer">
                      {c?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
             <div className="bg-slate-900 border border-slate-700 p-4 rounded-md text-slate-400">
               No companies found. Please register a company first.
             </div>
          )}
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/25 transition-all border-0 py-6 text-lg rounded-xl" 
          disabled={loading || allCompanies.length === 0}
        >
          {loading ? "Posting..." : "Post Job"}
        </Button>
        {allCompanies.length === 0 && (
          <p className="text-sm text-red-400 font-bold text-center mt-4">
            *Please Register a Company First before Posting New Jobs
          </p>
        )}
      </form>
    </div>
  );
}

export default CreateAdminJob;
