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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg md:flex md:items-center md:space-x-6">
      <div className="flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
        <Avatar className="w-[120px] h-[120px]">
          <AvatarImage src={company.logo} alt={`${company.name} Logo`} />
          <AvatarFallback className="text-lg font-bold text-gray-700">
            {company.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {company.name}
        </h2>
        <p className="text-gray-500 mb-4 text-sm md:text-base">
          Registered on: {new Date(company.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {company.description || "No description available."}
        </p>

        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Website:</span>{" "}
          <a
            href={company.website}
            className="text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.website}
          </a>
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Location:</span>{" "}
          {company.location || "Not provided"}
        </p>
        <button
          onClick={() => editHandler(company._id)}
          className="inline-flex items-center px-5 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Edit2Icon className="w-5 h-5 mr-2" /> Edit Company
        </button>
      </div>
    </div>
  );
}

export default CompaniesTable;
