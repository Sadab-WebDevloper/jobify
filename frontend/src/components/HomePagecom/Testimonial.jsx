import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "This platform helped me find my first job in just two weeks! Highly recommended.",
      name: "John Doe, Student",
    },
    {
      quote:
        "We've hired exceptional candidates through this platform. The process is seamless.",
      name: "Jane Smith, Recruiter",
    },
    {
      quote:
        "A game-changer for job seekers and recruiters alike. Easy to use and very effective.",
      name: "Alice Brown, HR Manager",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-lg p-6 text-center"
          >
            <p className="text-gray-600 italic mb-4">{`"${testimonial.quote}"`}</p>
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
