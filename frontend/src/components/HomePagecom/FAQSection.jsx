import { useState } from "react";

const faqs = [
  {
    question: "How do I apply for jobs?",
    answer:
      "Sign up for an account, create a complete profile with your skills and experience, and browse job listings. Use filters to narrow your search and apply directly with one click.",
  },
  {
    question: "Is this platform free?",
    answer:
      "Yes, the platform is free for job seekers. You can explore jobs, apply to multiple opportunities, and manage your applications without any charges.",
  },
  {
    question: "How do I contact recruiters?",
    answer:
      "Once you've applied to a job, recruiters can contact you directly. Additionally, you may receive messages from recruiters if your profile matches their requirements.",
  },
];

const FAQSection = () => {    
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Frequently Asked <span className="text-[#F83002]">Questions</span>
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Question */}
            <div
              className="flex justify-between items-center p-6 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {faq.question}
              </h3>
              <span
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>
            {/* Answer */}
            {activeIndex === index && (
              <div className="px-6 pb-6 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
