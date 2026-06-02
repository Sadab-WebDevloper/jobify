import { useNavigate } from "react-router-dom";
import NewsletterSection from "../HomePagecom/NewsletterSection";
// RecruiterHeroSection Component
const RecruiterHeroSection = () => {
  const navigate = useNavigate();

  const handlePostJob = () => {
    navigate("/admin/companies");
  };

  return (
    <div className="herosec relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-cover bg-center bg-gray-800 text-white">
      <h1 className="text-4xl font-extrabold leading-snug sm:text-5xl lg:text-6xl">
        Find <span className="text-[#F83002]">Top Talent</span>
        <br className="hidden sm:block" />
        in Minutes
      </h1>
      <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300 sm:text-xl lg:text-2xl">
        Simplify your hiring process. Post jobs, review applications, and find
        the best candidates all in one place.
      </p>
      <button
        onClick={handlePostJob}
        className="mt-8 bg-[#F83002] px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition"
      >
        Add Your Company
      </button>
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
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-bold text-[#F83002]">{stat.value}</h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
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
    <div className="bg-[#431692] text-white py-16 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Find Your <span className="text-[#F83002]">Next Hire?</span>
      </h2>
      <p className="text-lg mb-6">
        Post your job opening now and attract top-tier talent tailored to your
        needs.
      </p>
      <button
        onClick={() => navigate("/admin/jobs")}
        className="bg-[#F83002] px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition"
      >
        Post a Job
      </button>
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
    <div className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12">
        <span className="text-[#F83002]">Featured</span> Candidates
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gray-300 mb-4"></div>
            <h3 className="text-xl font-semibold">{candidate.name}</h3>
            <p className="text-gray-600">{candidate.position}</p>
            <p className="text-gray-400">{candidate.experience}</p>
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
