import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2Icon } from "lucide-react";

function CompaniesTable() {
  const { allCompanies } = useSelector((state) => state.company);
  const navigate = useNavigate();

  const editHandler = (id) => {
    navigate(`/admin/companies/${id}`);
  };

  const company = allCompanies?.[0]; // Show only the first company

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-semibold text-gray-700">No company found</p>
        <p className="text-gray-500 mt-2">
          Create a company to view details here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700 md:flex md:items-center md:space-x-8 animate-fade-in-up">
      <div className="flex-shrink-0 flex items-center justify-center mb-6 md:mb-0 relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
        <Avatar className="w-[120px] h-[120px] border-4 border-slate-700 shadow-xl relative z-10 bg-slate-900">
          <AvatarImage src={company.logo} alt={`${company.name} Logo`} />
          <AvatarFallback className="text-3xl font-bold text-white bg-slate-800">
            {company.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-white mb-2">
          {company.name}
        </h2>
        <p className="text-slate-400 mb-6 text-sm font-medium">
          Registered on: {new Date(company.createdAt).toLocaleDateString()}
        </p>
        <div className="space-y-4 mb-8 bg-slate-900/50 p-5 rounded-2xl border border-slate-700 text-left">
          <p className="text-slate-300">
            <span className="font-bold text-white block mb-1">Description</span>{" "}
            {company.description || "No description available."}
          </p>

          <p className="text-slate-300">
            <span className="font-bold text-white block mb-1">Website</span>{" "}
            <a
              href={company.website}
              className="text-teal-400 hover:text-emerald-400 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.website}
            </a>
          </p>
          <p className="text-slate-300">
            <span className="font-bold text-white block mb-1">Location</span>{" "}
            {company.location || "Not provided"}
          </p>
        </div>
        <button
          onClick={() => editHandler(company._id)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/25 hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-0.5 transition-all w-full md:w-auto justify-center"
        >
          <Edit2Icon className="w-5 h-5 mr-2" /> Edit Company
        </button>
      </div>
    </div>
  );
}

export default CompaniesTable;
