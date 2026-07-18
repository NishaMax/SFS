import { Language } from '@/types';

/**
 * SKU = Stock Keeping Unit
 * Each unique combination of brand + variant options is one SKU.
 * In the Admin Panel, the owner adds SKUs per product.
 * Example: "Atlas Pen" → SKU 1: Atlas / Blue / Ballpoint = Rs.40
 *                        SKU 2: Atlas / Black / Gel     = Rs.60
 */
export interface ProductSKU {
  id: string;
  brand: string;
  options: Record<string, string>;   // e.g. { Color: 'Blue', Type: 'Gel' }
  price: string;
  inStock: boolean;
  image?: string;                    // each SKU can have its own photo
}

export interface CategoryItem {
  id: string;
  categoryId: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  variantLabels: string[];           // e.g. ['Color', 'Type'] — defines the selectors
  skus: ProductSKU[];
  defaultImage?: string;             // fallback image
  isNew?: boolean;                   // Flag for new arrivals
}

// ─── Helper: get unique values for a variant label across SKUs ───
export function getVariantOptions(item: CategoryItem, label: string, filters?: Record<string, string>): string[] {
  let skus = item.skus;
  // If filters are provided, narrow the SKUs first
  if (filters) {
    skus = skus.filter(sku =>
      Object.entries(filters).every(([k, v]) => k === label || sku.options[k] === v || sku.brand === v)
    );
  }
  const set = new Set(skus.map(s => s.options[label]).filter(Boolean));
  return Array.from(set);
}

export function getBrands(item: CategoryItem): string[] {
  const set = new Set(item.skus.map(s => s.brand));
  return Array.from(set);
}

export function findSKU(item: CategoryItem, brand: string, options: Record<string, string>): ProductSKU | undefined {
  return item.skus.find(sku =>
    sku.brand === brand &&
    Object.entries(options).every(([k, v]) => sku.options[k] === v)
  );
}

export function getCheapestSKU(item: CategoryItem): ProductSKU {
  if (!item.skus || item.skus.length === 0) {
    return { id: '', brand: '', price: 'Rs. 0', options: {}, inStock: false };
  }
  return item.skus.reduce((min, sku) => {
    const minPrice = parseInt(min.price.replace(/[^\d]/g, ''), 10) || 0;
    const skuPrice = parseInt(sku.price.replace(/[^\d]/g, ''), 10) || 0;
    return skuPrice < minPrice ? sku : min;
  }, item.skus[0]);
}

// ─────────────────────────────────────────────
//  MOCK DATA  (will come from DB in Phase 4)
// ─────────────────────────────────────────────

export const categoryItems: CategoryItem[] = [
  // ══════════ SCHOOL ITEMS ══════════
  {
    id: '1', categoryId: 'school-items',
    name: { en: 'Ballpoint Pen', si: 'බෝල්පොයින්ට් පෑන', ta: 'பால்பாயிண்ட் பேனா' },
    description: { en: 'Smooth writing ballpoint pen for everyday use.', si: 'එදිනෙදා භාවිතය සඳහා මෘදු ලිවීම් පෑන.', ta: 'உயர்தர பேனா.' },
    variantLabels: ['Color', 'Type'],
    isNew: true,
    skus: [
      { id: 's1', brand: 'Atlas', options: { Color: 'Blue', Type: 'Ballpoint' }, price: 'Rs. 40', inStock: true },
      { id: 's2', brand: 'Atlas', options: { Color: 'Black', Type: 'Ballpoint' }, price: 'Rs. 40', inStock: true },
      { id: 's3', brand: 'Atlas', options: { Color: 'Red', Type: 'Ballpoint' }, price: 'Rs. 40', inStock: true },
      { id: 's4', brand: 'Atlas', options: { Color: 'Blue', Type: 'Gel' }, price: 'Rs. 60', inStock: true },
      { id: 's5', brand: 'Atlas', options: { Color: 'Black', Type: 'Gel' }, price: 'Rs. 60', inStock: false },
      { id: 's6', brand: 'Pilot', options: { Color: 'Blue', Type: 'Ballpoint' }, price: 'Rs. 80', inStock: true },
      { id: 's7', brand: 'Pilot', options: { Color: 'Black', Type: 'Gel' }, price: 'Rs. 120', inStock: true },
    ],
  },
  {
    id: '2', categoryId: 'school-items',
    name: { en: 'Drawing Pencil', si: 'පැන්සල', ta: 'பென்சில்' },
    description: { en: 'HB standard drawing pencil for students.', si: 'සිසුන් සඳහා HB පැන්සල.', ta: 'மாணவர்களுக்கான HB பென்சில்.' },
    variantLabels: ['Grade'],
    skus: [
      { id: 's8', brand: 'Apsara', options: { Grade: 'HB' }, price: 'Rs. 20', inStock: true },
      { id: 's9', brand: 'Apsara', options: { Grade: '2B' }, price: 'Rs. 25', inStock: true },
      { id: 's10', brand: 'Faber-Castell', options: { Grade: 'HB' }, price: 'Rs. 45', inStock: true },
      { id: 's11', brand: 'Faber-Castell', options: { Grade: '2B' }, price: 'Rs. 50', inStock: true },
      { id: 's12', brand: 'Faber-Castell', options: { Grade: '4B' }, price: 'Rs. 55', inStock: false },
    ],
  },
  {
    id: '3', categoryId: 'school-items',
    name: { en: 'Kids Lunch Box', si: 'ළමා කෑම පෙට්ටිය', ta: 'மதிய உணவு பெட்டி' },
    description: { en: 'Durable, BPA-free lunch box with compartments.', si: 'බෙදුම් සහිත කල් පවතින කෑම පෙට්ටිය.', ta: 'நீடித்த மதிய உணவு பெட்டி.' },
    variantLabels: ['Color'],
    skus: [
      { id: 's13', brand: 'Nayasa', options: { Color: 'Pink' }, price: 'Rs. 450', inStock: true },
      { id: 's14', brand: 'Nayasa', options: { Color: 'Blue' }, price: 'Rs. 450', inStock: true },
      { id: 's15', brand: 'Nayasa', options: { Color: 'Green' }, price: 'Rs. 450', inStock: true },
      { id: 's16', brand: 'Lion Star', options: { Color: 'Pink' }, price: 'Rs. 650', inStock: true },
      { id: 's17', brand: 'Lion Star', options: { Color: 'Blue' }, price: 'Rs. 650', inStock: true },
    ],
  },
  {
    id: '14', categoryId: 'school-items',
    name: { en: 'School Bag', si: 'පාසල් බෑගය', ta: 'பள்ளி பை' },
    description: { en: 'Durable school backpack with padded straps.', si: 'පුළුල් පටි සහිත පාසල් බෑගය.', ta: 'நீடித்த பள்ளி பை.' },
    variantLabels: ['Color'],
    isNew: true,
    skus: [
      { id: 's18', brand: 'Tiger', options: { Color: 'Navy' }, price: 'Rs. 2,500', inStock: true },
      { id: 's19', brand: 'Tiger', options: { Color: 'Black' }, price: 'Rs. 2,500', inStock: true },
      { id: 's20', brand: 'Tiger', options: { Color: 'Pink' }, price: 'Rs. 2,800', inStock: true },
      { id: 's21', brand: 'Safari', options: { Color: 'Red' }, price: 'Rs. 3,200', inStock: false },
    ],
  },
  {
    id: '15', categoryId: 'school-items',
    name: { en: 'Eraser', si: 'මකනය', ta: 'அழிப்பான்' },
    description: { en: 'Soft rubber eraser, smudge-free.', si: 'මෘදු රබර් මකනය.', ta: 'மென்மையான அழிப்பான்.' },
    variantLabels: [],
    skus: [
      { id: 's22', brand: 'Apsara', options: {}, price: 'Rs. 15', inStock: true },
      { id: 's23', brand: 'Faber-Castell', options: {}, price: 'Rs. 30', inStock: true },
    ],
  },

  // ══════════ FANCY ITEMS ══════════
  {
    id: '5', categoryId: 'fancy-items',
    name: { en: 'Floral Hairpin', si: 'මල් හැඩැති කොණ්ඩ කටුව', ta: 'முடி முள்' },
    description: { en: 'Elegant decorative hairpin for girls.', si: 'අලංකාර කොණ්ඩ කටුව.', ta: 'அழகான முடி முள்.' },
    variantLabels: ['Color'],
    skus: [
      { id: 's24', brand: 'Generic', options: { Color: 'Pink' }, price: 'Rs. 120', inStock: true },
      { id: 's25', brand: 'Generic', options: { Color: 'White' }, price: 'Rs. 120', inStock: true },
      { id: 's26', brand: 'Generic', options: { Color: 'Gold' }, price: 'Rs. 180', inStock: true },
    ],
  },
  {
    id: '6', categoryId: 'fancy-items',
    name: { en: 'Styling Comb', si: 'පනාව', ta: 'சீப்பு' },
    description: { en: 'Premium quality styling comb.', si: 'උසස් තත්ත්වයේ පනාව.', ta: 'உயர்தர சீப்பு.' },
    variantLabels: ['Type'],
    isNew: true,
    skus: [
      { id: 's27', brand: 'Generic', options: { Type: 'Wide Tooth' }, price: 'Rs. 100', inStock: true },
      { id: 's28', brand: 'Generic', options: { Type: 'Fine Tooth' }, price: 'Rs. 100', inStock: true },
      { id: 's29', brand: 'Generic', options: { Type: 'Tail Comb' }, price: 'Rs. 150', inStock: true },
    ],
  },
  {
    id: '7', categoryId: 'fancy-items',
    name: { en: 'Cute Keytag', si: 'යතුරු රඳවනය', ta: 'சாவி கொத்து' },
    description: { en: 'Small soft toy keytag – perfect lovers gift.', si: 'කුඩා මෘදු රූප යතුරු රඳවනය.', ta: 'சாவி கொத்து.' },
    variantLabels: [],
    skus: [
      { id: 's30', brand: 'Generic', options: {}, price: 'Rs. 200', inStock: true },
    ],
  },
  {
    id: '17', categoryId: 'fancy-items',
    name: { en: 'Mini Mirror', si: 'කුඩා කන්නාඩිය', ta: 'மினி கண்ணாடி' },
    description: { en: 'Compact pocket mirror for girls.', si: 'සාක්කු කන්නාඩිය.', ta: 'பாக்கெட் கண்ணாடி.' },
    variantLabels: [],
    skus: [
      { id: 's31', brand: 'Generic', options: {}, price: 'Rs. 250', inStock: true },
    ],
  },

  // ══════════ TECH ACCESSORIES ══════════
  {
    id: '8', categoryId: 'tech-accessories',
    name: { en: 'USB Flash Drive', si: 'යූඑස්බී ධාවකය', ta: 'யுஎஸ்பி டிரைவ்' },
    description: { en: 'High speed USB 3.0 flash drive.', si: 'වේගවත් USB 3.0 ධාවකය.', ta: 'யுஎஸ்பி டிரைவ்.' },
    variantLabels: ['Storage'],
    skus: [
      { id: 's32', brand: 'SanDisk', options: { Storage: '4GB' }, price: 'Rs. 450', inStock: true },
      { id: 's33', brand: 'SanDisk', options: { Storage: '8GB' }, price: 'Rs. 650', inStock: true },
      { id: 's34', brand: 'SanDisk', options: { Storage: '16GB' }, price: 'Rs. 900', inStock: true },
      { id: 's35', brand: 'SanDisk', options: { Storage: '32GB' }, price: 'Rs. 1,500', inStock: true },
      { id: 's36', brand: 'SanDisk', options: { Storage: '64GB' }, price: 'Rs. 2,500', inStock: false },
      { id: 's37', brand: 'HP', options: { Storage: '16GB' }, price: 'Rs. 800', inStock: true },
      { id: 's38', brand: 'HP', options: { Storage: '32GB' }, price: 'Rs. 1,300', inStock: true },
      { id: 's39', brand: 'HP', options: { Storage: '64GB' }, price: 'Rs. 2,200', inStock: true },
    ],
  },
  {
    id: '9', categoryId: 'tech-accessories',
    name: { en: 'Memory Card', si: 'මතක කාඩ්පත', ta: 'மெமரி கார்டு' },
    description: { en: 'Class 10 MicroSD card with adapter.', si: 'මතක කාඩ්පත.', ta: 'மெமரி கார்டு.' },
    variantLabels: ['Storage'],
    skus: [
      { id: 's40', brand: 'Samsung', options: { Storage: '32GB' }, price: 'Rs. 1,200', inStock: true },
      { id: 's41', brand: 'Samsung', options: { Storage: '64GB' }, price: 'Rs. 2,200', inStock: false },
      { id: 's42', brand: 'Samsung', options: { Storage: '128GB' }, price: 'Rs. 3,800', inStock: true },
      { id: 's43', brand: 'SanDisk', options: { Storage: '32GB' }, price: 'Rs. 1,000', inStock: true },
      { id: 's44', brand: 'SanDisk', options: { Storage: '64GB' }, price: 'Rs. 1,800', inStock: true },
    ],
  },
  {
    id: '10', categoryId: 'tech-accessories',
    name: { en: 'Power Adapter', si: 'වේගවත් චාජරය', ta: 'சார்ஜர்' },
    description: { en: 'Fast charging power adapter.', si: 'වේගවත් චාජරය.', ta: 'சார்ஜர்.' },
    variantLabels: ['Wattage'],
    isNew: true,
    skus: [
      { id: 's45', brand: 'Baseus', options: { Wattage: '20W' }, price: 'Rs. 1,800', inStock: true },
      { id: 's46', brand: 'Baseus', options: { Wattage: '33W' }, price: 'Rs. 2,800', inStock: true },
      { id: 's47', brand: 'Anker', options: { Wattage: '20W' }, price: 'Rs. 2,500', inStock: true },
      { id: 's48', brand: 'Anker', options: { Wattage: '33W' }, price: 'Rs. 3,500', inStock: false },
    ],
  },
  {
    id: '11', categoryId: 'tech-accessories',
    name: { en: 'Wired Earphones', si: 'ඉයර්ෆෝන්', ta: 'இயர்போன்கள்' },
    description: { en: 'Deep bass wired earphones with mic.', si: 'උසස් තත්ත්වයේ ඉයර්ෆෝන්.', ta: 'இயர்போன்கள்.' },
    variantLabels: ['Color'],
    skus: [
      { id: 's49', brand: 'JBL', options: { Color: 'Black' }, price: 'Rs. 1,500', inStock: true },
      { id: 's50', brand: 'JBL', options: { Color: 'White' }, price: 'Rs. 1,500', inStock: true },
      { id: 's51', brand: 'Samsung', options: { Color: 'Black' }, price: 'Rs. 850', inStock: true },
      { id: 's52', brand: 'Samsung', options: { Color: 'White' }, price: 'Rs. 850', inStock: false },
    ],
  },

  // ══════════ TEDDY BEARS ══════════
  {
    id: '18', categoryId: 'teddy-bears',
    name: { en: 'Teddy Bear', si: 'ටෙඩි', ta: 'டெடி' },
    description: { en: 'Soft, huggable teddy bear in various sizes.', si: 'මෘදු ටෙඩි.', ta: 'மென்மையான டெடி.' },
    variantLabels: ['Size', 'Color'],
    isNew: true,
    skus: [
      { id: 's53', brand: 'Generic', options: { Size: 'Small (1ft)', Color: 'Brown' }, price: 'Rs. 800', inStock: true },
      { id: 's54', brand: 'Generic', options: { Size: 'Small (1ft)', Color: 'White' }, price: 'Rs. 800', inStock: true },
      { id: 's55', brand: 'Generic', options: { Size: 'Medium (2ft)', Color: 'Brown' }, price: 'Rs. 2,000', inStock: true },
      { id: 's56', brand: 'Generic', options: { Size: 'Medium (2ft)', Color: 'Pink' }, price: 'Rs. 2,200', inStock: true },
      { id: 's57', brand: 'Generic', options: { Size: 'Large (3ft)', Color: 'Brown' }, price: 'Rs. 4,500', inStock: false },
    ],
  },

  // ══════════ TOYS ══════════
  {
    id: '21', categoryId: 'toys',
    name: { en: 'Toy Car', si: 'සෙල්ලම් මෝටර් රථය', ta: 'பொம்மை கார்' },
    description: { en: 'Die-cast metal toy car.', si: 'ලෝහ සෙල්ලම් මෝටර් රථය.', ta: 'பொம்மை கார்.' },
    variantLabels: ['Color'],
    skus: [
      { id: 's58', brand: 'Generic', options: { Color: 'Red' }, price: 'Rs. 350', inStock: true },
      { id: 's59', brand: 'Generic', options: { Color: 'Blue' }, price: 'Rs. 350', inStock: true },
      { id: 's60', brand: 'Hot Wheels', options: { Color: 'Yellow' }, price: 'Rs. 650', inStock: true },
    ],
  },
  {
    id: '22', categoryId: 'toys',
    name: { en: 'Building Blocks', si: 'ගොඩනැගිලි කොටස්', ta: 'பில்டிங் பிளாக்ஸ்' },
    description: { en: 'Colorful building block set for kids.', si: 'කොටස් 100 කට්ටලය.', ta: '100 துண்டு செட்.' },
    variantLabels: ['Pack'],
    skus: [
      { id: 's61', brand: 'Generic', options: { Pack: '50 Pieces' }, price: 'Rs. 800', inStock: true },
      { id: 's62', brand: 'Generic', options: { Pack: '100 Pieces' }, price: 'Rs. 1,200', inStock: true },
    ],
  },

  // ══════════ GIFT ITEMS ══════════
  {
    id: '23', categoryId: 'gift-items',
    name: { en: 'Gift Box', si: 'තෑගි පෙට්ටිය', ta: 'பரிசு பெட்டி' },
    description: { en: 'Beautiful pre-wrapped gift box.', si: 'ලස්සන තෑගි පෙට්ටිය.', ta: 'அழகான பரிசு பெட்டி.' },
    variantLabels: ['Size'],
    skus: [
      { id: 's63', brand: 'Generic', options: { Size: 'Small' }, price: 'Rs. 300', inStock: true },
      { id: 's64', brand: 'Generic', options: { Size: 'Medium' }, price: 'Rs. 500', inStock: true },
      { id: 's65', brand: 'Generic', options: { Size: 'Large' }, price: 'Rs. 800', inStock: true },
    ],
  },

  // ══════════ STATIONERY ══════════
  {
    id: '25', categoryId: 'stationery',
    name: { en: 'Color Pencil Set', si: 'වර්ණ පැන්සල් කට්ටලය', ta: 'வண்ண பென்சில் செட்' },
    description: { en: 'Premium color pencils.', si: 'වර්ණ පැන්සල් කට්ටලය.', ta: 'வண்ண பென்சில் செட்.' },
    variantLabels: ['Pack'],
    skus: [
      { id: 's66', brand: 'Faber-Castell', options: { Pack: '12 Colors' }, price: 'Rs. 350', inStock: true },
      { id: 's67', brand: 'Faber-Castell', options: { Pack: '24 Colors' }, price: 'Rs. 650', inStock: true },
      { id: 's68', brand: 'Camlin', options: { Pack: '12 Colors' }, price: 'Rs. 250', inStock: true },
      { id: 's69', brand: 'Camlin', options: { Pack: '24 Colors' }, price: 'Rs. 450', inStock: true },
    ],
  },

  // ══════════ WATER BOTTLES ══════════
  {
    id: '27', categoryId: 'water-bottles',
    name: { en: 'Water Bottle', si: 'ජල බෝතලය', ta: 'தண்ணீர் பாட்டில்' },
    description: { en: 'Leak-proof water bottle for everyday use.', si: 'කාන්දු නොවන ජල බෝතලය.', ta: 'தண்ணீர் பாட்டில்.' },
    variantLabels: ['Color', 'Size'],
    skus: [
      { id: 's70', brand: 'Milton', options: { Color: 'Silver', Size: '500ml' }, price: 'Rs. 850', inStock: true },
      { id: 's71', brand: 'Milton', options: { Color: 'Silver', Size: '750ml' }, price: 'Rs. 1,200', inStock: true },
      { id: 's72', brand: 'Milton', options: { Color: 'Blue', Size: '500ml' }, price: 'Rs. 850', inStock: true },
      { id: 's73', brand: 'Milton', options: { Color: 'Blue', Size: '750ml' }, price: 'Rs. 1,200', inStock: false },
      { id: 's74', brand: 'Nayasa', options: { Color: 'Red', Size: '500ml' }, price: 'Rs. 450', inStock: true },
      { id: 's75', brand: 'Nayasa', options: { Color: 'Green', Size: '500ml' }, price: 'Rs. 450', inStock: true },
      { id: 's76', brand: 'Nayasa', options: { Color: 'Red', Size: '1L' }, price: 'Rs. 650', inStock: true },
    ],
  },
];
