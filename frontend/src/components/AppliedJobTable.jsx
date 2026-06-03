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
import { useSelector } from "react-redux";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);

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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
