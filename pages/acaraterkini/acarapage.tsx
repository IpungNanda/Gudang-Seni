'use client';

import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';

interface Acara {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function DashboardAcara() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [acaraList, setAcaraList] = useState<Acara[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAcara = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const acaraData: Acara[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Acara[];
        setAcaraList(acaraData);
      } catch (error) {
        console.error('Error fetching acara:', error);
      }
    };
    fetchAcara();
  }, []);

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    
    try {
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const newAcara = {
        title,
        description,
        imageUrl,
      };

      const docRef = await addDoc(collection(db, 'events'), newAcara);
      setAcaraList([...acaraList, { id: docRef.id, ...newAcara }]);

      alert('Acara berhasil ditambahkan!');
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error uploading:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus acara ini?')) return;
    try {
      await deleteDoc(doc(db, 'events', id));
      setAcaraList(acaraList.filter((item) => item.id !== id));
      alert('Acara berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting acara:', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mt-6 mb-4">Manajemen Acara</h2>
      <input 
        type="text" 
        placeholder="Cari acara..." 
        className="w-full p-2 border rounded mb-4"
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid gap-4">
        {acaraList.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-lg">
            <Image src={item.imageUrl} alt={item.title} width={200} height={200} className="rounded" />
            <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
            <button 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => handleDelete(item.id)}
            >
              Hapus Acara
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}