import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LatestJobCards from "./LatestJobCards";
import { Lock } from "lucide-react";

function LatestJob() {
  const { allJobs } = useSelector((state) => state.job);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto my-24 px-6 relative z-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 animate-fade-in-up text-white drop-shadow-md">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {allJobs?.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center justify-center py-16 px-6 bg-slate-800/50 backdrop-blur-md rounded-2xl animate-fade-in-up shadow-xl shadow-slate-900/50 border border-slate-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
            
            <div className="p-4 bg-slate-900 border border-slate-700 shadow-inner text-teal-400 rounded-full mb-6">
              <Lock size={32} />
            </div>
            <p className="text-2xl font-bold text-white mb-2 text-center">
              Login to view premium jobs
            </p>
            <p className="text-slate-400 mb-8 text-center max-w-md">
              Unlock exclusive access to the latest job opportunities curated just for you.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-teal-500/30 border-0 hover:from-teal-400 hover:to-emerald-400"
            >
              Log In Now
            </button>
          </div>
        ) : (
          allJobs
            ?.slice(0, 6)
            ?.map((job, idx) => (
              <div key={job._id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                 <LatestJobCards job={job} />
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default LatestJob;
