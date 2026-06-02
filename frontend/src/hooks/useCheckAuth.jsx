import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthUser, setAuthUser, setLoading } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";
import apiRequest from "../utils/axiosUtility";

function useCheckAuth() {
  const dispatch = useDispatch();
  const { token, authUser } = useSelector((store) => store.auth);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const endpoint = `${USER_API_END_POINT}/me`;
        const res = await apiRequest("GET", endpoint, {}, token);

        if (res?.data?.user) {
          dispatch(setAuthUser(res.data.user));
        } else {
          dispatch(clearAuthUser());
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        dispatch(clearAuthUser());
      }
    };

    if (authUser) {
      checkAuth;
    }
  }, [dispatch, token, authUser]);
}

export default useCheckAuth;
