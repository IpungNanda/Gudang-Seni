'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';

interface EventForm {
  title: string;
  description: string;
  imageUrl: string;
  route: string;
  mapEmbedUrl: string;
}

export default function AdminEventForm() {
  const { register, handleSubmit, reset } = useForm<EventForm>();
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

  const onSubmit: SubmitHandler<EventForm> = async (data) => {
    if (!imageUrl) {
      alert('Harap unggah gambar terlebih dahulu.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'events'), {
        title: data.title,
        description: data.description,
        imageUrl,
        route: data.route.split(',').map((r) => r.trim()),
        mapEmbedUrl: data.mapEmbedUrl,
      });
      reset();
      setImageUrl('');
      alert('Acara berhasil ditambahkan!');
    } catch (error) {
      console.error('Error adding event:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Tambah Acara Baru</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Judul Acara</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Upload Gambar</label>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                uploadImage(e.target.files[0]);
              }
            }}
            className="w-full border p-2 rounded"
          />
          {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>
        <div>
          <label className="block text-sm font-medium">Rute (pisahkan dengan koma)</label>
          <input
            type="text"
            {...register('route')}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">URL Embed Peta</label>
          <input
            type="text"
            {...register('mapEmbedUrl')}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Acara'}
        </button>
      </form>
    </div>
  );
}
