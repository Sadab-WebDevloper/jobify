/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";

function Jobcard({ job }) {
  const daysAgo = (mongoTime) => {
    const timeDifference = new Date() - new Date(mongoTime);
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const minutes = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 1000)
    );

    if (days < 1) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  const navigate = useNavigate();

  return (
    <div className="rounded-xl p-6 shadow-lg bg-white border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors duration-500" />

      <div>
        {/* Top Section: Job Date and Bookmark */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="bg-gray-100 text-gray-500 hover:bg-gray-200 text-xs font-medium px-2 py-1">
            {daysAgo(job?.createdAt)}
          </Badge>
          <Button
            variant="ghost"
            className="rounded-full w-8 h-8 p-0 text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
            size="icon"
            aria-label="Bookmark Job"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>

        {/* Middle Section: Company Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 my-2">
          <div className="p-1 rounded-xl bg-gray-50 border border-gray-100 shadow-sm group-hover:border-primary/30 transition-colors">
            <Avatar className="w-14 h-14 rounded-lg">
              <AvatarImage
                src={job?.company?.logo || "default-logo.png"}
                alt="Company Logo"
                className="object-contain"
              />
            </Avatar>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-primary transition-colors">
              {job?.company?.name || "Unknown Company"}
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-0.5"> {job?.location} </p>
          </div>
        </div>

        {/* Job Title and Description */}
        <div className="mt-4">
          <h1 className="font-bold text-xl md:text-2xl my-2 text-gray-900">{job?.title}</h1>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{job?.description}</p>
        </div>
      </div>

      <div>
        {/* Badges Section */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <Badge className="bg-blue-50 text-blue-600 border border-blue-100 font-semibold hover:bg-blue-100 rounded-md px-3 py-1">
            {job?.position} Positions
          </Badge>
          <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-semibold hover:bg-emerald-100 rounded-md px-3 py-1">
            {job?.salary} LPA
          </Badge>
          <Badge className="bg-purple-50 text-purple-600 border border-purple-100 font-semibold hover:bg-purple-100 rounded-md px-3 py-1">
            {job?.jobType}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-3 mt-6">
          <Button
            onClick={() => navigate(`/jobs/jobDetails/${job._id}`)}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all font-semibold rounded-lg"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Jobcard;
