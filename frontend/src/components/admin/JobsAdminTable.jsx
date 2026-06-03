/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2Icon, Eye, MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function JobsAdminTable() {
  const { alljobsAdmin, searchJobByText } = useSelector((state) => state.job);

  const [filterJobs, setFilterJobs] = useState(alljobsAdmin);

  const navigate = useNavigate();
  useEffect(() => {
    const filteredJobs =
      alljobsAdmin?.length > 0 &&
      alljobsAdmin?.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase());
      });

    setFilterJobs(filteredJobs);
  }, [alljobsAdmin, searchJobByText]);

  const editHandler = (id) => {
    navigate(`/admin/jobs/${id}`);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-sm bg-slate-900/50 mt-6">
      <Table>
        <TableCaption className="font-medium text-slate-400 pb-4">
          {filterJobs
            ? " A List Of Your Recent Posted Jobs"
            : "Post A Job First"}
        </TableCaption>
        <TableHeader className="bg-slate-800/80">
          <TableRow className="border-b border-slate-700 hover:bg-slate-800">
            <TableHead className="font-semibold text-slate-300">Company Name</TableHead>
            <TableHead className="font-semibold text-slate-300">Role</TableHead>
            <TableHead className="font-semibold text-slate-300">Date</TableHead>
            <TableHead className="text-right font-semibold text-slate-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs &&
            filterJobs.map((c) => (
              <TableRow key={c._id} className="hover:bg-slate-800/50 transition-colors border-b border-slate-800">
                <TableCell className="text-white font-medium">{c?.company?.name}</TableCell>
                <TableCell className="text-slate-300">{c.title}</TableCell>
                <TableCell className="text-slate-400">
                  {new Date(c.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <div className="p-2 hover:bg-slate-800 rounded-full transition-colors inline-block">
                        <MoreHorizontalIcon className="text-slate-400" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 bg-slate-800 border-slate-700 text-slate-200">
                      <div
                        onClick={() => editHandler(c._id)}
                        className="flex items-center gap-3 cursor-pointer w-full p-2 hover:bg-slate-700 rounded-md transition-colors"
                      >
                        <Edit2Icon className="w-4 h-4 text-teal-400" />
                        <span className="font-medium">Edit</span>
                      </div>

                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${c._id}/applicants`)
                        }
                        className="flex mt-2 items-center gap-3 cursor-pointer w-full p-2 hover:bg-slate-700 rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4 text-emerald-400" />
                        <span className="font-medium">Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default JobsAdminTable;
