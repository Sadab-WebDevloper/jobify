import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { Loader2 } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("passToken");
    console.log(token);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/resetPassword`, {
        password,
        confirmPassword,
        token,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Set New Password
        </h2>
        <form onSubmit={handleSubmit}>
          {/* New Password Field */}
          <div className="mb-4 relative">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="new-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center mt-5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              onChange={(e) => setconfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center mt-5 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
