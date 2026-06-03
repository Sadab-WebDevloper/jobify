import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <h1
              className="text-3xl font-extrabold cursor-pointer tracking-tight text-white"
              onClick={() => navigate("/")}
            >
              Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">ify</span>
            </h1>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              Empowering careers and opportunities. Let’s build the future
              together, one job at a time.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <span
              className="text-slate-400 hover:text-teal-400 transition duration-300 ease-in-out cursor-pointer hover:underline"
              role="link"
            >
              Privacy Policy
            </span>
            <span
              className="text-slate-400 hover:text-teal-400 transition duration-300 ease-in-out cursor-pointer hover:underline"
              role="link"
            >
              Terms of Service
            </span>
            <span
              className="text-slate-400 hover:text-teal-400 transition duration-300 ease-in-out cursor-pointer hover:underline"
              role="link"
            >
              Cookie Policy
            </span>
          </div>

          {/* Social Icons Section */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-white font-semibold mb-5">Connect With Us</h3>
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com/sadab.mamu.7"
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://github.com/Sadab-WebDevloper"
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-white/10"
                aria-label="Twitter/Github"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sadab-mamu-a73707338/"
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-600/20"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/sadab_mamu/?next=%2F&hl=en"
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-pink-500/20"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="mt-12 w-full h-px bg-slate-800 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-50"></div>
        </div>

        {/* Closing Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-300">Jobify</span>.
            All rights reserved.
          </p>
          <p className="text-center md:text-right mt-4 md:mt-0 flex items-center gap-1">
            Designed with <span className="text-red-500 animate-pulse">♥</span> by{" "}
            <span className="font-bold text-slate-300">Sadab Mamu</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
