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
  await connectToDatabase();

  const user = await (User as any).findOne({ email: credentials.email }).select(
    "+password"
  );
  if (!user) return null;

  const isValid = bcrypt.compareSync(credentials.password, user.password);
  if (!isValid) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };
}
