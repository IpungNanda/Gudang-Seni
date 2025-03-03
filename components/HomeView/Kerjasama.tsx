'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const partners = [
  {
    name: 'Google Developer Student Clubs',
    university: 'Universitas Dian Nuswantoro',
    logo: '/assets/images/Logo ICT.png',
  },
  {
    name: 'Microsoft Learn Student Ambassadors',
    university: 'Universitas XYZ',
    logo: '/assets/images/Unisri_logo.png',
  },
  {
    name: 'AWS Educate',
    university: 'Universitas ABC',
    logo: '/assets/images/Logo ICT.png',
  },
];

export default function Kerjasama() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center p-10 min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/assets/images/bg_kerjasama.png')" }}
    >
      {/* Bubble Animation */}
      {[...Array(7)].map((_, i) => {
        const size = Math.random() * 50 + 20;
        return (
          <motion.div
            key={i}
            className="absolute bg-green-300 opacity-50 rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: i % 2 === 0 ? `${Math.random() * 50}%` : 'auto',
              right: i % 2 !== 0 ? `${Math.random() * 50}%` : 'auto',
            }}
            animate={{ 
              y: [Math.random() * -50, Math.random() * 50, Math.random() * -50],
              x: [Math.random() * -20, Math.random() * 20, Math.random() * -20],
              opacity: [0.3, 0.6, 0.3], 
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: Math.random() * 4 + 3, ease: "easeInOut", repeat: Infinity }}
          />
        );
      })}
      
      <div className="w-full flex flex-col items-center mb-6">
        <div className="w-24 h-1 bg-green-500 mb-2"></div>
        <h2 className="text-3xl font-bold text-black">Bekerja Sama Dengan</h2>
      </div>
      <motion.div
        key={partners[index].name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <img src={partners[index].logo} alt={partners[index].name} className="w-40 h-40 object-contain mb-6" />
        <p className="text-2xl font-semibold text-gray-800 text-center">{partners[index].name}</p>
        <p className="text-lg text-gray-600 text-center">{partners[index].university}</p>
      </motion.div>
    </div>
  );
}