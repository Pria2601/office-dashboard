import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/application_model";
import { v4 as uuidv4 } from "uuid";
// CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Adjust in production
  "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle CORS Preflight Requests
const handleOptionsRequest = () => new NextResponse(null, { status: 204, headers: corsHeaders });

// Create Application
export const createApplication = async (req: NextRequest): Promise<NextResponse> => {
  if (req.method === "OPTIONS") return handleOptionsRequest();

  try {
    await connectDB();
    const body = await req.json();

    // Get the current year from the server
    // const currentYear = new Date().toISOString().split('T')[0];
    // console.log(currentYear);
    const today = new Date();
const currentYear = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    // Ensure category is provided
    const { category } = body;
    if (!category) {
      return NextResponse.json({ error: "Category is required." }, { status: 400 });
    }

    // Generate a unique number (last 4 digits from UUID)
    const uniqueNumber = uuidv4().split("-")[0].slice(-4);
    
    // Create refid: year_category_uniquenumber
    const refid = `${currentYear}_${category}_${uniqueNumber}`;

    // Add refid to application data
    const newApplication = await Application.create({ ...body, refid });

    return NextResponse.json(
      { message: "Application submitted", data: newApplication },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Get All Applications
export const getApplications = async (req: NextRequest): Promise<NextResponse> => { // Fix: Accept `req` parameter
  if (req.method === "OPTIONS") return handleOptionsRequest(); // Fix: Ensure OPTIONS request is handled

  try {
    await connectDB();
    const applications = await Application.find();
    return NextResponse.json({ data: applications }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500, headers: corsHeaders }
    );
  }
};

// Update Application Status
export const updateApplicationStatus = async (req: NextRequest): Promise<NextResponse> => {
  if (req.method === "OPTIONS") return handleOptionsRequest();

  try {
    await connectDB();
    const { applicationId, status } = await req.json(); // Fix: Await JSON parsing

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: "Application ID and status are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: "Status updated successfully", data: updatedApplication },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500, headers: corsHeaders }
    );
  }
};
