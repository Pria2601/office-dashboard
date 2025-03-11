"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch pending users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/getnewsignup");
        setUsers(res.data.users);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  // Update User Status Function
  const updateUserStatus = async (userId: string, status: "approved" | "rejected") => {
    try {
      await axios.patch("/api/update-status", { _id: userId, status });
      setUsers(users.filter((user: any) => user._id !== userId)); // Remove from list after approval/rejection
    } catch (err: any) {
      setError(err.response?.data?.error || `Failed to update user status to ${status}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}
      {users.length === 0 ? (
        <p className="text-gray-500">No pending users</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id} className="border">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2 flex space-x-2">
                  <button
                    onClick={() => updateUserStatus(user._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateUserStatus(user._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
