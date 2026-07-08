import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetSingleCompany from "../../hooks/useGetSingleCompany";
import { toast } from "sonner";
import apiRequest from "../../utils/axiosUtility";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

function CompanySetup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const companyId = params.id;
  useGetSingleCompany(companyId);
  const { singleCompany } = useSelector((state) => state.company);

  const [input, setInput] = useState({
    name: singleCompany?.name || "",
    description: singleCompany?.description || "",
    website: singleCompany?.website || "",
    location: singleCompany?.location || "",
    file: null,
  });
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("website", input.website);
    formData.append("description", input.description);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const endpoint = `${COMPANY_API_END_POINT}/updateCompany/${params.id}`;
      const res = await apiRequest("PUT", endpoint, formData, token);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async () => {
    try {
      setLoading(true);
      const endpoint = `${COMPANY_API_END_POINT}/deleteCompany/${params.id}`;
      const res = await apiRequest("DELETE", endpoint, {}, token);

      if (res.status === 200) {
        toast.success("Company Deleted Successfully");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  const openDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700 animate-fade-in-up">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between py-4 border-b border-slate-700 mb-8">
          <h1 className="text-3xl font-extrabold text-white">Company Setup</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="text-red-400 border-red-500/30 hover:bg-red-500 hover:text-white transition-colors bg-slate-900"
              onClick={openDeleteModal}
            >
              DELETE
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 font-semibold text-slate-300 border-slate-600 hover:bg-slate-700 bg-slate-900 transition-colors"
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                navigate(-1);
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-slate-300 font-medium">Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              required
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus:border-teal-500 focus:ring-teal-500 transition-colors"
            />
          </div>
          <div>
            <Label className="text-slate-300 font-medium">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              required
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus:border-teal-500 focus:ring-teal-500 transition-colors"
            />
          </div>
          <div>
            <Label className="text-slate-300 font-medium">Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              required
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus:border-teal-500 focus:ring-teal-500 transition-colors"
            />
          </div>
          <div>
            <Label className="text-slate-300 font-medium">Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              required
              className="mt-2 bg-slate-900 border-slate-700 text-slate-200 focus:border-teal-500 focus:ring-teal-500 transition-colors"
            />
          </div>
          <div>
            <Label className="text-slate-300 font-medium">Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="mt-2 bg-slate-900 border-slate-700 text-slate-300 file:bg-slate-700 file:text-slate-300 file:border-0 file:rounded-md file:px-4 file:py-1 hover:file:bg-slate-600 transition-colors cursor-pointer"
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-400 font-medium">{error}</p>}
        <Button
          type="submit"
          className="w-full my-8 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold hover:from-teal-400 hover:to-emerald-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/25 transition-all border-0 py-6 text-lg rounded-xl"
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Please Wait
            </div>
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Delete"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#0f172a", // slate-900
            border: "1px solid #334155", // slate-700
            borderRadius: "16px",
            color: "white",
            padding: "24px",
            maxWidth: "400px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(4px)",
          }
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Are you sure you want to delete this company?
        </h2>
        <p className="text-slate-400 text-center mb-6">
          This action will also permanently remove all associated jobs and applications.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={closeDeleteModal} variant="outline" className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
            Cancel
          </Button>
          <Button onClick={deleteCompany} className="bg-red-600 hover:bg-red-500 text-white border-0">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default CompanySetup;
