import { Herosection } from "../Herosection";
import CategoryCarousal from "../CategoryCarousal";
import LatestJob from "../LatestJob";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export const Home = () => {
  useDocumentTitle("Home");
  useGetAllJobs();

  return (
    <>
      <Herosection />
      <CategoryCarousal />
      <LatestJob />
    </>
  );
};
