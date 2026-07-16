# Sinduja Fancy Store - Project Plan

## 1. Project Overview & Philosophy
- **Name:** Sinduja Fancy Store (Kalawana, Sri Lanka)
- **Domain:** https://sindujafancy.lk
- **Objective:** A premium, fast, and elegant digital catalog to showcase products, drive foot traffic, and improve local SEO. No online purchasing.
- **Philosophy:** Mobile-first, lightweight, professional, and smooth micro-interactions. "Everything should feel like entering a modern retail store."

## 2. Complete Architecture
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (for micro-interactions & entrance), CSS/SVG (for lightweight door opening)
- **Smooth Scrolling:** Lenis
- **Hosting (Future):** Vercel
- **Backend/CMS (Future):** Firebase (Auth/Firestore) or Supabase, Cloudinary (Images)
- **State Management:** React Context / Zustand (for language, first-visit state, and smart theme preference)

## 3. Folder Structure (Next.js App Router)
```text
/sfs-website
│
├── /public
│   ├── /images         # Optimized WebP/AVIF images
│   ├── /icons          # SVG icons
│   ├── robots.txt      
│   └── sitemap.xml     
│
├── /src
│   ├── /app
│   │   ├── (store)     # Customer facing routes
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── about/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── new-arrivals/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   ├── promotions/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── location/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   └── terms/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css # Global styles, Tailwind directives, theme tokens
│   │
│   ├── /components
│   │   ├── /ui         # Reusable basic UI components (buttons, cards)
│   │   ├── /layout     # Header, Footer, Navigation, LanguageSwitcher
│   │   ├── /animations # DoorEntrance, LoadingScreen, MicroAnimations
│   │   └── /sections   # Hero, FeaturedProducts, WhyChooseUs, CategoryWheel
│   │
│   ├── /lib
│   │   ├── /utils      # Helper functions (cn for tailwind, formatting)
│   │   └── /seo        # SEO helper configurations
│   │
│   ├── /hooks          # Custom hooks (useLanguage, useLocalStorage)
│   │
│   ├── /types          # TypeScript interfaces (Product, Category, Language)
│   │
│   └── /data           # Mock data for Phase 2 UI (Products, Categories)
│
├── tailwind.config.ts  # Theme (Deep Green, Light Green, White, accents)
└── tsconfig.json
```

## 4. Pages Directory
1. **Home (`/`)** - Intro sequence, Hero, Smart Categories, Featured Products sliding auto-scroll.
2. **About Us (`/about`)** - Store history, vision, animated counters ("Why Choose Us").
3. **Categories (`/categories`)** - Full grid of all product categories.
4. **New Arrivals (`/new-arrivals`)** - Dedicated page for the latest stock.
5. **Gallery (`/gallery`)** - High-quality store photos and happy customers.
6. **Promotions (`/promotions`)** - Current offers and seasonal sales.
7. **Contact (`/contact`)** - Direct contact forms, WhatsApp integration.
8. **Location (`/location`)** - Embedded map, directions, opening hours, one-click navigation.
9. **FAQ (`/faq`)** - Frequently asked questions.
10. **Privacy Policy (`/privacy`)** - Standard privacy text.
11. **Terms (`/terms`)** - Standard terms and conditions.

## 5. Reusable Components
- **Typography & Layout:** `SectionHeading`, `Container`, `Grid`, `PageWrapper`
- **Navigation:** `Header`, `MobileMenu`, `LanguageSwitcher`, `Footer`, `Breadcrumbs`
- **Cards:** 
  - `CategoryCard` (rounded, lift effect on hover/touch)
  - `ProductCard` (image fade-in, price slide, premium button reveal)
  - `InfoCard` (for about/contact details)
- **Interactive:** `PrimaryButton`, `FloatingWhatsAppButton`, `InteractiveCategoryWheel`, `LanguageSelectCard`
- **Feedback:** `LoadingSpinner`, `ToastNotification`

## 6. Animations & Micro-Interactions (Lightweight)
1. **Loading Screen:** Green "S" slowly draws itself, brief premium text fade-in.
2. **Door Opening Entrance (First Visit Only):** SVG/CSS-based glass doors opening smoothly to reveal the store. State saved in `localStorage` to skip on returning visits.
3. **Language Selection Cards:** Floating glass cards with bounce, ripple effect, and gentle vibration (using haptic feedback API for supported mobile devices).
4. **Hero Background:** Very slow, battery-friendly floating elements (🎒, 🧸, 🎧).
5. **Scroll Reveal:** Elements fade, slide up, and gently lift on scroll.
6. **Hover/Touch States:** Subtle shadow expansion, micro-scale (+2%).
7. **Animated Counters:** Number increments for "Why Choose Us" (e.g., 5000+ Happy Customers).
8. **Smart Theme Transition:** Accent colors shift smoothly when a user selects a primary category on the smart homepage.

## 7. SEO Strategy
- **Semantic HTML:** Strict use of `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`.
- **Heading Hierarchy:** Single `<h1>` per page, logical `<h2>` and `<h3>` structuring.
- **Metadata:** Dynamic metadata generation (optimized `<title>` and `<meta name="description">`).
- **Schema.org:** JSON-LD integration for `LocalBusiness` (address, coordinates, hours, contact).
- **Social Tags:** Open Graph (OG) tags for Facebook/WhatsApp sharing and Twitter Cards.
- **Technical SEO:** Clean URLs, canonical tags, `robots.txt`, and auto-generated XML Sitemap.
- **Image Optimization:** All images require descriptive `alt` text. Use Next.js `<Image>` component for WebP/AVIF formats, lazy loading, and blur-up placeholders.
- **Performance:** Target 95+ Lighthouse score, sub-1.5s FCP, zero cumulative layout shift (CLS).

## 8. API Map (Future & Static Data)
For Phase 2, this will be strictly mocked. Future API integration includes:
- `GET /api/categories` - Fetch all active categories.
- `GET /api/products?category={categoryId}` - Fetch products for a specific category.
- `GET /api/products/featured` - Fetch featured sliding products.
- `GET /api/store-info` - Fetch dynamic store hours, active promotions.

## 9. Future Features & Admin Integration (Phase 4+)
- **Owner Dashboard (Separate Route/System):** Accessible only via secure login.
- **Inventory Management:** Add/edit/delete products, manage stock levels, receive low-stock alerts.
- **Media Management:** Direct Cloudinary uploads for new products.
- **Content Updates:** Banner management, active promotions updates.
- **Analytics:** Basic views, popular categories tracking.
- **QR/Barcode Integration:** For physical store synchronization.

## 10. Phase 1 Completion Status
This `PLAN.md` document serves as the complete project blueprint. 
**Action Required:** Awaiting review and approval from the user before moving to Phase 2 (Designing ONLY the UI for the homepage).
