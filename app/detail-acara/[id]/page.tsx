'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Acara {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  mapEmbedUrl: string;
}

export default function KegiatanTerkini() {
  const [acara, setAcara] = useState<Acara | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : params?.id?.[0];

  useEffect(() => {
    const fetchAcara = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAcara({ id: docSnap.id, ...docSnap.data() } as Acara);
        } else {
          console.error('Acara tidak ditemukan');
          setAcara(null);
        }
      } catch (error) {
        console.error('Error fetching acara:', error);
      }
      setLoading(false);
    };
    fetchAcara();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading event details...</p>;
  if (!acara) return <p className="text-center text-red-500">Event not found</p>;

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4 py-6">
      <div className="w-full flex justify-center">
        <Image src={acara.imageUrl} alt={acara.title} width={800} height={400} className="rounded-lg object-cover" />
      </div>
      <h2 className="text-3xl font-bold mt-6">{acara.title}</h2>
      <p className="mt-4 leading-relaxed">{acara.description}</p>
      {acara.mapEmbedUrl && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Lokasi Acara</h3>
          <iframe src={acara.mapEmbedUrl} className="w-full h-80 mt-2 border rounded-lg" allowFullScreen></iframe>
        </div>
      )}
    </div>
  );
}
