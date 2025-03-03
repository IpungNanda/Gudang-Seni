'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ProductForm {
  category: string;
  name: string;
  price: string;
  location: string;
  rating: number;
  sold: number;
  imageUrl: string;
}

export default function InputProduk() {
  const { register, handleSubmit, reset } = useForm<ProductForm>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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
    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        category: data.category,
        name: data.name,
        price: data.price,
        location: data.location,
        rating: data.rating,
        sold: data.sold,
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
          <label className="block text-sm font-medium">Upload Gambar</label>
          <input type="file" onChange={(e) => { if (e.target.files && e.target.files.length > 0) { uploadImage(e.target.files[0]); } }} className="w-full border p-2 rounded" />
          {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </form>
    </div>
  );
}
