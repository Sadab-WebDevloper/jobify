import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative py-28 px-6 md:px-12 overflow-hidden bg-slate-950"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(2, 6, 23, 0.98)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <span className="inline-block py-1.5 px-5 rounded-full bg-white/5 text-gray-300 font-medium text-sm mb-8 tracking-wide shadow-sm border border-white/10 backdrop-blur-md">
          🌟 The Ultimate Career Catalyst
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-white">
          Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F83002] to-orange-500">Ambition</span> Meets{" "}
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Opportunity</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Launch your dream career or build an unstoppable team. We bridge the gap between emerging talent and world-class companies.
        </p>

        {/* Dual Call-to-Action */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          {/* Student CTA */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#F83002] to-[#e02802] text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(248,48,2,0.3)] hover:shadow-[0_0_30px_rgba(248,48,2,0.5)] hover:-translate-y-1 w-full sm:w-auto"
            >
              Find Your Dream Job
            </button>
            <p className="mt-3 text-sm text-slate-400 font-medium">
              Students, your next big break awaits.
            </p>
          </div>

          {/* Recruiter CTA */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto backdrop-blur-sm shadow-sm"
            >
              Hire Top Talent
            </button>
            <p className="mt-3 text-sm text-slate-400 font-medium">
              Recruiters, build your dream team.
            </p>
          </div>
        </div>

        {/* Trust Indicators / Stats */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-center gap-10 sm:gap-20 relative">
          <div>
            <h3 className="text-3xl font-bold text-white">10k+</h3>
            <p className="text-slate-400 text-sm mt-1">Active Jobs</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">500+</h3>
            <p className="text-slate-400 text-sm mt-1">Top Companies</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">2M+</h3>
            <p className="text-slate-400 text-sm mt-1">Job Seekers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
