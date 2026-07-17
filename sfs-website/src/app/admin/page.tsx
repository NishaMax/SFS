'use client';

import { getBrands } from '@/data/categoryItems';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useStore } from '@/providers/StoreProvider';

export default function AdminDashboard() {
  const { categories, categoryItems, loading } = useStore();

  if (loading) {
    return <div className="text-white text-center py-20">Loading dashboard...</div>;
  }

  const totalProducts = categoryItems.length;
  const totalSKUs = categoryItems.reduce((sum, item) => sum + item.skus.length, 0);
  const totalCategories = categories.length;
  const outOfStockSKUs = categoryItems.reduce(
    (sum, item) => sum + item.skus.filter(s => !s.inStock).length, 0
  );
  const newArrivals = categoryItems.filter(i => i.isNew).length;

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: '📦', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { label: 'Total SKUs', value: totalSKUs, icon: '🏷️', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Categories', value: totalCategories, icon: '🗂️', color: 'from-green-500 to-green-600', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { label: 'Out of Stock', value: outOfStockSKUs, icon: '⚠️', color: 'from-red-500 to-red-600', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { label: 'New Arrivals', value: newArrivals, icon: '✨', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  ];

  // Recent products (last 5)

  const recentProducts = categoryItems.slice(-5).reverse();

  // Out of stock items
  const outOfStockItems = categoryItems.flatMap(item =>
    item.skus.filter(s => !s.inStock).map(sku => ({
      productName: item.name.en,
      brand: sku.brand,
      options: Object.values(sku.options).join(' / '),
      price: sku.price,
    }))
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back to your store management panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`${stat.bg} border ${stat.border} rounded-2xl p-5 relative overflow-hidden`}
          >
            <span className="text-3xl">{stat.icon}</span>
            <p className="text-3xl font-bold text-white mt-3">{stat.value}</p>
            <p className="text-gray-400 text-xs mt-1 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Recent Products</h2>
            <Link href="/admin/products" className="text-green-400 text-xs hover:text-green-300 font-medium">View All →</Link>
          </div>
          <div className="space-y-3">
            {recentProducts.map(item => {
              const brands = getBrands(item);
              return (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-sm">📦</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.name.en}</p>
                    <p className="text-gray-500 text-xs">{brands.join(', ')} · {item.skus.length} SKU{item.skus.length > 1 ? 's' : ''}</p>
                  </div>
                  {item.isNew && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-bold border border-yellow-500/20">NEW</span>}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Out of Stock Alert */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Out of Stock Alerts
            </h2>
            <span className="text-red-400 text-xs font-bold bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">{outOfStockSKUs}</span>
          </div>
          {outOfStockItems.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <span className="text-3xl block mb-2">🎉</span>
              <p className="text-sm font-medium">Everything is in stock!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {outOfStockItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-sm">⚠️</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{item.productName}</p>
                    <p className="text-gray-500 text-xs">{item.brand} {item.options ? `· ${item.options}` : ''}</p>
                  </div>
                  <span className="text-red-400 text-xs font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 grid sm:grid-cols-3 gap-4"
      >
        <Link href="/admin/products" className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 hover:bg-green-500/15 transition-colors group">
          <span className="text-2xl">➕</span>
          <p className="text-green-400 font-bold text-sm mt-2 group-hover:text-green-300">Add New Product</p>
          <p className="text-gray-500 text-xs mt-1">Add items and manage SKUs</p>
        </Link>
        <Link href="/admin/categories" className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 hover:bg-blue-500/15 transition-colors group">
          <span className="text-2xl">🗂️</span>
          <p className="text-blue-400 font-bold text-sm mt-2 group-hover:text-blue-300">Manage Categories</p>
          <p className="text-gray-500 text-xs mt-1">Edit categories and icons</p>
        </Link>
        <Link href="/admin/promotions" className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 hover:bg-purple-500/15 transition-colors group">
          <span className="text-2xl">🎁</span>
          <p className="text-purple-400 font-bold text-sm mt-2 group-hover:text-purple-300">Run a Promotion</p>
          <p className="text-gray-500 text-xs mt-1">Create deals and offers</p>
        </Link>
      </motion.div>
    </div>
  );
}
