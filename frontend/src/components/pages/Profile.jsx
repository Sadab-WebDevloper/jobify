import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "../AppliedJobTable";
import SavedJobTable from "../SavedJobTable";
import UpdateProfile from "../UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function Profile() {
  useDocumentTitle("My Profile");
  const isResume = true;
  const { authUser } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const skills = authUser?.profile?.skills || [];
  console.log(authUser);

  useGetAppliedJobs();

  return (
    <div className="bg-slate-900 min-h-screen py-10">
      <div className="max-w-4xl p-8 mx-auto my-5 bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700 relative animate-fade-in-up">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:justify-between relative z-10">
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-slate-700 shadow-xl bg-slate-900">
              <AvatarImage src={authUser?.profile?.profilePhoto} />
            </Avatar>

            <div>
              <h1 className="text-3xl font-extrabold text-white">{authUser?.fullname}</h1>
              <p className="text-slate-400 mt-1 font-medium">{authUser?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(!open)}
            className="text-right border-slate-600 hover:border-teal-400 hover:text-teal-400 text-slate-300 transition-colors shadow-sm bg-slate-900"
            variant="outline"
          >
            <Pen className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="my-8 space-y-4 relative z-10">
          <div className="flex items-center gap-4 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700 w-fit">
            <div className="p-2 bg-teal-500/10 rounded-md">
              <Mail className="text-teal-400 w-5 h-5" />
            </div>
            <span className="font-medium">{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700 w-fit">
            <div className="p-2 bg-emerald-500/10 rounded-md">
              <Contact className="text-emerald-400 w-5 h-5" />
            </div>
            <span className="font-medium">{authUser?.phoneNumber}</span>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="font-bold text-lg text-white">Skills</h2>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {skills.length > 0 ? (
              skills.map((item, index) => (
                <Badge key={index} className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium border-none py-1 px-3 shadow-md shadow-teal-500/20">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-slate-500 italic bg-slate-900/50 px-3 py-1 rounded-md border border-slate-700">Not Provided</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 mt-8 relative z-10">
          <Label className="font-bold text-lg text-white">Resume</Label>

          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={authUser?.profile?.resume}
              className="text-teal-400 font-medium hover:text-emerald-400 hover:underline transition-colors flex items-center gap-2 bg-slate-900/50 p-3 rounded-lg border border-slate-700 w-fit"
            >
              📄 {authUser?.profile?.resumeOrignalName}
            </a>
          ) : (
            <span className="text-slate-500 italic bg-slate-900/50 px-3 py-1 rounded-md w-fit border border-slate-700">Not Provided</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-700 p-8 mt-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="mb-6 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <div className="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-700 p-8 mt-10 mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <h1 className="mb-6 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Saved Jobs</h1>
        <SavedJobTable />
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
