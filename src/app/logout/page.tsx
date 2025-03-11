"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear all stored tokens
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");

    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Logging out...</h2>
        <p className="text-gray-500">Please wait while we log you out.</p>
      </div>
    </div>
  );
};

export default Logout;
