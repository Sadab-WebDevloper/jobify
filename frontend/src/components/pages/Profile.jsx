import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "../AppliedJobTable";
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
    <div className="bg-gray-50/50 min-h-screen py-10">
      <div className="max-w-4xl p-8 mx-auto my-5 glass rounded-3xl shadow-xl border border-white/60 relative animate-fade-in-up">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:justify-between relative z-10">
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-white shadow-lg">
              <AvatarImage src={authUser?.profile?.profilePhoto} />
            </Avatar>

            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{authUser?.fullname}</h1>
              <p className="text-gray-600 mt-1 font-medium">{authUser?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(!open)}
            className="text-right border-gray-200 hover:border-primary hover:text-primary transition-colors shadow-sm"
            variant="outline"
          >
            <Pen className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="my-8 space-y-4 relative z-10">
          <div className="flex items-center gap-4 text-gray-700 bg-white/60 p-3 rounded-lg border border-white/50 w-fit">
            <div className="p-2 bg-primary/10 rounded-md">
              <Mail className="text-primary w-5 h-5" />
            </div>
            <span className="font-medium">{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-700 bg-white/60 p-3 rounded-lg border border-white/50 w-fit">
            <div className="p-2 bg-secondary/10 rounded-md">
              <Contact className="text-secondary w-5 h-5" />
            </div>
            <span className="font-medium">{authUser?.phoneNumber}</span>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="font-bold text-lg text-gray-800">Skills</h2>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {skills.length > 0 ? (
              skills.map((item, index) => (
                <Badge key={index} className="bg-gradient-to-r from-primary to-secondary text-white font-medium border-none py-1 px-3 shadow-md">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 italic bg-white/60 px-3 py-1 rounded-md">Not Provided</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-2 mt-8 relative z-10">
          <Label className="font-bold text-lg text-gray-800">Resume</Label>

          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={authUser?.profile?.resume}
              className="text-primary font-medium hover:text-secondary hover:underline transition-colors flex items-center gap-2 bg-white/60 p-3 rounded-lg border border-white/50 w-fit"
            >
              📄 {authUser?.profile?.resumeOrignalName}
            </a>
          ) : (
            <span className="text-gray-500 italic bg-white/60 px-3 py-1 rounded-md w-fit">Not Provided</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mt-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="mb-6 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
