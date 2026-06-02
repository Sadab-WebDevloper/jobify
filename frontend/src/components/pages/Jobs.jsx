import { useEffect, useState } from "react";
import FilterCard from "../FilterCard";
import Jobcard from "../Jobcard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { MenuIcon, XIcon } from "lucide-react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
function Jobs() {
  useDocumentTitle("Jobs");
  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useGetAllJobs();

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs?.filter((job) => {
        return (
          job?.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="flex gap-5">
        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600"
          onClick={toggleFilter}
        >
          {showFilter ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>

        {/* Filter Sidebar */}
        <div
          className={`fixed inset-0 bg-white z-50 p-4 w-[40%]  transition-transform transform ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:w-[22%] md:block`}
        >
          <FilterCard />
          {/* Close button for mobile */}
          <button
            className="absolute top-2 right-2 text-gray-500 md:hidden"
            onClick={toggleFilter}
          >
            ✕
          </button>
        </div>

        {/* Job Listing */}
        {filterJobs?.length === 0 ? (
          <span>Jobs Not Found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {filterJobs?.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job._id}
                >
                  <Jobcard job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
