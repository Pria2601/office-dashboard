"use client";
import { useRouter } from "next/navigation";
import Header from "./Components/Header";
export default function AppPage() {
  const router = useRouter();

  return (<>
  
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
      <div className="space-y-4 flex flex-col">
        <button
          onClick={() => router.push("/admin")}
          className="w-64 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Login as Admin
        </button>
        <button
          onClick={() => router.push("/signupNew")}
          className="w-64 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Signup as User
        </button>
        <button
          onClick={() => router.push("/login")}
          className="w-64 bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Login as User
        </button>
      </div>
    </div></>
  );
}
