'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/providers/StoreProvider';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function AdminInventoryPage() {
  const { categoryItems: items, refreshData } = useStore();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Flatten all SKUs to make them easily searchable and manageable
  const allSkus = items.flatMap(item => 
    item.skus.map(sku => ({
      ...sku,
      productName: item.name.en,
      productId: item.id,
      defaultImage: item.defaultImage
    }))
  );

  const filteredSkus = allSkus.filter(sku => {
    const term = search.toLowerCase();
    return (
      sku.productName.toLowerCase().includes(term) ||
      sku.brand.toLowerCase().includes(term)
    );
  });

  const updateStock = async (skuId: string, currentStock: number, change: number) => {
    const newStock = Math.max(0, currentStock + change);
    setLoading(true);
    
    // We update stock_count. Also sync in_stock based on if newStock > 0.
    const { error } = await supabase.from('skus').update({ 
      stock_count: newStock,
      in_stock: newStock > 0
    }).eq('id', skuId);

    if (error) {
      alert(`Error updating stock: ${error.message}`);
    } else {
      await refreshData();
    }
    setLoading(false);
  };

  const setExactStock = async (skuId: string, exactStock: number) => {
    const newStock = Math.max(0, exactStock);
    setLoading(true);
    
    const { error } = await supabase.from('skus').update({ 
      stock_count: newStock,
      in_stock: newStock > 0
    }).eq('id', skuId);

    if (error) {
      alert(`Error updating stock: ${error.message}`);
    } else {
      await refreshData();
    }
    setLoading(false);
  };

  return (
    <div className={loading ? 'opacity-50 pointer-events-none transition-opacity' : ''}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
          <p className="text-gray-400 mt-1">Manage stock quantities for {allSkus.length} variants.</p>
        </div>
      </div>

      <div className="mb-6 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search inventory by product or brand..." 
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/40" 
        />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950/50 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Product & Variant</th>
                <th className="p-4 font-semibold text-center w-32">Status</th>
                <th className="p-4 font-semibold text-right w-48">Stock Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredSkus.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    No items found matching "{search}"
                  </td>
                </tr>
              ) : (
                filteredSkus.map((sku, index) => (
                  <motion.tr 
                    key={sku.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 relative">
                          {sku.image || sku.defaultImage ? (
                            <Image src={(sku.image || sku.defaultImage) as string} alt={sku.productName} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">📦</div>
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{sku.productName}</div>
                          <div className="text-gray-500 text-xs mt-0.5 flex items-center gap-1.5 flex-wrap">
                            <span className="text-gray-400 font-semibold">{sku.brand}</span>
                            {Object.entries(sku.options).map(([k, v]) => (
                              <span key={k} className="bg-gray-800 px-1.5 py-0.5 rounded text-[10px] border border-gray-700">
                                {k}: {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        (sku.stockCount || 0) > 0 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${(sku.stockCount || 0) > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        {(sku.stockCount || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => updateStock(sku.id, sku.stockCount || 0, -1)}
                          disabled={(sku.stockCount || 0) <= 0}
                          className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-800 transition-colors"
                        >
                          -
                        </button>
                        
                        <input 
                          type="number"
                          min="0"
                          value={sku.stockCount || 0}
                          onChange={(e) => setExactStock(sku.id, parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center bg-gray-950 border border-gray-700 rounded-lg text-white text-sm font-semibold focus:outline-none focus:border-green-500 hide-arrows"
                        />
                        
                        <button 
                          onClick={() => updateStock(sku.id, sku.stockCount || 0, 1)}
                          className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add custom CSS to hide number input arrows */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .hide-arrows {
          -moz-appearance: textfield;
        }
      `}} />
    </div>
  );
}
