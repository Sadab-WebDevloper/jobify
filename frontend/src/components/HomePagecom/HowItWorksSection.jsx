import React from "react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create an account to get started.",
    },
    {
      step: 2,
      title: "Post or Apply",
      description: "Post jobs or apply for them easily.",
    },
    {
      step: 3,
      title: "Get Connected",
      description: "Collaborate and grow your network.",
    },
  ];

  return (
    <div className="bg-[white]py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {steps.map((step) => (
          <div key={step.step} className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-[#431692] text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
              {step.step}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
