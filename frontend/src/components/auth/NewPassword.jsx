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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-700 relative z-10 animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">
          Set New Password
        </h2>
        <form onSubmit={handleSubmit}>
          {/* New Password Field */}
          <div className="mb-6 relative">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="new-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="block w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors sm:text-sm"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center top-[30px] text-slate-400 hover:text-white transition-colors"
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
          <div className="mb-8 relative">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              onChange={(e) => setconfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="block w-full px-4 py-3 bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors sm:text-sm"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center top-[30px] text-slate-400 hover:text-white transition-colors"
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
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-xl hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 transition-all flex justify-center items-center"
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
