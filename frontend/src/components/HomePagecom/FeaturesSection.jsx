import { FaBriefcase, FaUserGraduate, FaHandshake } from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaBriefcase size={48} className="text-[#431692] mb-4" />,
      title: "For Recruiters",
      description:
        "Post job openings, find top talent, and simplify your hiring process with ease.",
    },
    {
      icon: <FaUserGraduate size={48} className="text-[#431692] mb-4" />,
      title: "For Students",
      description:
        "Explore job opportunities, connect with recruiters, and kickstart your career.",
    },
    {
      icon: <FaHandshake size={48} className="text-[#431692] mb-4" />,
      title: "Networking",
      description:
        "Build meaningful connections and foster professional growth in your field.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Jobify</span>?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
