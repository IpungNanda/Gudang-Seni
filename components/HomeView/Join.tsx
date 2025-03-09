"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const requirements = [
  "Berdomisili di Kota Solo",
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

  const whatsappMessage = encodeURIComponent(
    "Mari bersama-sama mengangkat nilai seni dan kreativitas! Kami siap membantu Anda memasarkan produk dan jasa, membuka peluang baru, dan menjangkau lebih banyak pelanggan. Bergabunglah dengan Gudang Seni dan wujudkan kolaborasi yang menginspirasi!"
  );
  const whatsappLink = `https://wa.me/62895805399090?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 md:p-12 gap-8 w-full max-w-6xl mx-auto">
      {/* Bingkai di Kiri */}
      <div className="relative w-full md:w-1/3 flex items-center justify-center">
        <img
          src="/assets/images/bingkai_daftar.png"
          alt="Bingkai"
          className="w-full max-w-xs md:max-w-sm lg:max-w-md"
        />
        {/* Konten di dalam Bingkai */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mt-16 h-32 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-semibold text-black px-4"
              >
                {requirements[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Deskripsi & Tombol di Kanan */}
      <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Gabung Sekarang!</h2>
        <p className="text-lg md:text-xl text-gray-700 mt-4">
          Bersama-sama, kita dapat menciptakan momentum yang kuat, membangun hubungan yang bermakna, dan merangkul keragaman untuk mencapai tujuan bersama.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 px-6 py-3 md:px-8 md:py-4 bg-green-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Daftar Sekarang!
        </a>
      </div>
    </div>
  );
}
