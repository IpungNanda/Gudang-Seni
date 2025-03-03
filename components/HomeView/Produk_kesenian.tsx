"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import ProductCard from "@/components/HomeView/Card";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  location: string;
  rating: number;
  sold: number;
  imageUrl: string;
}

export default function ProdukKesenian() {
  const [products, setProducts] = useState<Product[]>([]);
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList: Product[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 relative mx-4">
      <div className="mb-4">
        <div className="w-16 h-1 bg-green-500 mb-2"></div>
        <h2 className="text-2xl font-bold text-start">Produk Kesenian</h2>
      </div>
      <div className="overflow-hidden w-full -ml-5">
        <motion.div
          className="flex gap-4"
          initial={{ x: 0 }}
          animate={{ x: `-${index * (isMobile ? 100 : 25)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
          onClick={() => setIndex((prev) => Math.min(prev + 1, products.length - 1))}
          className="bg-green-500 hover:bg-green-900/90 text-white p-2 rounded-full shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
