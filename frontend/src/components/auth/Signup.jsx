import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { setLoading } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Eye, EyeOff } from "lucide-react";
import * as Yup from "yup";
import apiRequest from "../../utils/axiosUtility";
import { Mail, Lock, User, Upload } from "lucide-react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { countryData } from "../../utils/countryData";

export const Signup = () => {
  useDocumentTitle("Sign Up");
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    countryCode: "IN",
    dialCode: "+91",
    password: "",
    role: "student", // Default role
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .test('len', 'Invalid phone number length for selected country', function(val) {
        const { countryCode } = this.parent;
        const currentCountry = countryData.find(c => c.code === countryCode);
        const reqLen = currentCountry ? currentCountry.maxLength : 15;
        if (val) return val.length === reqLen;
        return false;
      }),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: Yup.string().oneOf(
      ["student", "recruiter", "other"],
      "Role is required"
    ),
  });

  const { loading, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      // Limit to 2MB
      toast.error("File size must be less than 2MB.");
    } else {
      setInput((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(input, { abortEarly: false });
      const formData = new FormData();
      Object.keys(input).forEach((key) => {
        formData.append(key, input[key]);
      });

      dispatch(setLoading(true));
      const endpoint = `${USER_API_END_POINT}/register`;
      const res = await apiRequest("POST", endpoint, formData);

      toast.success(`${res.data.message}`, {
        duration: 1500,
        position: "top-center",
        style: {
          backgroundColor: "green",
          color: "white",
          borderRadius: "8px",
        },
      });
      navigate("/login");
    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(newErrors);
      } else {
        toast.error(
          error?.response?.data?.message || "An error occurred during signup"
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={`flex h-screen transition-all duration-700 ease-in-out bg-slate-900`}>
      {/* Left Section */}
      <div className={`w-full hidden sm:flex sm:w-1/2 p-12 text-white flex-col items-center justify-center relative overflow-hidden transition-all duration-700 bg-slate-900/50`}>
        {/* Dynamic Background Effects */}
        {input.role === "recruiter" ? (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse delay-1000"></div>
          </>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-teal-400/10 to-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        )}

        {/* Dynamic Content */}
        <div className={`relative z-10 transition-all duration-500 transform ${input.role ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'}`}>
          <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow-lg leading-tight">
            {input.role === "recruiter" ? (
              <>Empower Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Company's Future</span></>
            ) : input.role === "student" ? (
              <>Unlock Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-200">Career Potential</span></>
            ) : (
              <>Welcome to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-100">Jobify</span></>
            )}
          </h1>

          <p className="text-xl leading-relaxed text-center max-w-md drop-shadow-md text-gray-200 font-light mx-auto">
            {input.role === "recruiter" 
              ? "Access elite talent, manage applications seamlessly, and build the ultimate team for your organization."
              : input.role === "student"
              ? "Discover incredible opportunities, apply with a single click, and take the next big step in your career."
              : "Register to explore exciting job opportunities or manage your job postings."}
          </p>
        </div>

        {/* Decorative Divider */}
        <div className={`mt-10 h-1.5 rounded-full transition-all duration-700 ease-in-out ${
          input.role === "recruiter" ? "w-32 bg-gradient-to-r from-purple-500 to-blue-500" : "w-24 bg-white/80"
        }`}></div>
      </div>

      {/* Right Section - Signup Form */}
      <div className={`w-full sm:w-1/2 flex items-center justify-center relative transition-all duration-500 bg-slate-800 shadow-[-20px_0_40px_rgba(0,0,0,0.3)] z-20`}>
        <div className="w-full max-h-screen overflow-y-auto px-4 py-4 custom-scrollbar flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className={`sm:w-[460px] w-full mx-auto p-6 sm:p-8 space-y-4 transform transition-all duration-500 ease-in-out rounded-3xl relative z-10 bg-slate-900 border border-slate-700 shadow-2xl ${
            input.role === "recruiter" ? "shadow-purple-900/20" : "shadow-teal-900/20"
          }`}
        >
          <div className="text-center mb-6">
            <h1 className={`font-extrabold text-3xl tracking-wide mb-2 ${
              input.role === "recruiter" 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400" 
                : "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
            }`}>
              {input.role === "recruiter" ? "Recruiter Registration" : input.role === "student" ? "Student Registration" : "Create an Account"}
            </h1>
            <p className="text-sm text-slate-400">
              Start exploring opportunities tailored for you.
            </p>
          </div>

          {/* Role Selection */}
          <div className={`p-1 rounded-xl flex gap-1 transition-all duration-300 bg-slate-800 border border-slate-700`}>
            <label className={`flex-1 cursor-pointer text-center py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              input.role === "student" 
                ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md transform scale-[1.02]" 
                : "text-slate-400 hover:text-slate-200"
            }`}>
              <input type="radio" name="role" value="student" className="hidden" checked={input.role === "student"} onChange={handleChange} />
              Student
            </label>
            <label className={`flex-1 cursor-pointer text-center py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              input.role === "recruiter" 
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md transform scale-[1.02]" 
                : "text-slate-400 hover:text-slate-200"
            }`}>
              <input type="radio" name="role" value="recruiter" className="hidden" checked={input.role === "recruiter"} onChange={handleChange} />
              Recruiter
            </label>
          </div>
          {errors.role && <p className="text-red-500 text-xs mt-1 font-medium">{errors.role}</p>}

          <div className="space-y-3 mt-4">
            {["fullname", "email", "phoneNumber", "password"].map(
              (field, idx) => (
                <div key={field} className={`relative ${field === "phoneNumber" ? "z-20" : "z-0"}`}>
                  <Label
                    htmlFor={field}
                    className="block mb-1 text-xs font-semibold ml-1 text-slate-300"
                  >
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, " $1")}
                  </Label>
                  <div className="flex items-center relative">
                    {field !== "phoneNumber" && field !== "password" && (
                      <span className="absolute left-3 text-slate-500 z-10">
                        {idx === 0 ? <User size={16} /> : <Mail size={16} />}
                      </span>
                    )}
                    {field === "phoneNumber" ? (
                      <div className="flex w-full relative z-20">
                        <div className="relative flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center justify-center h-[42px] px-3 border border-r-0 border-slate-700 rounded-l-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <span className="mr-1 text-lg">{countryData.find(c => c.code === input.countryCode)?.flag}</span>
                            <span className="text-xs font-medium text-slate-300">{countryData.find(c => c.code === input.countryCode)?.dialCode}</span>
                            <span className="ml-1 text-[10px] text-slate-500">▼</span>
                          </button>
                          
                          {showDropdown && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
                              
                              <div className="absolute top-full left-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 max-h-64 flex flex-col overflow-hidden">
                                <div className="p-2 border-b border-slate-700 bg-slate-900/50">
                                  <input 
                                    type="text" 
                                    placeholder="Search country..." 
                                    className="w-full px-3 py-2 text-sm border border-slate-700 rounded-lg bg-slate-800 focus:outline-none focus:border-purple-500 text-white placeholder-slate-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                <div className="overflow-y-auto flex-1 custom-scrollbar">
                                  {countryData.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.dialCode.includes(searchQuery)).map((country) => (
                                    <div 
                                      key={country.code}
                                      className="flex items-center px-4 py-2.5 hover:bg-slate-700 cursor-pointer text-white transition-colors"
                                      onClick={() => {
                                        setInput(prev => ({ ...prev, countryCode: country.code, dialCode: country.dialCode, phoneNumber: "" }));
                                        setShowDropdown(false);
                                        setSearchQuery("");
                                      }}
                                    >
                                      <span className="mr-3 text-xl">{country.flag}</span>
                                      <span className="flex-1 text-sm">{country.name}</span>
                                      <span className="text-sm text-slate-400">{country.dialCode}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <Input
                          id={field}
                          type="text"
                          placeholder="9876543210"
                          name={field}
                          value={input[field]}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            const currentCountry = countryData.find(c => c.code === input.countryCode);
                            const maxLen = currentCountry ? currentCountry.maxLength : 15;
                            if (val.length <= maxLen) {
                              handleChange({ target: { name: field, value: val } });
                            }
                          }}
                          className={`w-full h-[42px] px-3 text-sm text-white border-slate-700 rounded-r-xl rounded-l-none focus:outline-none focus:ring-2 bg-slate-800 placeholder:text-slate-500 ${
                            input.role === "recruiter" ? "focus:ring-purple-500 border-purple-500" : "focus:ring-teal-500 border-teal-500"
                          }`}
                        />
                      </div>
                    ) : field === "password" ? (
                      <div className="relative w-full">
                        <Input
                          id={field}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          name={field}
                          value={input[field]}
                          onChange={handleChange}
                          className={`w-full h-[42px] pl-9 pr-10 text-sm text-white border-slate-700 rounded-xl focus:outline-none focus:ring-2 bg-slate-800 placeholder:text-slate-500 ${
                            input.role === "recruiter" ? "focus:ring-purple-500 focus:border-purple-500" : "focus:ring-teal-500 focus:border-teal-500"
                          }`}
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10">
                          <Lock size={16} />
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    ) : (
                      <Input
                        id={field}
                        type={field === "email" ? "email" : "text"}
                        placeholder={`Enter your ${field}`}
                        name={field}
                        value={input[field]}
                        onChange={handleChange}
                        className={`w-full h-[50px] pl-10 px-4 text-white border-slate-700 rounded-xl focus:outline-none focus:ring-2 bg-slate-800 placeholder:text-slate-500 ${
                          input.role === "recruiter" ? "focus:ring-purple-500 focus:border-purple-500" : "focus:ring-teal-500 focus:border-teal-500"
                        }`}
                      />
                    )}
                  </div>
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium ml-1">
                      {errors[field]}
                    </p>
                  )}
                </div>
              )
            )}

            <div className="relative pt-1">
              <Label className="block mb-1 text-xs font-semibold ml-1 text-slate-300">
                Profile Photo (Optional)
              </Label>
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700 bg-slate-800 text-slate-500 flex-shrink-0 overflow-hidden`}>
                  {input.file ? (
                    <div className="text-[9px] font-bold text-teal-400 text-center leading-tight p-1 break-all bg-slate-900 w-full h-full flex items-center justify-center">
                      {input.file.name.substring(0, 8)}...
                    </div>
                  ) : (
                    <Upload size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full cursor-pointer file:cursor-pointer file:border-0 file:bg-transparent file:text-xs file:font-semibold file:text-slate-300 text-slate-400 bg-slate-800 border-slate-700 rounded-xl h-[42px] pt-2 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className={`w-full py-3 h-[42px] rounded-xl font-bold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 mt-6 text-sm ${
              input.role === "recruiter"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-purple-500/30 border border-purple-500/50"
                : "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-teal-500/30 border border-teal-500/50"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Registering...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-xs mt-4 text-center font-medium text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className={`font-bold hover:underline ml-1 ${
              input.role === "recruiter" ? "text-blue-400 hover:text-blue-300" : "text-teal-400 hover:text-teal-300"
            }`}>
              Log in now
            </Link>
          </p>
        </form>
        </div>
      </div>
    </div>
  );
};
