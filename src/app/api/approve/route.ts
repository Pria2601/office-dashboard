import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest) {
  await connectDB(); // Connect to MongoDB

  try {
    const { _id, status } = await req.json(); // Get _id and status from request body

    // Validate _id
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Validate status
    const validStatuses = ["approved", "pending", "rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { status }, // Update status dynamically
      { new: true, runValidators: true } // Return updated user and run validation
    ).select("-password"); // Exclude password from response

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: `User status updated to ${status}`, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
