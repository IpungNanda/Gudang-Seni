'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ProductForm {
  category: string;
  name: string;
  price: string;
  location: string;
  rating: number;
  sold: number;
  stock: number;
  description: string;
  imageUrl: string;
}

export default function InputProduk() {
  const { register, handleSubmit, reset } = useForm<ProductForm>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const fetchWhatsappNumber = async () => {
      const querySnapshot = await getDocs(collection(db, 'settings'));
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setWhatsappNumber(data.whatsappNumber || '');
      }
    };
    fetchWhatsappNumber();
  }, []);

  const uploadImage = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    if (!imageUrl) {
      alert('Harap unggah gambar terlebih dahulu.');
      return;
    }
    if (data.stock < 0) {
      alert('Stok tidak boleh negatif.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        category: data.category,
        name: data.name,
        price: data.price,
        location: data.location,
        rating: data.rating,
        sold: data.sold,
        stock: data.stock,
        description: data.description,
        imageUrl,
      });
      reset();
      setImageUrl('');
      alert('Produk berhasil ditambahkan!');
    } catch (error) {
      console.error('Error menambahkan produk:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Kategori</label>
          <select {...register('category', { required: true })} className="w-full border p-2 rounded" required>
            <option value="">Pilih Kategori</option>
            <option value="Seni Musik">Seni Musik</option>
            <option value="Seni Tari">Seni Tari</option>
            <option value="Seni Kriya">Seni Kriya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Nama Produk</label>
          <input type="text" {...register('name', { required: true })} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Harga</label>
          <input type="number" {...register('price', { required: true })} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Lokasi</label>
          <input type="text" {...register('location', { required: true })} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Rating</label>
          <input type="number" {...register('rating', { required: true })} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Terjual</label>
          <input type="number" {...register('sold', { required: true })} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Stok</label>
          <input type="number" {...register('stock', { required: true, min: 0 })} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea {...register('description', { required: true })} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Upload Gambar</label>
          <input type="file" onChange={(e) => { if (e.target.files && e.target.files.length > 0) { uploadImage(e.target.files[0]); } }} className="w-full border p-2 rounded" />
          {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </form>
      {whatsappNumber && (
        <div className="mt-4 text-center">
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 block">Hubungi via WhatsApp</a>
        </div>
      )}
    </div>
  );
}
