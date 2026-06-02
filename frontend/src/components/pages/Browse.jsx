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
      <div className="max-w-7xl mx-auto my-10">
        {allJobs && allJobs?.length > 0 ? (
          <>
            <h1 className="font-bold text-xl my-10">
              Search Results ({allJobs?.length})
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
              {allJobs?.map((job, index) => (
                <div key={index}>
                  <Jobcard job={job} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center font-bold text-[26px]">NO JOBS FOUND</h1>
          </>
        )}
      </div>
    </>
  );
}

export default Browse;
