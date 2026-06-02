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
    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-white">
      <Table>
        <TableCaption className="font-medium text-gray-500 pb-4">
          {allAppliedJobs?.length <= 0
            ? "You Haven't Applied For Any Jobs Yet"
            : "A List Of Your Applied Jobs"}
        </TableCaption>
        <TableHeader className="bg-gray-50/80">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Job Role</TableHead>
            <TableHead className="font-semibold text-gray-700">Company</TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-50/80 transition-colors">
              <TableCell className="font-medium text-gray-900">{item?.job?.title}</TableCell>
              <TableCell className="text-gray-600"> {item?.job?.company?.name} </TableCell>
              <TableCell className="text-gray-500">{item?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`border-none shadow-sm font-medium ${
                    item.status === "rejected"
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : item.status === "accepted"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
