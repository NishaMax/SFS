'use client';

import { useState } from 'react';
import { CategoryItem, getBrands, ProductSKU } from '@/data/categoryItems';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '@/components/admin/ImageUpload';
import Image from 'next/image';
import { useStore } from '@/providers/StoreProvider';
import { supabase } from '@/lib/supabase';

export default function AdminProductsPage() {
  const { categoryItems: items, categories, refreshData } = useStore();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // New product form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]?.id || '');
  const [newDesc, setNewDesc] = useState('');
  const [newIsNew, setNewIsNew] = useState(false);
  const [newVariantLabels, setNewVariantLabels] = useState('');
  const [newImage, setNewImage] = useState('');

  // Filter
  const filteredItems = items.filter(item => {
    const matchSearch = !search || item.name.en?.toLowerCase().includes(search.toLowerCase()) || item.skus.some(s => s.brand.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = filterCategory === 'all' || item.categoryId === filterCategory;
    return matchSearch && matchCategory;
  });

  const toggleStock = async (itemId: string, skuId: string, currentStock: boolean) => {
    setLoading(true);
    const { error } = await supabase.from('skus').update({ in_stock: !currentStock }).eq('id', skuId);
    if (!error) await refreshData();
    else alert(`Error updating stock: ${error.message}`);
    setLoading(false);
  };

  const toggleIsNew = async (itemId: string, currentIsNew: boolean) => {
    setLoading(true);
    const { error } = await supabase.from('products').update({ is_new: !currentIsNew }).eq('id', itemId);
    if (!error) await refreshData();
    else alert(`Error updating status: ${error.message}`);
    setLoading(false);
  };

  const deleteProduct = async (itemId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      const { error } = await supabase.from('products').delete().eq('id', itemId);
      if (!error) {
        await refreshData();
        if (editingItem?.id === itemId) setEditingItem(null);
      } else {
        alert(`Error deleting product: ${error.message}`);
      }
      setLoading(false);
    }
  };

  const deleteSKU = async (itemId: string, skuId: string) => {
    if (confirm('Delete this SKU?')) {
      setLoading(true);
      const { error } = await supabase.from('skus').delete().eq('id', skuId);
      if (!error) await refreshData();
      else alert(`Error deleting SKU: ${error.message}`);
      setLoading(false);
    }
  };

  const updateSKUImage = async (itemId: string, skuId: string, imageUrl: string) => {
    setLoading(true);
    const { error } = await supabase.from('skus').update({ image: imageUrl }).eq('id', skuId);
    if (!error) await refreshData();
    else alert(`Error updating image: ${error.message}`);
    setLoading(false);
  };

  const updateProductImage = async (itemId: string, imageUrl: string) => {
    setLoading(true);
    const { error } = await supabase.from('products').update({ default_image: imageUrl }).eq('id', itemId);
    if (!error) await refreshData();
    else alert(`Error updating image: ${error.message}`);
    setLoading(false);
  };

  const handleAddProduct = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    const newId = `prod_${Date.now()}`;
    const { error } = await supabase.from('products').insert({
      id: newId,
      category_id: newCategory,
      name_en: newName,
      name_si: newName,
      name_ta: newName,
      description_en: newDesc,
      description_si: newDesc,
      description_ta: newDesc,
      variant_labels: newVariantLabels.split(',').map(s => s.trim()).filter(Boolean),
      is_new: newIsNew,
      default_image: newImage || null
    });
    
    if (error) {
      alert(`Error creating product: ${error.message}`);
    } else {
      await refreshData();
      setShowAddForm(false);
      setNewName(''); setNewDesc(''); setNewIsNew(false); setNewVariantLabels(''); setNewImage('');
      const newlyAdded = items.find(i => i.id === newId);
      if (newlyAdded) setEditingItem(newlyAdded);
    }
    setLoading(false);
  };

  // Add SKU
  const [addingSKUFor, setAddingSKUFor] = useState<string | null>(null);
  const [skuBrand, setSkuBrand] = useState('');
  const [skuPrice, setSkuPrice] = useState('');
  const [skuOptions, setSkuOptions] = useState('');
  const [skuImage, setSkuImage] = useState('');
  const [skuStock, setSkuStock] = useState('10');

  const handleAddSKU = async (itemId: string) => {
    if (!skuBrand.trim() || !skuPrice.trim()) return;
    setLoading(true);
    const optionsObj: Record<string, string> = {};
    skuOptions.split(',').forEach(pair => {
      const [k, v] = pair.split(':').map(s => s.trim());
      if (k && v) optionsObj[k] = v;
    });
    
    const { error } = await supabase.from('skus').insert({
      id: `sku_${Date.now()}`,
      product_id: itemId,
      brand: skuBrand,
      price: skuPrice,
      options: optionsObj,
      stock_count: parseInt(skuStock) || 0,
      in_stock: (parseInt(skuStock) || 0) > 0,
      image: skuImage || null
    });

    if (error) {
      alert(`Error adding SKU: ${error.message}`);
    } else {
      await refreshData();
      setAddingSKUFor(null);
      setSkuBrand(''); setSkuPrice(''); setSkuOptions(''); setSkuImage(''); setSkuStock('10');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400 mt-1">{items.length} products · {items.reduce((s, i) => s + i.skus.length, 0)} SKUs</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm shadow-lg shadow-green-500/20">
          <span className="text-lg">+</span> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products or brands..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/40" />
        </div>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/40">
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name.en}</option>)}
        </select>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[100]" onClick={() => setShowAddForm(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-5">Add New Product</h2>
              <div className="space-y-4">
                {/* Product Image Upload */}
                <div className="flex justify-center">
                  <ImageUpload currentImage={newImage} onImageUploaded={(url) => setNewImage(url)} size="lg" label="Product Image" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Product Name (English)</label>
                  <input value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Category</label>
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name.en}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description</label>
                  <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 resize-none" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Variant Labels <span className="text-gray-600">(comma-separated)</span></label>
                  <input value={newVariantLabels} onChange={e => setNewVariantLabels(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40" placeholder="Color, Size, Storage" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-10 h-6 rounded-full flex items-center transition-colors ${newIsNew ? 'bg-green-500' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${newIsNew ? 'translate-x-4' : ''}`} />
                  </div>
                  <span className="text-sm text-gray-300">Mark as New Arrival</span>
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddForm(false)} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 text-sm hover:bg-gray-800 transition-colors">Cancel</button>
                <button onClick={handleAddProduct} className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition-colors">Create Product</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-900 rounded-2xl border border-gray-800">
            <span className="text-3xl block mb-2 opacity-40">📦</span>
            <p className="text-gray-500 text-sm">No products found.</p>
          </div>
        ) : (
          filteredItems.map(item => {
            const brands = getBrands(item);
            const categoryName = categories.find(c => c.id === item.categoryId)?.name.en || item.categoryId;
            const isExpanded = editingItem?.id === item.id;

            return (
              <motion.div key={item.id} layout className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                {/* Product Row */}
                <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800/50 transition-colors" onClick={() => setEditingItem(isExpanded ? null : item)}>
                  {/* Product Thumbnail */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 relative">
                    {item.defaultImage ? (
                      <Image src={item.defaultImage} alt={item.name.en} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">📦</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-semibold text-sm">{item.name.en}</h3>
                      {item.isNew && <span className="text-[9px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full font-bold border border-yellow-500/20">NEW</span>}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{categoryName} · {brands.join(', ')} · {item.skus.length} SKU{item.skus.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); toggleIsNew(item.id, item.isNew || false); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${item.isNew ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
                      {item.isNew ? '✨ New' : 'Not New'}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteProduct(item.id); }} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">Delete</button>
                  </div>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Expanded SKU Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-gray-800">
                      <div className="p-4 bg-gray-950/50">
                        {/* Product default image editor */}
                        <div className="mb-5 p-4 bg-gray-900 rounded-xl border border-gray-800">
                          <p className="text-xs text-gray-400 mb-2 font-semibold">Default Product Image</p>
                          <ImageUpload currentImage={item.defaultImage} onImageUploaded={(url) => updateProductImage(item.id, url)} size="lg" />
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-gray-300">SKUs ({item.skus.length})</h4>
                          <button onClick={() => { setAddingSKUFor(addingSKUFor === item.id ? null : item.id); setSkuBrand(''); setSkuPrice(''); setSkuOptions(''); setSkuImage(''); setSkuStock('10'); }} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition-colors font-medium">+ Add SKU</button>
                        </div>

                        {/* Add SKU Form */}
                        {addingSKUFor === item.id && (
                          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4 space-y-3">
                            <div className="flex justify-center">
                              <ImageUpload currentImage={skuImage} onImageUploaded={(url) => setSkuImage(url)} size="sm" label="SKU Image" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">Brand</label>
                                <input value={skuBrand} onChange={e => setSkuBrand(e.target.value)} placeholder="e.g. Samsung" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-green-500" />
                              </div>
                              <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">Price</label>
                                <input value={skuPrice} onChange={e => setSkuPrice(e.target.value)} placeholder="e.g. Rs. 1,500" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-green-500" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">Initial Stock Count</label>
                                <input type="number" min="0" value={skuStock} onChange={e => setSkuStock(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-green-500" />
                              </div>
                              <div>
                                <label className="text-[11px] text-gray-500 mb-1 block">Options <span className="text-gray-600">(Key:Value, comma-separated)</span></label>
                                <input value={skuOptions} onChange={e => setSkuOptions(e.target.value)} placeholder="Color:Blue, Size:Large" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-green-500" />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => setAddingSKUFor(null)} className="px-4 py-2 rounded-lg text-xs text-gray-400 border border-gray-700 hover:bg-gray-800">Cancel</button>
                              <button onClick={() => handleAddSKU(item.id)} className="px-4 py-2 rounded-lg text-xs bg-green-600 text-white hover:bg-green-500 font-medium">Add SKU</button>
                            </div>
                          </div>
                        )}

                        {/* SKU List */}
                        {item.skus.length === 0 ? (
                          <p className="text-gray-600 text-xs text-center py-6">No SKUs yet. Click &quot;Add SKU&quot; to create one.</p>
                        ) : (
                          <div className="space-y-2">
                            {item.skus.map(sku => (
                              <div key={sku.id} className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-xl p-3">
                                {/* SKU Image thumbnail */}
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 relative group cursor-pointer">
                                  {sku.image ? (
                                    <Image src={sku.image} alt={sku.brand} fill className="object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">📷</div>
                                  )}
                                  {/* Click to upload */}
                                  <div className="absolute inset-0">
                                    <ImageUpload currentImage={sku.image} onImageUploaded={(url) => updateSKUImage(item.id, sku.id, url)} size="sm" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-white text-xs font-semibold">{sku.brand}</span>
                                    {Object.entries(sku.options).map(([k, v]) => (
                                      <span key={k} className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700">{k}: {v}</span>
                                    ))}
                                  </div>
                                </div>
                                <span className="text-green-400 text-sm font-bold whitespace-nowrap">{sku.price}</span>
                                <div className="text-right">
                                  <div className="text-xs text-gray-400 mb-0.5">Stock: {sku.stockCount || 0}</div>
                                  <div className={`px-2 py-0.5 rounded-md text-[9px] font-bold border transition-all inline-block whitespace-nowrap ${sku.inStock ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                    {sku.inStock ? '✓ In Stock' : '✕ Out'}
                                  </div>
                                </div>
                                <button onClick={() => deleteSKU(item.id, sku.id)} className="w-7 h-7 rounded-lg bg-gray-800 text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors flex items-center justify-center text-xs">🗑</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
