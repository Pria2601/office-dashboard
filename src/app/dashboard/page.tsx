// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");

//   // Fetch pending users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("/api/getnewsignup");
//         setUsers(res.data.users);
//       } catch (err: any) {
//         setError(err.response?.data?.error || "Failed to fetch users");
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Update User Status Function
//   const updateUserStatus = async (userId: string, status: "approved" | "rejected" | "pending") => {
//     try {
//       await axios.patch("/api/approve", { _id: userId, status });
//       setUsers(users.map((user: any) => (user._id === userId ? { ...user, status } : user))); // Update UI
//     } catch (err: any) {
//       setError(err.response?.data?.error || `Failed to update user status to ${status}`);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {users.length === 0 ? (
//         <p className="text-gray-500">No pending users</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user: any) => (
//               <tr key={user._id} className="border">
//                 <td className="border p-2">{user.name}</td>
//                 <td className="border p-2">{user.email}</td>
//                 <td className="border p-2">{user.phone}</td>
//                 <td className="border p-2">
//                   <select
//                     value={user.status}
//                     onChange={(e) => updateUserStatus(user._id, e.target.value as "approved" | "rejected" | "pending")}
//                     className="border rounded p-1"
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approved</option>
//                     <option value="rejected">Rejected</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.push("/admin");
        return;
      }

      try {
        const res = await axios.get("/api/verifyadmin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status !== 200) {
          localStorage.removeItem("adminToken");
          router.push("/admin/login");
        } else {
          fetchUsers(); // Fetch users only if the admin is verified
        }
      } catch (err: any) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/getnewsignup");
        setUsers(res.data.users);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, [router]);

  const updateUserStatus = async (userId: string, status: "approved" | "rejected" | "pending") => {
    try {
      await axios.patch("/api/approve", { _id: userId, status });
      setUsers(users.map((user: any) => (user._id === userId ? { ...user, status } : user))); // Update UI
    } catch (err: any) {
      setError(err.response?.data?.error || `Failed to update user status to ${status}`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">manage users </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {users.length === 0 ? (
        <p className="text-gray-800 text-center py-6">No pending users</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-800 uppercase text-sm">
                <th className="border p-4 text-left">Name</th>
                <th className="border p-4 text-left">Email</th>
                <th className="border p-4 text-left">Phone</th>
                <th className="border p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, index) => (
                <tr key={user._id} className={`border ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <td className="border p-4 text-gray-800">{user.name}</td>
                  <td className="border p-4 text-gray-800">{user.email}</td>
                  <td className="border p-4 text-gray-800">{user.phone}</td>
                  <td className="border p- text-gray-800">
                    <select
                      value={user.status}
                      onChange={(e) => updateUserStatus(user._id, e.target.value as "approved" | "rejected" | "pending")}
                      className="border rounded px-3 py-1 focus:outline-none transition duration-200 ease-in-out bg-gray-100 hover:bg-gray-200"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
