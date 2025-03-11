// "use client";

// import { useState, useEffect } from "react";
// import Header from "../Components/Header";

// interface Application {
//   _id: string;
//   fullName: string;
//   age: number;
//   phoneNo: string;
//   gender: string;
//   occupation: string;
//   address: string;
//   category: string;
//   area: string;
//   remarks?: string;
//   documenturl?: string;
//   status: string;
//   notification: boolean;
// }

// export default function Home() {
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [form, setForm] = useState({
//     fullName: "",
//     age: "",
//     phoneNo: "",
//     gender: "",
//     occupation: "",
//     address: "",
//     category: "",
//     area: "",
//     remarks: "",
//     documenturl: "",
//   });
//   const [file, setFile] = useState<File | null>(null);

//   const STATUS_OPTIONS = ["Pending", "Approved", "Rejected"];

//   // Fetch applications from backend
//   const fetchApplications = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/applications");
//       const data = await res.json();
//       setApplications(data.data);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   // Handle form input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     if (e.target.type === "file") {
//       const target = e.target as HTMLInputElement;
//       if (target.files && target.files[0]) {
//         setFile(target.files[0]); // Store file in state
//       }
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   // Upload file to Cloudinary
//   const uploadToCloudinary = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "instagram"); // Replace with your Cloudinary preset
//     formData.append("cloud_name", "tuntun"); // Replace with your Cloudinary preset

//     try {
//       const res = await fetch("https://api.cloudinary.com/v1_1/tuntun/image/upload/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       return data.secure_url; // Get the uploaded file URL
//     } catch (error) {
//       console.error("Error uploading to Cloudinary:", error);
//       return null;
//     }
//   };

//   // Handle form submission
//  // Handle form submission
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   let documentUrl = "";

//   if (file) {
//     documentUrl = await uploadToCloudinary(file);
//     if (!documentUrl) {
//       alert("Failed to upload document.");
//       return;
//     }
//   }

//   // Get username from localStorage
//   const uploadedBy = localStorage.getItem("username") || "Unknown User";

//   try {
//     const res = await fetch("http://localhost:3000/api/applications", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...form, documenturl: documentUrl, uploadedBy }), // Include uploadedBy
//     });

//     if (res.ok) {
//       alert("Application submitted successfully!");
//       setForm({
//         fullName: "",
//         age: "",
//         phoneNo: "",
//         gender: "",
//         occupation: "",
//         address: "",
//         category: "",
//         area: "",
//         remarks: "",
//         documenturl: "",
//       });
//       setFile(null);
//       fetchApplications();
//     } else {
//       alert("Error submitting application");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };


//   return (
//     <>
//       <Header />
//       <div className="max-w-5xl mx-auto p-6 bg-teal-900 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-4 text-white-900">Add Application</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-gray-300 p-6 rounded-lg text-black">
//           {/* Left Side Inputs */}
//           <div className="space-y-4 text-black">
//             <div>
//               <label className="block font-semibold">Full name:</label>
//               <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Enter your name" />
//             </div>
//             <div>
//               <label className="block font-semibold">Age:</label>
//               <input type="number" name="age" value={form.age} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Enter your age" />
//             </div>
//             <div>
//               <label className="block font-semibold">Phone No.:</label>
//               <input type="text" name="phoneNo" value={form.phoneNo} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Enter your mobile number" />
//             </div>
//             <div>
//               <label className="block font-semibold">Gender:</label>
//               <select name="gender" value={form.gender} onChange={handleChange} required className="w-full p-2 border rounded">
//                 <option value="">What’s your gender?</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div>
//               <label className="block font-semibold">Occupation:</label>
//               <input type="text" name="occupation" value={form.occupation} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Where do you work?" />
//             </div>
//             <div>
//               <label className="block font-semibold">Address:</label>
//               <input type="text" name="address" value={form.address} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Where do you live?" />
//             </div>
//           </div>

//           {/* Right Side Inputs */}
//           <div className="space-y-4">
//             <div>
//               <label className="block font-semibold">Category of application:</label>
//               <select name="category" value={form.category} onChange={handleChange} required className="w-full p-2 border rounded">
//                 <option value="">Select category</option>
//                 <option value="Legal">Legal</option>
//                 <option value="Business">Business</option>
//                 <option value="Education">Education</option>
//                 <option value="Finance">Finance</option>
//                 <option value="Others">Others</option>
//               </select>
//             </div>
//             <div>
//               <label className="block font-semibold">Area:</label>
//               <select name="area" value={form.area} onChange={handleChange} required className="w-full p-2 border rounded">
//                 <option value="">Select area of residence</option>
//                 <option value="Village">Village</option>
//                 <option value="Town">Town</option>
//                 <option value="Tehsil">Tehsil</option>
//               </select>
//             </div>
//             <div>
//               <label className="block font-semibold">Add remarks:</label>
//               <input type="text" name="remarks" value={form.remarks} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Add text" />
//             </div>
//             <div>
//               <label className="block font-semibold">Upload document:</label>
//               <input type="file" name="document" onChange={handleChange} className="w-full p-2 border rounded" />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="col-span-2 text-center">
//             <button type="submit" className="bg-teal-900 text-white px-6 py-2 rounded hover:bg-teal-700">Submit</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
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
  uploadedBy: string;
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    phoneNo: "",
    gender: "",
    occupation: "",
    address: "",
    category: "",
    area: "",
    remarks: "",
    documenturl: "",
  });
  const [file, setFile] = useState<File | null>(null);

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

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.type === "file") {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setFile(target.files[0]); // Store file in state
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "instagram"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "tuntun"); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/tuntun/image/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.secure_url; // Get the uploaded file URL
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let documentUrl = "";

    if (file) {
      documentUrl = await uploadToCloudinary(file);
      if (!documentUrl) {
        alert("Failed to upload document.");
        return;
      }
    }

    // Get username from localStorage
    const uploadedBy = localStorage.getItem("username") || "Unknown User";


    try {
      const res = await fetch("http://localhost:3000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, documenturl: documentUrl, uploaded_by:uploadedBy }), // Include uploadedBy
      });

      if (res.ok) {
        alert("Application submitted successfully!");
        setForm({
          fullName: "",
          age: "",
          phoneNo: "",
          gender: "",
          occupation: "",
          address: "",
          category: "",
          area: "",
          remarks: "",
          documenturl: "",
        });
        setFile(null);
        fetchApplications();
      } else {
        alert("Error submitting application");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>    <ProtectedRoute>

      <div className="max-w-5xl mx-auto p-6 bg-teal-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-white-900">Add Application</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-gray-300 p-6 rounded-lg text-black">
          {/* Left Side Inputs */}
          <div className="space-y-4 text-black">
            <div>
              <label className="block font-semibold">Full name:</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block font-semibold">Age:</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Enter your age" />
            </div>
            <div>
              <label className="block font-semibold">Phone No.:</label>
              <input type="text" name="phoneNo" value={form.phoneNo} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Enter your mobile number" />
            </div>
            <div>
              <label className="block font-semibold">Gender:</label>
              <select name="gender" value={form.gender} onChange={handleChange} required className="w-full p-2 border rounded">
                <option value="">What’s your gender?</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Occupation:</label>
              <input type="text" name="occupation" value={form.occupation} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Where do you work?" />
            </div>
            <div>
              <label className="block font-semibold">Address:</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Where do you live?" />
            </div>
          </div>

          {/* Right Side Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Category of application:</label>
              <select name="category" value={form.category} onChange={handleChange} required className="w-full p-2 border rounded">
                <option value="">Select category</option>
                <option value="Legal">Legal</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Area:</label>
              <select name="area" value={form.area} onChange={handleChange} required className="w-full p-2 border rounded">
                <option value="">Select area of residence</option>
                <option value="Village">Village</option>
                <option value="Town">Town</option>
                <option value="Tehsil">Tehsil</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Add remarks:</label>
              <input type="text" name="remarks" value={form.remarks} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Add text" />
            </div>
            <div>
              <label className="block font-semibold">Upload document:</label>
              <input type="file" name="document" onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center">
            <button type="submit" className="bg-teal-900 text-white px-6 py-2 rounded hover:bg-teal-700">Submit</button>
          </div>
        </form>
      </div></ProtectedRoute>
    </>
  );
}
