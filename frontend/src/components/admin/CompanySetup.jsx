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
      setError("Something went wrong. Please try again.");
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md ">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between py-4 border-b mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              onClick={openDeleteModal}
            >
              DELETE
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 font-semibold text-gray-600 border-gray-600 hover:bg-gray-200"
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                navigate(-1);
              }}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              required
              className="border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              required
              className="border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              required
              className="border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              required
              className="border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full my-8 bg-blue-600 text-white hover:bg-blue-700"
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
          },
        }}
      >
        <h2>
          Are you sure you want to delete this company? <br /> This action will
          also permanently remove all associated jobs and applications.
        </h2>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={closeDeleteModal} className="bg-gray-300">
            Cancel
          </Button>
          <Button onClick={deleteCompany} className="bg-red-600 text-white">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default CompanySetup;
