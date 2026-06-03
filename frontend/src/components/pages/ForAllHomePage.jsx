import FAQSection from "../HomePagecom/FAQSection";
import FeaturedJobsSection from "../HomePagecom/FeaturedJobsSection";
import FeaturesSection from "../HomePagecom/FeaturesSection";
import HeroSection from "../HomePagecom/Herosec";
import HowItWorksSection from "../HomePagecom/HowItWorksSection";
import JobCategoriesSection from "../HomePagecom/JobCategoriesSection";
import NewsletterSection from "../HomePagecom/NewsletterSection";
import useGetAllJobs from "../../hooks/useGetAllJobs";

export const ForAllHomePage = () => {
  useGetAllJobs();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <JobCategoriesSection />
      <FeaturedJobsSection />
      <NewsletterSection />
      <FAQSection />
    </>
  );
};
