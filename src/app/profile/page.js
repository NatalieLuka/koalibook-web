"use client";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export default function Profile() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("SignOut Error:", error);
    }
  };
  return (
    <main>
      <Navbar />
      <div className="container">
        <h1>My Profile</h1>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </main>
  );
}
