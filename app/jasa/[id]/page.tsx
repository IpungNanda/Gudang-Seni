"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

interface Service {
  name: string;
  price: number;
  sold: number;
  category: string;
  location: string;
  imageUrl: string;
  whatsappNumber: string;
  description: string;
}

export default function ServiceDetail() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [service, setService] = useState<Service | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const serviceDoc = await getDoc(doc(db, "services", id));
        if (serviceDoc.exists()) {
          setService(serviceDoc.data() as Service);
        } else {
          console.error("Jasa tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [id]);

  if (!service) {
    return <div className="text-center p-6">Memuat...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md overflow-hidden mt-44 p-6 flex gap-6">
      {/* Gambar Jasa */}
      <div className="w-1/2">
        <Image src={service.imageUrl} alt={service.name} width={400} height={400} className="w-full h-auto object-cover rounded-md" />
      </div>
      
      {/* Konten Jasa */}
      <div className="w-1/2 flex flex-col justify-center">
        <button onClick={() => router.back()} className="text-blue-500 mb-4">&larr; Kembali</button>
        <h2 className="text-3xl font-bold mb-4">{service.name}</h2>
        <p className="text-xl text-green-700 font-semibold">Rp{service.price.toLocaleString("id-ID")}</p>
        <p className="text-gray-600">Terjual: {service.sold}</p>
        
        {/* Detail Jasa */}
        <div className="mt-4">
          <p className="text-gray-700"><strong>Kategori:</strong> {service.category}</p>
          <p className="text-gray-700"><strong>Lokasi:</strong> {service.location}</p>
        </div>
        
        {/* Deskripsi Jasa */}
        <div className="mt-4">
          <p className="text-gray-700">{service.description}</p>
        </div>
        
        {/* Tombol WhatsApp */}
        <a
          href={`https://wa.me/${service.whatsappNumber}`}
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
