/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

function LatestJobCards({ job }) {
  const navigate = useNavigate();

  // Destructure job properties
  const { _id, company, title, description, position, salary, jobType } = job;

  return (
    <div
      onClick={() => navigate(`/jobs/jobDetails/${_id}`)}
      role="button"
      aria-label={`View details for ${title} at ${company?.name}`}
      className="p-6 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

      <div>
        <div>
          <h1 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{company?.name}</h1>
          <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" /> India
          </p>
        </div>
        <div className="mt-4">
          <h1 className="font-bold text-xl my-2 text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-gray-50">
        <Badge className="bg-blue-50 text-blue-600 border border-blue-100 font-semibold hover:bg-blue-100 rounded-md px-3 py-1">
          {position} Positions
        </Badge>
        <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-semibold hover:bg-emerald-100 rounded-md px-3 py-1">
          {salary} LPA
        </Badge>
        <Badge className="bg-purple-50 text-purple-600 border border-purple-100 font-semibold hover:bg-purple-100 rounded-md px-3 py-1">
          {jobType}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
