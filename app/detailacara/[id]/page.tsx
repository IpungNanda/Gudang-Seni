'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';

interface Acara {
  title: string;
  description: string;
  imageUrl: string;
  route: string[];
  mapEmbedUrl: string;
}

export default function DetailAcara() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [acara, setAcara] = useState<Acara | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchAcara = async () => {
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAcara(docSnap.data() as Acara);
        } else {
          console.error('Acara tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching acara:', error);
      }
    };

    fetchAcara();
  }, [id]);

  if (!acara) {
    return <div className="text-center p-6">Memuat...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-hidden mt-6">
      {/* Gambar utama */}
      <Image src={acara.imageUrl} alt={acara.title} width={800} height={400} className="w-full object-cover" />
      
      {/* Konten acara */}
      <div className="p-6">
        <button onClick={() => router.back()} className="text-blue-500 mb-4">&larr; Kembali</button>
        <h2 className="text-3xl font-bold mb-4 text-center">{acara.title}</h2>
        <p className="text-gray-700 mb-4 text-justify">{acara.description}</p>
        
        {/* Rute Kirab */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Rute Kirab:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {acara.route.map((routePoint, index) => (
              <li key={index}>{routePoint}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Peta Lokasi */}
      <div className="w-full">
        <iframe
          src={acara.mapEmbedUrl}
          className="w-full h-96"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}