"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; 
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.email === adminEmail) {
        router.push("/admin-workstation/dashboard");
      } else {
        alert("Akses ditolak: Anda bukan admin");
        await auth.signOut();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Login admin gagal: " + error.message);
      } else {
        alert("Login admin gagal: Terjadi error yang tidak diketahui");
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="h-full w-full py-[125px] px-8 flex md:items-end items-center justify-center bg-white">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black p-3 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-900/90 border hover:border-green-500 transition duration-300"
            >
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}