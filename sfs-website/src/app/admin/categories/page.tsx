'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '@/components/admin/ImageUpload';
import Image from 'next/image';
import { useStore } from '@/providers/StoreProvider';
import { supabase } from '@/lib/supabase';

export default function AdminCategoriesPage() {
  const { categories, categoryItems, refreshData } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newId, setNewId] = useState('');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newName.trim() || !newId.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('categories').insert({
      id: newId.toLowerCase().replace(/\s+/g, '-'),
      name_en: newName,
      name_si: newName,
      name_ta: newName,
      description_en: '',
      description_si: '',
      description_ta: '',
      icon: newImage || '/images/placeholder.svg',
      color: '#16a34a'
    });
    
    if (error) {
      alert(`Error adding category: ${error.message}`);
    } else {
      await refreshData();
      setShowAdd(false);
      setNewName('');
      setNewId('');
      setNewImage('');
    }
    setLoading(false);
  };

  const updateCategoryImage = async (catId: string, imageUrl: string) => {
    setLoading(true);
    const { error } = await supabase.from('categories').update({ icon: imageUrl }).eq('id', catId);
    if (error) {
      alert(`Error updating image: ${error.message}`);
    } else {
      await refreshData();
    }
    setLoading(false);
  };

  const deleteCategory = async (id: string) => {
    const count = categoryItems.filter(i => i.categoryId === id).length;
    if (count > 0) {
      alert(`Cannot delete: ${count} products belong to this category. Move or delete them first.`);
      return;
    }
    if (confirm('Delete this category?')) {
      setLoading(true);
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) {
        alert(`Error deleting category: ${error.message}`);
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
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <p className="text-gray-400 mt-1">{categories.length} categories</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-green-500/20">
          + Add Category
        </button>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[100]" onClick={() => setShowAdd(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Add Category</h2>
              <div className="space-y-4">
                {/* Image Upload */}
                <div className="flex justify-center">
                  <ImageUpload
                    currentImage={newImage}
                    onImageUploaded={(url) => setNewImage(url)}
                    size="md"
                    label="Category Image"
                  />
                </div>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Category Name (e.g. School Items)" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" />
                <input value={newId} onChange={e => setNewId(e.target.value)} placeholder="URL Slug (e.g. school-items)" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => { setShowAdd(false); setNewImage(''); }} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 text-sm">Cancel</button>
                <button onClick={handleAdd} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-500 disabled:bg-gray-600">Create</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => {
          const count = categoryItems.filter(item => item.categoryId === cat.id).length;
          const isEditing = editingId === cat.id;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                {/* Category Image — click to change */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 flex-shrink-0">
                  <Image src={cat.icon || '/images/placeholder.svg'} alt={cat.name.en} fill className="object-cover" />
                  <div
                    onClick={() => setEditingId(isEditing ? null : cat.id)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-white text-[10px] font-medium">Edit</span>
                  </div>
                </div>
                <button onClick={() => deleteCategory(cat.id)} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all text-xs">Delete</button>
              </div>

              {/* Inline image editor */}
              {isEditing && (
                <div className="mb-4 p-3 bg-gray-800 rounded-xl border border-gray-700">
                  <ImageUpload
                    currentImage={cat.icon}
                    onImageUploaded={(url) => {
                      updateCategoryImage(cat.id, url);
                      setEditingId(null);
                    }}
                    size="lg"
                    label="Upload new image"
                  />
                </div>
              )}

              <h3 className="text-white font-semibold text-sm">{cat.name.en}</h3>
              <p className="text-gray-500 text-xs mt-1">{count} product{count !== 1 ? 's' : ''} · ID: {cat.id}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
