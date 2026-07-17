'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/providers/StoreProvider';
import { supabase } from '@/lib/supabase';

export default function AdminPromotionsPage() {
  const { promotions, refreshData } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [discount, setDiscount] = useState('');
  const [code, setCode] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('promotions').insert({
      id: `p_${Date.now()}`,
      title,
      description: desc,
      discount,
      code,
      valid_until: validUntil || null,
      active: true
    });
    
    if (error) {
      alert(`Error creating promotion: ${error.message}`);
    } else {
      await refreshData();
      setShowAdd(false);
      setTitle(''); setDesc(''); setDiscount(''); setCode(''); setValidUntil('');
    }
    setLoading(false);
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    setLoading(true);
    const { error } = await supabase.from('promotions').update({ active: !currentActive }).eq('id', id);
    if (error) {
      alert(`Error updating promotion: ${error.message}`);
    } else {
      await refreshData();
    }
    setLoading(false);
  };

  const deletePromo = async (id: string) => {
    if (confirm('Delete this promotion?')) {
      setLoading(true);
      const { error } = await supabase.from('promotions').delete().eq('id', id);
      if (error) {
        alert(`Error deleting promotion: ${error.message}`);
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
          <h1 className="text-3xl font-bold text-white">Promotions</h1>
          <p className="text-gray-400 mt-1">{promotions.filter(p => p.active).length} active · {promotions.filter(p => !p.active).length} inactive</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-green-500/20">
          + New Promotion
        </button>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[100]" onClick={() => setShowAdd(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Create Promotion</h2>
              <div className="space-y-3">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Promotion Title" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" />
                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 resize-none" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={discount} onChange={e => setDiscount(e.target.value)} placeholder="e.g. 20% OFF" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" />
                  <input value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. SAVE20" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" />
                </div>
                <input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 text-sm">Cancel</button>
                <button onClick={handleAdd} disabled={loading} className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-500 disabled:bg-gray-600">Create</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Promotions List */}
      <div className="space-y-3">
        {promotions.map((promo, i) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className={`bg-gray-900 border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${promo.active ? 'border-gray-800' : 'border-gray-800/50 opacity-60'}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-white font-semibold text-sm">{promo.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${promo.active ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
                  {promo.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <p className="text-gray-500 text-xs mt-1">{promo.description}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20 font-bold">{promo.discount}</span>
                <span className="text-[10px] text-gray-600 font-mono">{promo.code}</span>
                <span className="text-[10px] text-gray-600">Until: {promo.validUntil}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleActive(promo.id, promo.active)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${promo.active ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                {promo.active ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => deletePromo(promo.id)} className="px-3 py-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
