import React from "react";

const categories = [
  { title: "Software Development", jobs: "120+ Jobs" },
  { title: "Marketing & Sales", jobs: "80+ Jobs" },
  { title: "Design & Creative", jobs: "50+ Jobs" },
  { title: "Customer Support", jobs: "40+ Jobs" },
  { title: "Finance", jobs: "30+ Jobs" },
  { title: "Education", jobs: "25+ Jobs" },
];

const JobCategoriesSection = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Explore <span className="text-[#F83002]">Job Categories</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <p className="text-gray-600">{category.jobs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategoriesSection;
