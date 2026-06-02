import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <h1
              className="text-3xl font-extrabold cursor-pointer tracking-tight text-white"
              onClick={() => navigate("/")}
            >
              Job<span className="text-primary">ify</span>
            </h1>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              Empowering careers and opportunities. Let’s build the future
              together, one job at a time.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="text-white font-semibold mb-2">Legal</h3>
            <span
              className="text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer hover:underline"
              role="link"
            >
              Privacy Policy
            </span>
            <span
              className="text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer hover:underline"
              role="link"
            >
              Terms of Service
            </span>
            <span
              className="text-gray-400 hover:text-white transition duration-300 ease-in-out cursor-pointer hover:underline"
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
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://github.com/Sadab-WebDevloper"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Twitter/Github"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/sadab-mamu-a73707338/"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/sadab_mamu/?next=%2F&hl=en"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="mt-12 w-full h-px bg-gray-800"></div>

        {/* Closing Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-300">Jobify</span>.
            All rights reserved.
          </p>
          <p className="text-center md:text-right mt-4 md:mt-0 flex items-center gap-1">
            Designed with <span className="text-red-500">♥</span> by{" "}
            <span className="font-bold text-gray-300">Sadab Mamu</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
