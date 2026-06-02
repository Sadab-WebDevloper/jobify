import { useState } from "react";
import {
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";

// Mock data (in a real app, this would come from an API)
const mockStats = {
  totalJobs: 156,
  activeListings: 89,
  totalApplications: 1234,
  totalUsers: 567,
};

const mockRecentApplications = [
  {
    id: 1,
    candidate: "John Doe",
    position: "Senior Developer",
    status: "Pending",
    date: "2024-03-10",
  },
  {
    id: 2,
    candidate: "Jane Smith",
    position: "UX Designer",
    status: "Reviewed",
    date: "2024-03-09",
  },
  {
    id: 3,
    candidate: "Mike Johnson",
    position: "Product Manager",
    status: "Interviewed",
    date: "2024-03-08",
  },
];

function MeHomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300  h-screen`}
      >
        <div className="p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8">
          {[
            { icon: BarChart3, label: "Dashboard", id: "dashboard" },
            { icon: Briefcase, label: "Jobs", id: "jobs" },
            { icon: FileText, label: "Applications", id: "applications" },
            { icon: Users, label: "Users", id: "users" },
            { icon: Settings, label: "Settings", id: "settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-4 hover:bg-blue-50 ${
                activeTab === item.id ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 ${
          isSidebarOpen ? "ml-0" : "ml-0"
        } transition-all duration-300`}
      >
        {/* Dashboard Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Total Jobs",
                value: mockStats.totalJobs,
                icon: Briefcase,
              },
              {
                label: "Active Listings",
                value: mockStats.activeListings,
                icon: FileText,
              },
              {
                label: "Total Applications",
                value: mockStats.totalApplications,
                icon: FileText,
              },
              {
                label: "Total Users",
                value: mockStats.totalUsers,
                icon: Users,
              },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <stat.icon className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
            </div>
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Candidate</th>
                    <th className="pb-4">Position</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentApplications.map((application) => (
                    <tr key={application.id} className="border-t">
                      <td className="py-4">{application.candidate}</td>
                      <td className="py-4">{application.position}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            application.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : application.status === "Reviewed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="py-4">{application.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MeHomePage;
