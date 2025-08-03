import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../db";
import User from "../userModel";

interface IUser {
  email: string;
  password: string;
  name?: string;
  phoneNumber?: string;
  profile?: string;
  role: "user" | "admin";
}
export async function authenticateUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    await connectToDatabase();

    const user = await (User as any).findOne({ email: credentials.email }).select(
      "+password"
    );
    console.log("User found:", !!user);
    
    if (!user) {
      console.log("No user found with email:", credentials.email);
      return null;
    }

    const isValid = bcrypt.compare(credentials.password, user.password);
    console.log("Password valid:", isValid);
    
    if (!isValid) return null;

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
