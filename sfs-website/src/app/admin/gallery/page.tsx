'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useStore } from '@/providers/StoreProvider';
import { supabase } from '@/lib/supabase';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminGalleryPage() {
  const { gallery: images, refreshData } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newAlt, setNewAlt] = useState('');
  const [newCategory, setNewCategory] = useState('store');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newAlt.trim() || !newImage) return;
    setLoading(true);
    const { error } = await supabase.from('gallery').insert({
      id: `g_${Date.now()}`,
      src: newImage,
      alt: newAlt,
      category: newCategory,
    });
    if (error) {
      alert(`Error adding photo: ${error.message}`);
    } else {
      await refreshData();
      setShowAdd(false);
      setNewAlt('');
      setNewImage('');
    }
    setLoading(false);
  };

  const deleteImage = async (id: string) => {
    if (confirm('Delete this photo?')) {
      setLoading(true);
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) {
        alert(`Error deleting photo: ${error.message}`);
      } else {
        await refreshData();
      }
      setLoading(false);
    }
  };

  return (
    <div className={loading ? 'opacity-50 pointer-events-none transition-opacity' : ''}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Gallery</h1>
          <p className="text-gray-400 mt-1">{images.length} photos</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-green-500/20">
          + Upload Photo
        </button>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[100]" onClick={() => setShowAdd(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Add Photo</h2>
              <div className="space-y-3">
                <div className="flex justify-center mb-4">
                  <ImageUpload currentImage={newImage} onImageUploaded={(url) => setNewImage(url)} size="lg" label="Upload Photo" />
                </div>
                <input value={newAlt} onChange={e => setNewAlt(e.target.value)} placeholder="Photo description" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" />
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40">
                  <option value="store">Store View</option>
                  <option value="customers">Happy Customers</option>
                  <option value="products">Our Shelves</option>
                </select>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 text-sm">Cancel</button>
                <button onClick={handleAdd} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-500 disabled:bg-gray-600">Add Photo</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-800 border border-gray-700"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <p className="text-white text-sm font-medium text-center px-3">{img.alt}</p>
              <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">{img.category}</span>
              <button onClick={() => deleteImage(img.id)} className="mt-2 px-4 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
