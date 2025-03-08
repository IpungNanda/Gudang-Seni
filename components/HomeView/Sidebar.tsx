"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaNewspaper, FaBox, FaComments } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();

  const shouldShowSidebar =
    pathname === "/admin-workstation/dashboard" ||
    pathname === "/admin-workstation/acara-terkini" ||
    pathname === "/admin-workstation/detail-acara" ||
    pathname === "/admin-workstation/produk-kesenian" ||
    pathname === "/admin-workstation/jasa-kesenian" ||
    pathname === "/admin-workstation/kerjasama";

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!shouldShowSidebar) return null;

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);

      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <button
        className="md:hidden p-4 text-white font-bold bg-green-500 fixed top-0 left-0 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-green-500 text-white h-screen fixed top-0 left-0 pt-5 transition-transform duration-300 z-40`}
      >
        <div className="flex pt-12 items-center font-bold gap-2 px-6 mb-5">
          <Link href="/">
            <img
              src="/assets/images/logo_animasi.png"
              alt="Logo"
              className="w-10 h-10"
            />
          </Link>
          <h1> Gudang-Data</h1>
        </div>

        <ul className="list-none p-0">
          <li className="flex py-4 px-6 hover:bg-green-900/90 hover:text-[#ff7f00]">
            <MdDashboard />
            <Link
              href="/admin-workstation/dashboard"
              className="block font-bold"
            >
              DASHBOARD
            </Link>
          </li>
          <li className="py-4 flex px-6 hover:bg-green-900/90">
            <FaNewspaper />
            <Link href="/admin-workstation/acara-terkini" className="block font-bold">
              Acara Terkini
            </Link>
          </li>
          <li className="py-4 flex px-6 hover:bg-green-900/90">
            <FaComments />
            <Link href="/admin-workstation/produk-kesenian" className="block font-bold">
              Produk Kesenian
            </Link>
          </li>
          <li className="py-4 flex px-6 hover:bg-green-900/90">
            <FaComments />
            <Link href="/admin-workstation/jasa-kesenian" className="block font-bold">
              Jasa Kesenian
            </Link>
          </li>
          <li className="py-4 flex px-6 hover:bg-green-900/90">
            <FaComments />
            <Link href="/admin-workstation/comments" className="block font-bold">
              Pesan
            </Link>
          </li>
        </ul>

        <div className="absolute bottom-5 left-0 right-0 p-6">
          {userEmail && (
            <div className="text-center text-lg font-bold text-white mb-6">
              Selamat datang, {userEmail}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="font-bold w-full py-2 px-4 text-white border-2 hover:border-white border-green-500 bg-red-600 rounded-lg hover:bg-green-900/90 transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
