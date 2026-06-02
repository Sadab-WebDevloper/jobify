import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useSelector } from "react-redux";

function Companies() {
  const navigate = useNavigate();
  useGetAllCompanies();
  const { allCompanies } = useSelector((state) => state.company);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-5">
        {allCompanies && allCompanies.length > 0 ? (
          ""
        ) : (
          <Button onClick={() => navigate("/admin/companies/create")}>
            Add Your Company
          </Button>
        )}
      </div>
      <CompaniesTable />
    </div>
  );
}

export default Companies;
