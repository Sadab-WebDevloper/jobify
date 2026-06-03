import Jobcard from "../Jobcard";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSearchedQuery } from "../../redux/jobSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function Browse() {
  useDocumentTitle("Browse Jobs");
  const { allJobs } = useSelector((store) => store.job);
  useGetAllJobs();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery("")); // Reset the searchedQuery when leaving the page
    };
  }, [dispatch]);

  return (
    <>
      <div className="max-w-7xl mx-auto my-10 px-4">
        {allJobs && allJobs?.length > 0 ? (
          <>
            <h1 className="font-extrabold text-2xl my-10 text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Search Results</span> 
              <span className="text-slate-500 text-lg">({allJobs?.length})</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs?.map((job, index) => (
                <div key={index} className="h-full">
                  <Jobcard job={job} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-center font-bold text-3xl text-slate-300">No Jobs Found</h1>
            <p className="text-slate-500 mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Browse;
