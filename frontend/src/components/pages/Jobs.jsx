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
    <div className="max-w-7xl mx-auto mt-4 px-4">
      <div className="flex gap-5">
        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden p-2 rounded-md text-slate-300 hover:bg-slate-800 transition-colors"
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
          className={`fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 p-4 w-[80%] max-w-[300px] transition-transform transform ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          } md:relative md:bg-transparent md:translate-x-0 md:w-[22%] md:block md:max-w-none`}
        >
          <FilterCard />
          {/* Close button for mobile */}
          <button
            className="absolute top-4 right-4 text-slate-400 hover:text-white md:hidden"
            onClick={toggleFilter}
          >
            ✕
          </button>
        </div>

        {/* Job Listing */}
        {filterJobs?.length === 0 ? (
          <div className="flex-1 flex items-center justify-center h-[88vh]">
            <span className="text-xl font-medium text-slate-400">Jobs Not Found</span>
          </div>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-10 pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterJobs?.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job._id}
                  className="h-full"
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
