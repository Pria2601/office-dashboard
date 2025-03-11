import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  await connectDB(); // Connect to MongoDB

  try {
    const { phone, password } = await req.json(); // ✅ Get phone & password from request body

    // Validate required fields
    if (!phone || !password) {
      return NextResponse.json({ error: "Phone and password are required." }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({ error: "User not found. Please sign up." }, { status: 404 });
    }
      if(user.status=="rejected"){
        return NextResponse.json({ error: "User rejected by admin." }, { status: 404 });
      }

      if(user.status=="pending"){
        return NextResponse.json({ error: "User's request is still pending . Please contact admin" }, { status: 404 });
      }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Generate JWT token
    // const token = jwt.sign(
    //   { userId: user._id, phone: user.phone },
    //   process.env.JWT_SECRET as string
      
    // );


      // const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      // console.log("Decoded Token:", decoded);
     
    

    // Send response
    return NextResponse.json(
      { message: "Login successful", token:"12345", user: { phone: user.phone, name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
