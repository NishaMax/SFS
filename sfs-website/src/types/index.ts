export type Language = 'en' | 'si' | 'ta';

export interface Category {
  id: string;
  name: Record<Language, string>;
  icon: string;
  productCount: number;
  color: string;
  description: Record<Language, string>;
}

export interface Product {
  id: string;
  name: Record<Language, string>;
  category: string;
  price: string;
  image: string;
  isNew: boolean;
}

export interface StoreInfo {
  phone: string;
  whatsapp: string;
  address: Record<Language, string>;
  openingHours: Record<Language, string>;
  mapUrl: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: Record<Language, string>;
  icon: string;
}

export interface Translations {
  nav: {
    home: string;
    about: string;
    categories: string;
    newArrivals: string;
    gallery: string;
    promotions: string;
    contact: string;
    location: string;
  };
  hero: {
    greeting: string;
    welcome: string;
    storeName: string;
    tagline: string;
    cta: string;
    ctaSecondary: string;
  };
  sections: {
    categories: string;
    categoriesDesc: string;
    featured: string;
    featuredDesc: string;
    whyUs: string;
    whyUsDesc: string;
    visitUs: string;
    visitUsDesc: string;
    newArrivals: string;
    newArrivalsDesc: string;
  };
  footer: {
    quickLinks: string;
    contactUs: string;
    followUs: string;
    rights: string;
    tagline: string;
  };
  common: {
    viewAll: string;
    explore: string;
    getDirections: string;
    callNow: string;
    whatsapp: string;
    products: string;
    openNow: string;
    closed: string;
  };
  language: {
    select: string;
    subtitle: string;
  };
}
