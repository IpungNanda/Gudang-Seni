"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  category: string;
  name: string;
  price: string;
  location: string;
  rating: number;
  sold: number;
  imageUrl: string;
}

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg w-80 flex-shrink-0"
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-72 h-48 relative overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <p className="text-sm text-orange-500 mt-3">{product.category}</p>
      <h3 className="text-xl font-semibold truncate">{product.name}</h3>
      <p className="text-gray-600 font-bold text-lg">{product.price}</p>
      <p className="text-gray-500 text-sm">{product.location}</p>
      <p className="text-gray-400 text-sm">⭐ {product.rating} | Terjual {product.sold}</p>
    </motion.div>
  );
};

export default ProductCard;
