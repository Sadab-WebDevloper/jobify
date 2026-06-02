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
    <>
      <Table>
        <TableCaption className="font-bold">
          {localApplicants ? "A List Of Applicants" : "No Applicant Yet"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localApplicants?.map((a) => (
            <tr key={a._id}>
              <TableCell>{a.applicant.fullname}</TableCell>
              <TableCell>{a.applicant.email}</TableCell>
              <TableCell>{a.applicant.phoneNumber}</TableCell>
              <TableCell>
                {a.applicant.profile.resumeOrignalName ? (
                  <a
                    className="text-blue-600 cursor-pointer"
                    href={a.applicant.profile.resume}
                  >
                    {a.applicant.profile.resumeOrignalName}
                  </a>
                ) : (
                  <>NA</>
                )}
              </TableCell>
              <TableCell>{a.applicant.createdAt.split("T")[0]}</TableCell>
              <TableCell>
                <div className="font-bold capitalize flex items-center justify-evenly">
                  <p
                    className={`text-[14px] p-2 ${
                      a.status === "accepted"
                        ? "bg-green-700 text-white"
                        : a.status === "pending"
                        ? "bg-gray-600 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {a.status}
                  </p>

                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontalIcon />
                    </PopoverTrigger>
                    <PopoverContent className="p-4 bg-white rounded-md shadow-md">
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <p className="text-gray-600">Loading...</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 cursor-pointer">
                          <div className="text-center flex  capitalize font-bold gap-2">
                            {shortListingStatus.map((s, index) => (
                              <div
                                key={index}
                                onClick={() => statusHandler(s, a._id)}
                                className="flex flex-col"
                              >
                                <span className="border border-gray-300 p-2 rounded-md transition duration-200 hover:bg-gray-100 cursor-pointer">
                                  {s}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
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
                  },
                }}
              >
                <h2>
                  Are you sure you want to delete this ? <br /> This
                </h2>
                <div className="flex justify-end gap-4 mt-4">
                  <Button onClick={closeDeleteModal} className="bg-gray-300">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteApplicant(a._id)}
                    className="bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </Modal>
            </tr>
          ))}
        </TableBody>
      </Table>{" "}
    </>
  );
}

export default Applicantstable;
