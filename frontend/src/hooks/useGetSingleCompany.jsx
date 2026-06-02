import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setSingleComapny } from "../redux/companySlice"; // Corrected spelling
import apiRequest from "../utils/axiosUtility";
import { setApiLoading } from "../redux/authSlice";

function useGetSingleCompany(companyId) {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth); // Get token from auth state
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        dispatch(setApiLoading(true));
        const endpoint = `${COMPANY_API_END_POINT}/getCompany/${companyId}`;

        const res = await apiRequest("GET", endpoint, {}, token);

        if (res.status === 200) {
          dispatch(setSingleComapny(res.data.data)); // Corrected spelling
        } else {
          dispatch(setSingleComapny(null));
          console.error(`Error: ${res.status}`);
        }
      } catch (error) {
        console.error("Error fetching company:", error.message);
      } finally {
        dispatch(setApiLoading(false));
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch, token]);
}

export default useGetSingleCompany;
