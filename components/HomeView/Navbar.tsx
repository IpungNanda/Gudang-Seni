"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Jangan tampilkan navbar jika berada di halaman admin
  if ((pathname ?? "").startsWith("/admin")) return null;

  const menuVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-30">
      <div className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image 
            src="/assets/images/logo_animasi.png" 
            alt="Gudang Seni Logo" 
            width={70} 
            height={70} 
            className="cursor-pointer"
          />
        </Link>



        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700">
          <li>
            <Link href="#acara" className="flex items-center space-x-1 hover:text-green-900/90">
              <FaMapMarkerAlt />
              <span>Acara Terkini</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:text-green-900/90">Produk</Link>
          </li>
          <li>
            <Link href="#" className="hover:text-green-900/90">Daftar</Link>
          </li>
          <li>
            <button className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-900/90">
              Masuk
            </button>
          </li>
        </ul>

        {/* Menu Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-green-500 hover:text-green-900/90 text-2xl">
          ☰
        </button>
      </div>

      {/* Dropdown Menu Mobile */}
      <motion.div initial="closed" animate={isOpen ? "open" : "closed"} variants={menuVariants} className="md:hidden overflow-hidden bg-white shadow-md">
        <ul className="flex flex-col items-center py-4 text-gray-700">
          <li className="py-2">
            <Link href="#" className="flex items-center space-x-1 hover:text-green-900/90">
              <FaMapMarkerAlt />
              <span>Peta Kesenian</span>
            </Link>
          </li>
          <li className="py-2">
            <Link href="#" className="hover:text-green-900/90">Produk</Link>
          </li>
          <li className="py-2">
            <Link href="#" className="hover:text-green-900/90">Daftar</Link>
          </li>
          <li className="py-2">
            <button className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-900/90">
              Masuk
            </button>
          </li>
        </ul>
      </motion.div>
    </nav>
  );
}
