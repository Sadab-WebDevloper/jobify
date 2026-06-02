import { useEffect, useCallback } from "react";
import { JOB_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import apiRequest from "../utils/axiosUtility";
import { setApiLoading } from "../redux/authSlice";

function useGetSingleJob(jobId) {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const fetchSingleJob = useCallback(async () => {
    try {
      dispatch(setApiLoading(true));

      const endpoint = `${JOB_API_END_POINT}/getJob/${jobId}`;
      const res = await apiRequest("GET", endpoint, {}, token);

      if (res.status === 200) {
        dispatch(setSingleJob(res.data.data));
      } else {
        dispatch(setSingleJob(null));
        console.error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching job:", error.message);
    } finally {
      dispatch(setApiLoading(false));
    }
  }, [jobId, token, dispatch]);

  useEffect(() => {
    fetchSingleJob();
  }, [fetchSingleJob]);

  // Return the refetch function for manual refresh
  return { fetchSingleJob };
}

export default useGetSingleJob;
