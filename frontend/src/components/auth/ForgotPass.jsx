import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "../../redux/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(
    () => JSON.parse(localStorage.getItem("isOtpSent")) || false
  );
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(
    () => parseInt(localStorage.getItem("timer")) || 0
  );
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const otpRefs = useRef([]);

  useEffect(() => {
    let countdown;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          const updatedTimer = prev - 1;
          if (updatedTimer >= 0) {
            localStorage.setItem("timer", updatedTimer);
          } else {
            localStorage.removeItem("timer");
          }
          return updatedTimer;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [timer, isOtpSent]);

  useEffect(() => {
    localStorage.setItem("isOtpSent", JSON.stringify(isOtpSent));
  }, [isOtpSent]);

  const otpSend = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/forgotPass`, {
        email,
      });
      if (res.status === 200) {
        localStorage.setItem("passToken", res?.data?.data);
        toast.success(res.data.message);
        setIsOtpSent(true);
        setTimer(30);
        localStorage.setItem("timer", 30);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await otpSend();
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      otpSend();
      setTimer(60);
      localStorage.setItem("timer", 60);
    }
  };

  const handleBack = () => {
    setIsOtpSent(false);
    setEmail("");
    localStorage.removeItem("isOtpSent");
    localStorage.removeItem("timer");
    navigate("/login");
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const sotp = otp.join("");
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/verifyOtp`, { sotp });
      console.log(res);
      
      if (res.status === 200) {
        toast.success("OTP Verified!");
        localStorage.removeItem("isOtpSent");
        localStorage.removeItem("timer");
        navigate("/forgotPass/NewPassword");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-900 overflow-hidden relative">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-700 relative z-10 animate-fade-in-up">
        {!isOtpSent ? (
          <>
            <h2 className="text-3xl font-extrabold mb-4 text-white text-center">Forgot Password</h2>
            <p className="text-slate-400 mb-8 text-center text-lg">
              Enter your email address to receive a 6-digit code.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full p-4 bg-slate-900 border border-slate-700 text-white rounded-xl mb-6 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
            />
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={handleBack}
                className="w-full sm:w-1/3 bg-slate-900 text-slate-300 border border-slate-700 py-3 rounded-xl hover:bg-slate-700 hover:text-white transition-colors font-bold"
              >
                Back
              </button>
              <button
                onClick={handleEmailSubmit}
                className="w-full sm:w-2/3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 transition-all flex justify-center items-center"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold mb-4 text-white text-center">Verify OTP</h2>
            <p className="text-slate-400 mb-8 text-center text-lg">
              Enter the 6-digit code sent to your email.
            </p>
            <div className="flex justify-center gap-2 sm:gap-3 mb-8">
              {otp.map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      otpRefs.current[index - 1]?.focus();
                    }
                  }}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-slate-900 text-white border border-slate-700 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                />
              ))}
            </div>
            <div className="mb-8 text-center">
              {timer > 0 ? (
                <p className="text-slate-400 font-medium">Resend OTP in <span className="text-teal-400">{timer}</span> seconds</p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-teal-400 hover:text-emerald-400 font-bold transition-colors"
                >
                  Resend OTP
                </button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={handleBack}
                className="w-full sm:w-1/3 bg-slate-900 text-slate-300 border border-slate-700 py-3 rounded-xl hover:bg-slate-700 hover:text-white transition-colors font-bold"
              >
                Back
              </button>
              <button
                onClick={verifyOtp}
                className="w-full sm:w-2/3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/25 transition-all flex justify-center items-center"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
