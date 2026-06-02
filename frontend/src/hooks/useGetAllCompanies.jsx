import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { setAllCompanies } from "../redux/companySlice";
import apiRequest from "../utils/axiosUtility";
import { setApiLoading } from "../redux/authSlice";

function useGetAllCompanies() {
  const { token, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      const endpoint = `${COMPANY_API_END_POINT}/getCompany`;
      try {
        dispatch(setApiLoading(true));

        const res = await apiRequest("GET", endpoint, {}, token);

        if (res.status === 200) {
          dispatch(setAllCompanies(res.data.data));
        } else {
          dispatch(setAllCompanies([]));
        }
      } catch (error) {
        dispatch(setAllCompanies([]));
        console.error("Error fetching companies:", error);
      } finally {
        dispatch(setApiLoading(false));
      }
    };

    if (authUser) {
      fetchAllCompanies();
    }
  }, [token, authUser, dispatch]);
}

export default useGetAllCompanies;
