const jobs = [
  {
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$50k - $70k",
  },
  {
    title: "Marketing Manager",
    company: "Creative Studio",
    location: "New York, NY",
    salary: "$60k - $90k",
  },
  {
    title: "UI/UX Designer",
    company: "Designify",
    location: "San Francisco, CA",
    salary: "$70k - $100k",
  },
  {
    title: "Customer Support Specialist",
    company: "HelpDesk Co.",
    location: "Austin, TX",
    salary: "$40k - $50k",
  },
];

const FeaturedJobsSection = () => {
  return (
    <div className="py-16 px-6 md:px-16 bg-[#ffffff]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Featured <span className="text-[#F83002]">Jobs</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500">{job.location}</p>
            <p className="text-gray-700 font-bold">{job.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobsSection;
