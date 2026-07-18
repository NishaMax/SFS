'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CategoryItem, ProductSKU } from '@/data/categoryItems';
import { Category } from '@/types';

interface StoreContextType {
  categories: Category[];
  categoryItems: CategoryItem[];
  promotions: any[];
  gallery: any[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType>({
  categories: [],
  categoryItems: [],
  promotions: [],
  gallery: [],
  loading: true,
  refreshData: async () => {},
});

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSupabaseData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const { data: catsData } = await supabase.from('categories').select('*');
      if (catsData) {
        const mappedCats: Category[] = catsData.map(c => ({
          id: c.id,
          name: { en: c.name_en, si: c.name_si, ta: c.name_ta },
          description: { en: c.description_en, si: c.description_si, ta: c.description_ta },
          icon: c.icon || '📦',
          color: c.color || '#15803d',
          productCount: 0, // we will calculate this
        }));
        setCategories(mappedCats);
      }

      // Fetch products and skus
      const { data: prodsData } = await supabase.from('products').select('*');
      const { data: skusData } = await supabase.from('skus').select('*');
      
      if (prodsData && skusData) {
        const mappedItems: CategoryItem[] = prodsData.map(p => {
          const productSkus: ProductSKU[] = skusData
            .filter(s => s.product_id === p.id)
            .map(s => {
              const stock = s.stock_count !== undefined && s.stock_count !== null ? s.stock_count : (s.in_stock ? 10 : 0);
              return {
                id: s.id,
                brand: s.brand,
                price: s.price,
                stockCount: stock,
                inStock: stock > 0,
                image: s.image || undefined,
                options: s.options || {},
              };
            });
            
          return {
            id: p.id,
            categoryId: p.category_id,
            name: { en: p.name_en, si: p.name_si, ta: p.name_ta },
            description: { en: p.description_en, si: p.description_si, ta: p.description_ta },
            isNew: p.is_new,
            defaultImage: p.default_image || undefined,
            variantLabels: p.variant_labels || [],
            skus: productSkus,
          };
        });
        
        setCategoryItems(mappedItems);
        
        // Update product counts in categories
        setCategories(prev => prev.map(c => ({
          ...c,
          productCount: mappedItems.filter(i => i.categoryId === c.id).length
        })));
      }

      // Fetch promotions
      const { data: promosData } = await supabase.from('promotions').select('*');
      if (promosData) {
        setPromotions(promosData.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          discount: p.discount,
          code: p.code,
          validUntil: p.valid_until,
          active: p.active,
        })));
      }

      // Fetch gallery
      const { data: galleryData } = await supabase.from('gallery').select('*');
      if (galleryData) {
        setGallery(galleryData);
      }
      
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSupabaseData();
  }, []);

  return (
    <StoreContext.Provider value={{ categories, categoryItems, promotions, gallery, loading, refreshData: fetchSupabaseData }}>
      {children}
    </StoreContext.Provider>
  );
}
