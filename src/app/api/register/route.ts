import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../../db";
import User from "../../../userModel";

interface IUser {
  email: string;
  password: string;
  name?: string;
  phoneNumber?: string;
  profile?: string;
  role: "user" | "admin";
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phoneNumber, profile } = await req.json();

    await connectToDatabase();

    const existingUser = await (User as any).findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const pwHash = bcrypt.hashSync(password, 10);
    const newUser = new User({
      email,
      password: pwHash,
      name,
      phoneNumber,
      profile,
      role: "user",
    });

    await newUser.save();
    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
