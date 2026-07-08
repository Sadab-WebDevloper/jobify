import { Search, Briefcase, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

// eslint-disable-next-line react/prop-types
const AnimatedNumber = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(easeOut * end));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

export const Herosection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchedQuery(query));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] gap-8 px-4 text-center overflow-hidden bg-slate-900">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-slate-900">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <span className="px-6 py-2.5 mx-auto text-sm font-semibold tracking-wider text-teal-400 bg-teal-500/10 rounded-full border border-teal-500/20 shadow-[0_0_15px_rgba(45,212,191,0.2)] animate-fade-in-up">
        Transform Your Career Today 🚀
      </span>

      <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Dream Job</span>{" "}
        <br className="hidden sm:block" />
        in Just a Few Clicks
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg text-slate-300 sm:text-xl animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
        Whether you’re starting your career or aiming higher, we connect you to
        opportunities that match your skills and aspirations.
      </p>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 mb-8 animate-fade-in-up relative z-10" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-4 px-8 py-4 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl shadow-slate-900/50 hover:-translate-y-1 transition-transform">
          <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400 shadow-inner"><Briefcase size={28} /></div>
          <div className="text-left">
            <h4 className="font-bold text-2xl text-white"><AnimatedNumber end={10} suffix="k+" /></h4>
            <p className="text-sm text-slate-400 font-medium">Active Jobs</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-8 py-4 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl shadow-slate-900/50 hover:-translate-y-1 transition-transform">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 shadow-inner"><Users size={28} /></div>
          <div className="text-left">
            <h4 className="font-bold text-2xl text-white"><AnimatedNumber end={500} suffix="+" /></h4>
            <p className="text-sm text-slate-400 font-medium">Top Companies</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-8 py-4 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl shadow-slate-900/50 hover:-translate-y-1 transition-transform">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shadow-inner"><TrendingUp size={28} /></div>
          <div className="text-left">
            <h4 className="font-bold text-2xl text-white"><AnimatedNumber end={2} suffix="M+" /></h4>
            <p className="text-sm text-slate-400 font-medium">Job Seekers</p>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full gap-2 px-3 py-2 mx-auto bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-full shadow-2xl focus-within:ring-2 focus-within:ring-teal-500/50 sm:w-[70%] md:w-[60%] lg:w-[50%] transition-all duration-300 hover:shadow-teal-500/20 animate-fade-in-up z-10" style={{ animationDelay: '0.4s' }}>
        <Search className="w-6 h-6 ml-3 text-slate-400" />
        <input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter job title, skills, or company"
          className="w-full p-3 text-base text-white placeholder-slate-400 bg-transparent border-none outline-none font-medium"
        />
        <Button
          className="px-8 py-6 text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 hover:scale-105 shadow-lg shadow-teal-500/25 font-semibold text-lg border-0"
          onClick={searchJobHandler}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

