"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

export default function CategorySearchBar() {
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = ["Semua Kategori", "Seni Musik", "Seni Kriya", "Seni Tari"];

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center bg-white border-green-950 p-8 rounded-full shadow-md space-y-2 md:space-y-0 md:space-x-2 w-full max-w-2xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 px-4 w-full md:w-auto">
        <FaBars className="text-brown-500" />
        <span className="font-semibold text-brown-600">Telusuri</span>
      </div>
      
      {/* Dropdown Wrapper */}
      <div className="relative w-full md:w-auto">
        <button
          className="bg-transparent outline-none text-gray-700 px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto flex items-center justify-between"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedCategory}
          <FaChevronDown className="ml-2 text-gray-600" />
        </button>
        
        {isDropdownOpen && (
          <ul className="absolute left-0 mt-2 w-full md:w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
            {categories.map((category, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category);
                  setIsDropdownOpen(false);
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1 relative w-full">
        <input
          type="text"
          placeholder="Cari lokasi.."
          className="w-full bg-transparent outline-none text-gray-700 px-4 py-2 border border-gray-300 rounded-md"
        />
        <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-500" />
      </div>
    </motion.div>
  );
}
