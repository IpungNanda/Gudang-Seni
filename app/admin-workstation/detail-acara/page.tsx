"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

interface Event {
  title: string;
  description: string;
  imageUrl: string;
  route: string[];
  mapEmbedUrl: string;
}

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [route, setRoute] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const imageUrl = image ? URL.createObjectURL(image) : "";
      
      await addDoc(collection(db, "events"), {
        title,
        description,
        imageUrl,
        route: route.split(",").map((r) => r.trim()),
        mapEmbedUrl,
      });
      alert("Acara berhasil ditambahkan!");
      setTitle("");
      setDescription("");
      setImage(null);
      setRoute("");
      setMapEmbedUrl("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tambah Acara</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input 
          type="text" 
          placeholder="Judul Acara" 
          className="p-2 border rounded" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Deskripsi Acara" 
          className="p-2 border rounded" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="file" 
          accept="image/*" 
          className="p-2 border rounded" 
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <input 
          type="text" 
          placeholder="Rute (pisahkan dengan koma)" 
          className="p-2 border rounded" 
          value={route} 
          onChange={(e) => setRoute(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="URL Embed Peta" 
          className="p-2 border rounded" 
          value={mapEmbedUrl} 
          onChange={(e) => setMapEmbedUrl(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Tambah Acara
        </button>
      </form>
    </div>
  );
}