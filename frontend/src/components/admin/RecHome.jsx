import { useNavigate } from "react-router-dom";
import NewsletterSection from "../HomePagecom/NewsletterSection";
// RecruiterHeroSection Component
const RecruiterHeroSection = () => {
  const navigate = useNavigate();

  const handlePostJob = () => {
    navigate("/admin/companies");
  };

  return (
    <div className="herosec relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-slate-900 text-white overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold leading-snug sm:text-5xl lg:text-6xl text-white">
          Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Top Talent</span>
          <br className="hidden sm:block" />
          in Minutes
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-300 sm:text-xl lg:text-2xl">
          Simplify your hiring process. Post jobs, review applications, and find
          the best candidates all in one place.
        </p>
        <button
          onClick={handlePostJob}
          className="mt-10 bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-4 rounded-full text-lg font-bold hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/25 transition-all"
        >
          Add Your Company
        </button>
      </div>
    </div>
  );
};

// RecruiterStats Component
const RecruiterStats = () => {
  const stats = [
    { label: "Jobs Posted", value: "1,200+" },
    { label: "Candidates Hired", value: "800+" },
    { label: "Companies Registered", value: "500+" },
  ];

  return (
    <div className="bg-slate-900 py-16 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center px-4 relative z-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-700 hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">{stat.value}</h3>
            <p className="text-slate-300 mt-3 text-lg font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// PostJobCTA Component
const PostJobCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800 text-white py-20 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10" />
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          Ready to Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Next Hire?</span>
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Post your job opening now and attract top-tier talent tailored to your needs.
        </p>
        <button
          onClick={() => navigate("/admin/jobs")}
          className="bg-gradient-to-r from-teal-500 to-emerald-500 px-10 py-4 rounded-full text-lg font-bold hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/25 transition-all"
        >
          Post a Job
        </button>
      </div>
    </div>
  );
};

// FeaturedCandidates Component
const FeaturedCandidates = () => {
  const candidates = [
    { name: "John Doe", position: "Frontend Developer", experience: "3 Years" },
    { name: "Jane Smith", position: "Data Scientist", experience: "5 Years" },
    { name: "Samuel Green", position: "UI/UX Designer", experience: "4 Years" },
  ];

  return (
    <div className="py-20 bg-slate-900 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-16 text-white">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Featured</span> Candidates
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className="bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-teal-500/10 hover:border-teal-500/30 group"
          >
            <div className="w-24 h-24 rounded-full bg-slate-700 mb-6 flex items-center justify-center text-slate-400 text-2xl font-bold border-4 border-slate-600 group-hover:border-teal-500 transition-colors">
              {candidate.name.charAt(0)}
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">{candidate.name}</h3>
            <p className="text-slate-300 mt-2 font-medium">{candidate.position}</p>
            <p className="text-slate-400 mt-1">{candidate.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// NewsletterSection Component

// HomeRecruiter Component
const HomeRecruiter = () => {
  return (
    <>
      <RecruiterHeroSection />
      <RecruiterStats />
      <PostJobCTA />
      <FeaturedCandidates />
      <NewsletterSection />
    </>
  );
};

export default HomeRecruiter;
