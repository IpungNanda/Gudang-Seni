"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const requirements = [
  "Berdomilisili di Kota Solo",
  "Memiliki Jasa, Produk Kesenian",
  "Melengkapi Pemberkasan",
];

export default function Join() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % requirements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6">
      {/* Bingkai di Kiri */}
      <div className="relative w-full max-w-lg md:w-1/2">
        <img
          src="/assets/images/bingkai_daftar.png"
          alt="Bingkai"
          className="w-full h-auto"
        />
        {/* Konten di dalam Bingkai */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-10 py-12 text-center">
          <h2 className="text-lg font-bold mt-32 ml-42 bg-green-500 text-white px-4 py-2 rounded-md absolute top-5">
            • PERSYARATAN •
          </h2>

          <div className="mt-16 h-32 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold ml-42 text-black px-4"
              >
                {requirements[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Deskripsi & Tombol di Kanan */}
      <div className="md:w-1/2 mt-6 md:mt-0 md:ml-12 text-center md:text-left">
        <h2 className="text-4xl font-bold text-ba">Gabung Sekarang!</h2>
        <p className="text-xl text-gray-700 mt-4 max-w-md">
          Bersama-sama, kita dapat menciptakan momentum yang kuat, membangun hubungan yang bermakna, dan merangkul keragaman untuk mencapai tujuan bersama.
        </p>
        <button className="mt-6 px-8 py-4 bg-green-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-green-900/90 transition duration-300">
          Daftar Sekarang!
        </button>
      </div>
    </div>
  );
}
