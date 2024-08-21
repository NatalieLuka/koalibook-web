"use client";
import { useAuth } from "@clerk/nextjs";

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
      <div>
        <p>I am the Profiles page</p>
        <button onClick={handleSignOut}>Logout</button>
      </div>
    </main>
  );
}
