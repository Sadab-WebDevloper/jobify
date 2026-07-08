import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { useState } from "react";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 shadow-sm bg-slate-900/50">
      <Table>
        <TableCaption className="font-medium text-slate-400 pb-4">
          {allAppliedJobs?.length <= 0
            ? "You Haven't Applied For Any Jobs Yet"
            : "A List Of Your Applied Jobs"}
        </TableCaption>
        <TableHeader className="bg-slate-800/80">
          <TableRow className="border-b border-slate-700 hover:bg-slate-800">
            <TableHead className="font-semibold text-slate-300">Job Role</TableHead>
            <TableHead className="font-semibold text-slate-300">Company</TableHead>
            <TableHead className="font-semibold text-slate-300">Date</TableHead>
            <TableHead className="font-semibold text-slate-300 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((item, index) => (
            <TableRow key={index} className="hover:bg-slate-800/50 transition-colors border-b border-slate-800">
              <TableCell className="font-medium text-white">{item?.job?.title}</TableCell>
              <TableCell className="text-slate-300"> {item?.job?.company?.name} </TableCell>
              <TableCell className="text-slate-400">{item?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Badge
                    className={`border-none shadow-sm font-medium ${
                      item.status === "rejected"
                        ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        : item.status === "accepted"
                        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-slate-500/10 text-slate-300 hover:bg-slate-500/20"
                    }`}
                  >
                    {item?.status.toUpperCase()}
                  </Badge>
                  {item.status === "accepted" && (
                    <button
                      onClick={() => {
                        setSelectedJob(item.job);
                        setIsModalOpen(true);
                      }}
                      className="text-xs bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white py-1.5 px-3 rounded-full transition-all font-semibold shadow-md shadow-teal-500/20"
                    >
                      Next Steps
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 text-center mb-4">
              🎉 Congratulations!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-slate-300 text-center">
              Your application for <span className="font-bold text-white">{selectedJob?.title}</span> at <span className="font-bold text-white">{selectedJob?.company?.name}</span> has been accepted!
            </p>
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-inner mt-4">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-teal-400">✨</span> Next Steps
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                The recruiter will reach out to you shortly via your registered email address to schedule an interview or discuss the next phase of the hiring process. Make sure to keep an eye on your inbox!
              </p>
            </div>
            {selectedJob?.company?.website && (
              <div className="text-center pt-2">
                <a 
                  href={selectedJob.company.website.startsWith('http') ? selectedJob.company.website : `https://${selectedJob.company.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 text-sm font-medium underline underline-offset-4"
                >
                  Visit Company Website to Prepare
                </a>
              </div>
            )}
            <div className="text-center mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-xl transition-colors border border-slate-600 shadow-md"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AppliedJobTable;
