import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "react-modal";

import { Button } from "@/components/ui/button"; // Adjust import based on your structure

import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { MoreHorizontalIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import apiRequest from "../../utils/axiosUtility";
import { useNavigate } from "react-router-dom";

function Applicantstable() {
  const shortListingStatus = ["accepted", "rejected"];
  const { applicants } = useSelector((store) => store.application);
  const { token } = useSelector((store) => store.auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  // Local state to manage applicants
  const [localApplicants, setLocalApplicants] = useState(applicants);
  const [loading, setLoading] = useState(false);
  const openDeleteModal = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  useEffect(() => {
    setLocalApplicants(applicants); // Sync with Redux store
  }, [applicants]);

  const statusHandler = async (status, id) => {
    setLoading(true);
    try {
      const endpoint = `${APPLICATION_API_END_POINT}/updateStatus/${id}`;
      const res = await apiRequest("PUT", endpoint, { status }, token);

      toast.success(`${res.data.message} to ${status}`);

      // Update the status in local state
      setLocalApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === id ? { ...applicant, status } : applicant
        )
      );
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const deleteApplicant = async (id) => {
    try {
      setLoading(true);
      const endpoint = `${APPLICATION_API_END_POINT}/deleteApplicant/${id}`;

      const res = await apiRequest("DELETE", endpoint, {}, token);

      if (res.status === 200) {
        toast.success("Job Deleted Successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-sm bg-slate-900/50 mt-6 max-w-7xl mx-auto">
      <Table>
        <TableCaption className="font-medium text-slate-400 pb-4">
          {localApplicants ? "A List Of Applicants" : "No Applicant Yet"}
        </TableCaption>
        <TableHeader className="bg-slate-800/80">
          <TableRow className="border-b border-slate-700 hover:bg-slate-800">
            <TableHead className="font-semibold text-slate-300">Fullname</TableHead>
            <TableHead className="font-semibold text-slate-300">Email</TableHead>
            <TableHead className="font-semibold text-slate-300">Phone Number</TableHead>
            <TableHead className="font-semibold text-slate-300">Resume</TableHead>
            <TableHead className="font-semibold text-slate-300">Date</TableHead>
            <TableHead className="text-center font-semibold text-slate-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localApplicants?.map((a) => (
            <tr key={a._id} className="hover:bg-slate-800/50 transition-colors border-b border-slate-800">
              <TableCell className="text-white font-medium">{a.applicant.fullname}</TableCell>
              <TableCell className="text-slate-300">{a.applicant.email}</TableCell>
              <TableCell className="text-slate-300">{a.applicant.phoneNumber}</TableCell>
              <TableCell>
                {a.applicant.profile.resumeOrignalName ? (
                  <a
                    className="text-teal-400 hover:text-emerald-400 cursor-pointer underline hover:no-underline transition-colors"
                    href={a.applicant.profile.resume}
                  >
                    {a.applicant.profile.resumeOrignalName}
                  </a>
                ) : (
                  <span className="text-slate-500">NA</span>
                )}
              </TableCell>
              <TableCell className="text-slate-400">{a.applicant.createdAt.split("T")[0]}</TableCell>
              <TableCell>
                <div className="font-bold capitalize flex items-center justify-evenly">
                  <p
                    className={`text-xs px-3 py-1 rounded-full font-bold shadow-sm ${
                      a.status === "accepted"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : a.status === "pending"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {a.status}
                  </p>

                  <Popover>
                    <PopoverTrigger>
                      <div className="p-2 hover:bg-slate-700 rounded-full transition-colors inline-block cursor-pointer">
                        <MoreHorizontalIcon className="text-slate-400 w-5 h-5" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-2 bg-slate-800 border-slate-700 rounded-md shadow-xl text-slate-200 w-36">
                      {loading ? (
                        <div className="flex items-center justify-center py-2">
                          <p className="text-slate-400 text-sm">Loading...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1 w-full">
                          {shortListingStatus.map((s, index) => (
                            <div
                              key={index}
                              onClick={() => statusHandler(s, a._id)}
                              className={`p-2 rounded-md transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2 ${
                                s === "accepted" ? "hover:bg-emerald-500/20 text-emerald-400" : "hover:bg-red-500/20 text-red-400"
                              }`}
                            >
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="outline"
                    className="text-red-400 border-red-500/30 hover:bg-red-500 hover:text-white transition-colors bg-slate-900 h-8 text-xs"
                    onClick={openDeleteModal}
                  >
                    DELETE
                  </Button>
                </div>
              </TableCell>{" "}
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
                  Are you sure you want to delete this applicant?
                </h2>
                <div className="flex justify-center gap-4 mt-6">
                  <Button onClick={closeDeleteModal} variant="outline" className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteApplicant(a._id)}
                    className="bg-red-600 hover:bg-red-500 text-white border-0"
                  >
                    Delete
                  </Button>
                </div>
              </Modal>
            </tr>
          ))}
        </TableBody>
      </Table>{" "}
    </div>
  );
}

export default Applicantstable;
