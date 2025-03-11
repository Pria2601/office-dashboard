"use client";
import { useState, useEffect } from "react";
import Header from "../Components/Header";
import ProtectedRoute from "../protecteduser/page";
interface Application {
  _id: string;
  fullName: string;
  age: number;
  phoneNo: string;
  gender: string;
  occupation: string;
  address: string;
  category: string;
  area: string;
  remarks?: string;
  documenturl?: string;
  status: string;
  notification: boolean;
  refid: string;
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCat, setSelectedCat] = useState<string>("All");
  
  const STATUS_OPTIONS = ["Pending", "Approved", "Rejected"];
  
  // Fetch applications from backend
  const fetchApplications = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/applications");
      const data = await res.json();
      setApplications(data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Update application status
  const updateStatus = async (applicationId: string, status: string) => {
    try {
      await fetch("http://localhost:3000/api/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, status }),
      });
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Get unique categories for filter dropdown
  const categories = ["All", ...new Set(applications.map((app) => app.category))];
  
  const cat = ["All", ...new Set(applications.map((app) => app.area))];
  // Filter applications based on selected category
  // const filteredApplications = selectedCategory === "All"
  //   ? applications
  //   : applications.filter((app) => app.category === selectedCat);

const filteredApplications = applications.filter((app) => 
  (selectedCategory === "All" || app.category === selectedCategory) &&
  (selectedCat === "All" || app.status === selectedCat)
);

  return (
    <><ProtectedRoute>
      <div className="max-w-5xl mx-auto p-6 min-h-screen bg-[#d9d9d9] rounded-lg shadow-md  text-teal-700">
        <h2 className="text-xl text-teal-700  font-bold mt-6">Application Status</h2>
        
        {/* Category Filter Dropdown */}
        <div className="mb-4 p-2 ml-auto w-max">
          <label className="font-semibold">Filter by Category:</label>
          <select 
            className="ml-2 p-2 border rounded" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select 
            className="ml-2 p-2 border rounded" 
            value={selectedCat} 
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            {cat.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Applications List */}
        <div className="overflow-x-auto">

        <table className=" table-auto w-full mt-4 border-collapse border">
          <thead className="bg-teal-700">
            <tr className="text-[#d9d9d9]">
              <th className="border w-[100px] p-2">reference id</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Update</th>
              <th className="border p-2">download details</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id} className="border text-black bg-white">
                <td className="border p-2">{app.refid}</td>
                <td className="border p-2">{app.fullName}</td>
                <td className="border p-2">{app.category}</td>
                <td className="border p-2">{app.area}</td>
                <td className="border p-2">{app.status}</td>
                <td className="border p-2">
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <button className="border ">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div></ProtectedRoute>
    </>
  );
}
