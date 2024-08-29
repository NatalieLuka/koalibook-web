"use client";
import Image from "next/image";
import LoginForm from "../components/login-form";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="page-container">
        <h1>Welcome to Koalibook</h1>
        <h2>Your Cozy Space to Manage Your Reading Journey!</h2>

        <p>
          Koalibook is where bookworms meet cozy vibes. Track your reading
          progress, organize your bookshelf, and discover new favorites. Whether
          you’re managing your personal library or setting reading goals,
          Koalibook is here to make your reading journey enjoyable and fun. Dive
          in and let’s start turning those pages together!
        </p>
        <div>
          <h3>Login</h3>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
