import Image from "next/image";
import { auth } from "../auth";
import AuthButton from "./AuthButton";

export default async function Home() {
    const session = await auth();
    const username = session?.user?.name || "Guest";

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="absolute top-4 right-4">
        <AuthButton />
      </div>
      <h2>{JSON.stringify(session)}</h2>
      <h1 className="text-4xl font-bold">Welcome, {username}!</h1>
    </div>
  );
}
