"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  route: string[];
  mapEmbedUrl: string;
}

export default function DetailAcaraPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventData: Event[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Judul Tidak Tersedia",
            description: data.description || "Deskripsi Tidak Tersedia",
            imageUrl: data.imageUrl || "/default-image.jpg", // Default jika tidak ada gambar
            route: data.route || [],
            mapEmbedUrl: data.mapEmbedUrl || "",
          };
        });
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus acara ini?")) return;
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents(events.filter((event) => event.id !== id));
      alert("Event berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mt-6 mb-4">Daftar Acara</h2>
      <input 
        type="text" 
        placeholder="Cari acara..." 
        className="w-full p-2 border rounded mb-4"
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid gap-4">
        {events.filter(event => 
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((event) => (
          <div key={event.id} className="border p-4 rounded shadow-lg">
            {event.imageUrl ? (
              <Image 
                src={event.imageUrl} 
                alt={event.title} 
                width={200} 
                height={200} 
                className="rounded"
                unoptimized 
              />
            ) : (
              <p className="text-red-500">Gambar tidak tersedia</p>
            )}
            <h3 className="text-xl font-semibold mt-2">{event.title}</h3>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-900 font-bold">Rute: {event.route.join(", ")}</p>
            {event.mapEmbedUrl && (
              <iframe src={event.mapEmbedUrl} className="w-full h-40 mt-2" allowFullScreen></iframe>
            )}
            <button 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => handleDelete(event.id)}
            >
              Hapus Acara
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
