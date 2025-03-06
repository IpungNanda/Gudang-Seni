'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Acara {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  route: string[];
  mapEmbedUrl: string;
}

export default function KegiatanTerkini() {
  const [kegiatan, setKegiatan] = useState<Acara[]>([]);
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchAcara = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const acaraData: Acara[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Acara[];
        setKegiatan(acaraData);
      } catch (error) {
        console.error('Error fetching acara:', error);
      }
    };

    fetchAcara();
  }, []);

  useEffect(() => {
    if (kegiatan.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % kegiatan.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [kegiatan]);

  return (
    <div id="acara" className="flex flex-col md:flex-row items-center justify-center p-6 min-h-screen md:px-24">
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/assets/images/tari2.png"
          alt="Tari"
          width={384}
          height={384}
          className="w-64 h-auto md:w-96 md:h-auto object-contain"
        />
      </div>
      <div className="w-full md:w-1/2 text-left p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 border-l-4 border-green-500 pl-3">
          Acara Terkini
        </h2>
        <p className="text-gray-600 text-sm md:text-base">Nantikan Acara Kebudayaan Terkini di Kota Solo</p>

        <div className="relative w-full overflow-hidden mt-6 h-[400px]">
          {kegiatan.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={kegiatan[index]?.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center text-center bg-gray-200 p-6 md:p-8 rounded-lg shadow-lg w-full h-full cursor-pointer"
                onClick={() => router.push(`/detailacara/${kegiatan[index]?.id}`)}
              >
                <Image
                  src={kegiatan[index]?.imageUrl ?? '/placeholder.png'}
                  alt={kegiatan[index]?.title ?? 'Acara'}
                  width={750}
                  height={750}
                  className="w-36 h-auto md:w-44 md:h-auto object-contain rounded"
                />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-4">
                  {kegiatan[index]?.title ?? 'Judul tidak tersedia'}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mt-4 line-clamp-3">
                  {kegiatan[index]?.description ?? 'Deskripsi tidak tersedia'}
                </p>
              </motion.div>
            </AnimatePresence>
          ) : (
            <p className="text-gray-500 text-center mt-6">Belum ada acara tersedia</p>
          )}
        </div>
      </div>
    </div>
  );
}
