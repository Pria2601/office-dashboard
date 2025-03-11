import dotenv from "dotenv";
dotenv.config();
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json(); // Correct way to parse JSON body

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const adminUsername = process.env.ADMIN_USERNAME || "assamofficeadmin";
    const adminPassword = process.env.ADMIN_PASSWORD || "assamofficepassword";
    const jwtSecret = process.env.JWT_SECRET || "randomsecret";
//     console.log(username, password)
// console.log(adminUsername, adminPassword)
    if (!adminUsername || !adminPassword|| !jwtSecret ) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Check admin username
    if (username != adminUsername) {
      return NextResponse.json({ error: "Invalid username" }, { status: 401 });
    }

    // Check password (if stored as hashed in .env)
    if (password!=adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ role: "admin", username: adminUsername }, jwtSecret);
    

    // const hash = bcrypt.hashSync("assamofficepassword", 10);
    // console.log(hash); // Store this hash in your .env file
    
    return NextResponse.json({ message: "Login successful",token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
