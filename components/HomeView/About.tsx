"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import aboutImage from "@/public/assets/images/tari.png";
import bgPattern from "@/public/assets/images/bg-batik.png";
import bgAbout from "@/public/assets/images/bg-about.png";
import CategorySearchBar from "./Category";

export default function About() {
  const words = ["Produk Kesenian", "Produk Kesenian", "Acara Kesenian"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        if (displayText.length === 1) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(word.slice(0, displayText.length + 1));
        if (displayText.length + 1 === word.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <div>
      <div
        className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-green-500 px-6 py-16"
        style={{ backgroundImage: `url(${bgAbout.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Card dengan margin atas lebih besar agar tidak naik ke atas */}
        <div
          className="relative flex flex-col md:flex-row items-start p-6 md:p-8 rounded-xl shadow-lg max-w-3xl w-full overflow-hidden mt-16"
          style={{ backgroundImage: `url(${bgPattern.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-green-900/90 rounded-xl"></div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full md:w-2/3 text-left relative z-10 p-2"
          >
            <h2 className="text-lg md:text-xl text-white">Selamat Datang</h2>
            <h1 className="text-2xl md:text-3xl font-bold mt-2 text-white">
              Jelajahi <span className="bg-green-500 text-white px-2 rounded-lg">{displayText}</span>
            </h1>
            <p className="text-white mt-4 text-lg">
              Gudang Seni merupakan penyedia layanan pertama yang mempertemukan produk dan jasa kesenian di Kota Solo, tempat untuk menemukan berbagai karya seni dan layanan dari seniman lokal di Kota Solo.
            </p>
          </motion.div>
        </div>

        {/* Gambar Digeser ke Bawah di Mobile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative mt-20 md:mt-0 md:absolute md:right-10 md:bottom-auto z-20"
        >
          <Image
            src={aboutImage}
            alt="Penari Solo"
            className="w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px] h-auto object-contain md:mr-16"
          />
        </motion.div>
      </div>

      {/* Category Search Bar */}
      
    </div>
  );
}
