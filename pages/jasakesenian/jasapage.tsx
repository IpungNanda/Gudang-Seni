"use client";

import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";

interface Service {
  id: string;
  category: string;
  name: string;
  price: string;
  location: string;
  rating: number;
  sold: number;
  imageUrl: string;
}

export default function JasaPage() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [sold, setSold] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const serviceData: Service[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Fetched Data:", data); // Debugging
          return {
            id: doc.id,
            category: data.category || "",
            name: data.name || "Nama Tidak Tersedia",
            price: data.price || "Harga Tidak Tersedia",
            location: data.location || "",
            rating: data.rating || 0,
            sold: data.sold || 0,
            imageUrl: data.imageUrl || "",
          };
        });
        setServiceList(serviceData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);
  

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    
    try {
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      const newService: Omit<Service, "id"> = { category, name, price, location, rating, sold, imageUrl };
      
      const docRef = await addDoc(collection(db, "services"), newService);
      setServiceList([...serviceList, { id: docRef.id, ...newService }]);
      alert("Jasa berhasil ditambahkan!");
      
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
    if (!confirm("Apakah Anda yakin ingin menghapus jasa ini?")) return;
    try {
      await deleteDoc(doc(db, "services", id));
      setServiceList(serviceList.filter((item) => item.id !== id));
      alert("Jasa berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mt-6 mb-4">Daftar Jasa</h2>
      <input 
        type="text" 
        placeholder="Cari jasa..." 
        className="w-full p-2 border rounded mb-4"
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid gap-4">
        {serviceList.filter(item => 
          (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
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
              Hapus Jasa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}