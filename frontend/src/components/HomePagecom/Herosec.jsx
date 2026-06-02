import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative herosec text-white py-[100px] px-10 md:px-16">
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto ">
        <h1 className="text-4xl md:text-6xl font-bold mb-14  ">
          Connecting <span className="text-[#F83002]">Talent</span> with{" "}
          <span className="text-[#F83002]  ">Opportunities</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Empowering students to discover their dream careers and recruiters to
          find the perfect candidates.
        </p>

        {/* Dual Call-to-Action */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          {/* Student CTA */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-[#F83002] px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition shadow-lg"
            >
              Explore Jobs
            </button>
            <p className="mt-5 text-sm text-gray-300">
              Students, find the perfect job for you.
            </p>
          </div>

          {/* Recruiter CTA */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-[#431692] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition shadow-lg"
            >
              Post a Job
            </button>
            <p className="mt-5 text-sm text-gray-300">
              Recruiters, attract top talent with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="mt-12 mx-auto w-24 h-1 bg-[#F83002] rounded-full"></div>
    </div>
  );
};

export default HeroSection;
