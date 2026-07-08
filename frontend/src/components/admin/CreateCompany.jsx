/* eslint-disable no-unused-vars */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../utils/axiosUtility";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const registerNewCompany = async () => {
    try {
      const endpoint = `${COMPANY_API_END_POINT}/registerCompany`;

      const res = await apiRequest("POST", endpoint, { companyName }, token);

      if (res.data.success) {
        toast.success(res.data.message);

        navigate(`/admin/companies/${res.data.data._id}`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-slate-800/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-700 animate-fade-in-up">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Your Company Name</h1>
          <p className="text-slate-400 text-lg">
            What Would You Like To Give Your Company Name? You can Change This
            Later
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Label className="text-slate-300 font-medium text-lg block mb-3">Company Name</Label>
          <Input
            type="text"
            className="w-full bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-teal-500 focus-visible:border-teal-500 py-6 text-lg rounded-xl transition-all"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Google, Microsoft, JobHunt..."
          />
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate("/recruiter/home")}
              className="w-full sm:w-auto px-8 py-6 text-lg font-bold bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white transition-colors rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={registerNewCompany}
              className="w-full sm:w-auto px-10 py-6 text-lg font-bold bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-400 hover:to-emerald-400 border-0 rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/25 transition-all"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
