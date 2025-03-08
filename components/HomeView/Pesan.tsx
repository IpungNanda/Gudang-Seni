"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase"; // Pastikan Firestore sudah dikonfigurasi
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function variants() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 1.5 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
      },
    }),
  };
}

export default function Pesan() {
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "comments"), {
        email,
        pesan,
        createdAt: serverTimestamp(),
      });
      setMessage("✅ Pesan berhasil dikirim!");
      setEmail("");
      setPesan("");

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Gagal mengirim pesan.");
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={variants()}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-8 bg-cover bg-center"
    >
      <motion.img
        src="/assets/images/comment.png"
        alt="Illustration"
        className="w-3/4 md:w-1/3 mb-6 md:mb-0"
      />
      <motion.div
        variants={variants()}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full md:w-1/2 bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-300"
      >
        <h2 className="text-3xl font-bold mb-4 border-l-4 border-green-500 pl-3">Pesan</h2>
        <p className="text-gray-600">"Berikan kesan dan pesan serta kritikan untuk kami agar kami dapat lebih baik ke depannya."</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <motion.div variants={variants()} className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          <motion.div variants={variants()} className="mb-4">
            <label className="block text-gray-700 font-semibold">Pesan</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              placeholder="Ketik pesan Anda di sini"
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              required
            ></textarea>
          </motion.div>
          <button
            type="submit"
            className="w-full px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-900/90 transition"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-4 text-center text-sm font-semibold p-2 rounded-md ${
                message.includes("✅") ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
              }`}
            >
              {message}
            </motion.div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}
