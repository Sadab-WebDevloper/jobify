import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Applicantstable from "./Applicantstable";
import { Button } from "@/components/ui/button"; // Adjust import based on your structure
import { ArrowLeft } from "lucide-react"; // Adjust import based on your structure
import useFetchApplicants from "../../hooks/useFetchApplicants";

function Applicants() {
  const params = useParams();
  const navigate = useNavigate(); // Use useNavigate for navigation

  useFetchApplicants(params.id);

  const { applicants } = useSelector((store) => store.application);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center my-5">
        <h1 className="font-bold text-xl">Applicants ({applicants.length})</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2 font-semibold text-gray-500"
          onClick={() => navigate(-1)} // Navigate back
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
      </div>
      <Applicantstable />
    </div>
  );
}

export default Applicants;
