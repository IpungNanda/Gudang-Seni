"use client";

import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";

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

export default function ProdukPage() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [sold, setSold] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productData: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProductList(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    
    try {
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      const newProduct = { category, name, price, location, rating, sold, imageUrl };
      const docRef = await addDoc(collection(db, "products"), newProduct);
      setProductList([...productList, { id: docRef.id, ...newProduct }]);
      alert("Produk berhasil ditambahkan!");
      setCategory("");
      setName("");
      setPrice("");
      setLocation("");
      setRating(0);
      setSold(0);
      setImage(null);
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      setProductList(productList.filter((item) => item.id !== id));
      alert("Produk berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mt-6 mb-4">Daftar Produk</h2>
      <input 
        type="text" 
        placeholder="Cari produk..." 
        className="w-full p-2 border rounded mb-4"
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid gap-4">
        {productList.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-lg">
            <Image src={item.imageUrl} alt={item.name} width={200} height={200} className="rounded" />
            <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-700">{item.category} - {item.location}</p>
            <p className="text-gray-900 font-bold">{item.price}</p>
            <button 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => handleDelete(item.id)}
            >
              Hapus Produk
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
