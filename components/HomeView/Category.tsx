"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/HomeView/Card";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Item {
  id: string;
  category: string;
  name: string;
  price: string;
  location: string;
  rating: number;
  sold: number;
  imageUrl: string;
}

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const categories = ["Semua Kategori", "Seni Musik", "Seni Kriya", "Seni Tari"];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      const productSnapshot = await getDocs(collection(db, "products"));
      const serviceSnapshot = await getDocs(collection(db, "services"));
      const productList: Item[] = productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Item));
      const serviceList: Item[] = serviceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Item));
      setItems([...productList, ...serviceList]);
    };
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-2xl">
      <motion.div
        className="flex flex-col md:flex-row items-center bg-white border-green-950 p-8 rounded-full shadow-md space-y-2 md:space-y-0 md:space-x-2 w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-2 px-4 w-full md:w-auto">
          <FaBars className="text-brown-500" />
          <span className="font-semibold text-brown-600">Telusuri</span>
        </div>
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

      <motion.div 
        className="text-lg font-semibold text-gray-700" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.3 }}
      >
        Menampilkan kategori: {selectedCategory}
      </motion.div>

      <div className="p-6 relative mx-4 w-full">
        <div className="mb-4">
          <div className="w-16 h-1 bg-green-500 mb-2"></div>
          <h2 className="text-2xl font-bold text-start">Hasil Pencarian</h2>
        </div>
        <div className="overflow-hidden w-full -ml-5">
          <motion.div
            className="flex gap-4"
            initial={{ x: 0 }}
            animate={{ x: `-${index * (isMobile ? 100 : 25)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {items
              .filter((item) => selectedCategory === "Semua Kategori" || item.category === selectedCategory)
              .map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
          </motion.div>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
            className="bg-green-500 hover:bg-green-900/90 text-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setIndex((prev) => Math.min(prev + 1, items.length - 1))}
            className="bg-green-500 hover:bg-green-900/90 text-white p-2 rounded-full shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}