"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

interface Product {
  name: string;
  price: number;
  sold: number;
  stock: number;
  category: string;
  location: string;
  shippingCost: string;
  imageUrl: string;
  whatsappNumber: string;
  description: string;
}

export default function ProductDetail() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          setProduct(productDoc.data() as Product);
        } else {
          console.error("Produk tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center p-6">Memuat...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md overflow-hidden mt-44 p-6 flex gap-6">
      {/* Gambar Produk */}
      <div className="w-1/2">
        <Image src={product.imageUrl} alt={product.name} width={400} height={400} className="w-full h-auto object-cover rounded-md" />
      </div>
      
      {/* Konten Produk */}
      <div className="w-1/2 flex flex-col justify-center">
        <button onClick={() => router.back()} className="text-blue-500 mb-4">&larr; Kembali</button>
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-xl text-green-700 font-semibold">Rp{product.price.toLocaleString("id-ID")}</p>
        <p className="text-gray-600">Terjual: {product.sold} | Stok: {product.stock}</p>
        
        {/* Detail Produk */}
        <div className="mt-4">
          <p className="text-gray-700"><strong>Kategori:</strong> {product.category}</p>
          <p className="text-gray-700"><strong>Dikirim dari:</strong> {product.location}</p>
        </div>
        
        {/* Deskripsi Produk */}
        <div className="mt-4">
          <p className="text-gray-700">{product.description}</p>
        </div>
        
        {/* Tombol WhatsApp */}
        <a
          href={`https://wa.me/${product.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block bg-green-500 text-white text-center py-2 rounded hover:bg-green-700"
        >
          Hubungi via WhatsApp
        </a>
      </div>
    </div>
  );
}
