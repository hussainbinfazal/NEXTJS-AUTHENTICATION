"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/register", { email, password, name, phoneNumber, role });
    // Optionally handle success or error after signIn
    console.log(res.data);
    router.push("/login");
    

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Enter Your Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 space-y-2">
        <button
          onClick={() => signIn("google")}
          className="w-full p-2 bg-red-500 text-white rounded"
        >
          Sign In with Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          SignIn with GitHub
        </button>
      </div>
    </div>
  );
}
