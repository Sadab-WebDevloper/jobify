import { useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const NEWSLETTER_API = "http://localhost:8000/api/v1/newsletter";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage("");

    try {
      const res = await axios.post(
        `${NEWSLETTER_API}/subscribe`,
        { email },
        { withCredentials: true }
      );

      if (res.data.success) {
        setStatus("success");
        setMessage(res.data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error.response?.data?.message ||
          "Failed to subscribe. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#431692] text-white py-16 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
      <p className="text-lg mb-6">
        Subscribe to our newsletter for the latest job updates and career tips.
      </p>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 "
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status) {
              setStatus(null);
              setMessage("");
            }
          }}
          className="px-4 py-3 rounded-full text-gray-800 w-full md:w-[40%]  "
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#F83002] ml-3 px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      {/* Status Message */}
      {status && (
        <div
          className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            status === "success"
              ? "bg-green-500/20 text-green-200 border border-green-500/30"
              : "bg-red-500/20 text-red-200 border border-red-500/30"
          }`}
        >
          {status === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterSection;
