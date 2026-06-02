import { Search, Briefcase, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

export const Herosection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(query));
    if (query) {
      navigate("/browse");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] gap-8 px-4 text-center overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <span className="px-6 py-2.5 mx-auto text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 shadow-sm animate-fade-in-up">
        Transform Your Career Today 🚀
      </span>

      <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Dream Job</span>{" "}
        <br className="hidden sm:block" />
        in Just a Few Clicks
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Whether you’re starting your career or aiming higher, we connect you to
        opportunities that match your skills and aspirations.
      </p>

      <div className="flex items-center w-full gap-2 px-3 py-2 mx-auto mt-6 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-2xl focus-within:ring-2 focus-within:ring-primary/50 sm:w-[70%] md:w-[60%] lg:w-[50%] transition-all duration-300 hover:shadow-primary/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <Search className="w-6 h-6 ml-3 text-gray-400" />
        <input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter job title, skills, or company"
          className="w-full p-3 text-base text-gray-800 placeholder-gray-400 bg-transparent border-none outline-none font-medium"
        />
        <Button
          className="px-8 py-6 text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:scale-105 shadow-lg font-semibold text-lg"
          onClick={searchJobHandler}
        >
          Search
        </Button>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-3 bg-primary/10 rounded-xl text-primary"><Briefcase size={24} /></div>
          <div className="text-left">
            <h4 className="font-bold text-xl text-gray-900">10k+</h4>
            <p className="text-sm text-gray-500 font-medium">Active Jobs</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-3 bg-secondary/10 rounded-xl text-secondary"><Users size={24} /></div>
          <div className="text-left">
            <h4 className="font-bold text-xl text-gray-900">50k+</h4>
            <p className="text-sm text-gray-500 font-medium">Talented Pros</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500"><TrendingUp size={24} /></div>
          <div className="text-left">
            <h4 className="font-bold text-xl text-gray-900">1k+</h4>
            <p className="text-sm text-gray-500 font-medium">Top Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

