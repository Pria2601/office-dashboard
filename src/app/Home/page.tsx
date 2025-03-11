import React from "react";
import Link from "next/link"; // Import Link
import ProtectedRoute from "../protecteduser/page";

import { FaPlusCircle, FaClock, FaClipboardList } from "react-icons/fa";

const Home = () => {
  

  return (<ProtectedRoute>
    <div className="min-h-screen bg-gray-100">
           {/* Hero Section */}
      <div className="bg-teal-700 text-white py-16 px-6 flex justify-center items-center">
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Effortless Office Management at Your Fingertips!</h2>
          <p className="mt-4 text-lg">
            Take control of your daily tasks with ease. Our smart dashboard helps you manage applications, status, and notifications—all in one place.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-12 px-6">
      
<Link href="/add">
  <FeatureCard
    icon={<FaPlusCircle size={32} className="text-teal-600" />}
    title="New Application"
    description="Add a new application and track progress easily."
    buttonText="Click to add"
  />
</Link>
<Link href="/viewapp">

        <FeatureCard
          icon={<FaClock size={32} className="text-teal-600" />}
          title="Application Status"
          description="Check the current status of your application."
          buttonText="Click to check"
        /></Link>

        <FeatureCard
          icon={<FaClipboardList size={32} className="text-teal-600" />}
          title="Summary"
          description="View a summary of your applications."
          buttonText="Click to view"
        />
      </div>
    </div></ProtectedRoute>
  );
};

// Define an interface for FeatureCard props
interface FeatureCardProps {
  icon:  React.ReactNode;   // The icon should be a JSX element
  title: string;       // The title should be a string
  description: string; // The description should be a string
  buttonText: string;  // The button text should be a string
}

// Use React.FC to define the functional component with typed props
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, buttonText }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg">
        {buttonText}
      </button>
    </div>
  );
};

export default Home;
