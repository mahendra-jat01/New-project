import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  CreditCard,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Menu,
  Minus,
  PackageSearch,
  Percent,
  Phone,
  Play,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  UserRound,
  WalletCards,
  X
} from 'lucide-react';
import './styles.css';

const categoryMeta = [
  {
    key: 'Fruits',
    title: 'Fruits',
    subtitle: 'Sweet and juicy',
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1400&q=80'
  },
  {
    key: 'Vegetables',
    title: 'Vegetables',
    subtitle: 'Daily staples',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80'
  },
  {
    key: 'Leafy Greens',
    title: 'Leafy Greens',
    subtitle: 'Morning fresh picks',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1400&q=80'
  },
  {
    key: 'Seasonal Specials',
    title: 'Seasonal Specials',
    subtitle: 'Limited mandi lots',
    image:
      'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=1400&q=80'
  },
  {
    key: 'Organic',
    title: 'Organic',
    subtitle: 'Chemical-free quality',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=80'
  },
  {
    key: 'Combo Packs',
    title: 'Combo Packs',
    subtitle: 'Weekly value box',
    image:
      'https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=1400&q=80'
  }
];

const workflowSteps = [
  {
    title: 'Order by 12 AM',
    text: 'Book tonight and lock mandi pricing for tomorrow morning.',
    icon: Clock3,
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'We Buy at Dawn',
    text: 'Our team buys direct from mandi when fresh lots arrive.',
    icon: PackageSearch,
    image:
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Sorting and Packing',
    text: 'Each item is checked, sorted, and packed in fresh-safe crates.',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Morning Delivery',
    text: 'Receive your order at home before market rush starts.',
    icon: Truck,
    image:
      'https://images.unsplash.com/photo-1613214150388-df24f6f9b889?auto=format&fit=crop&w=900&q=80'
  }
];

const products = [
  {
    id: 1,
    name: 'Royal Gala Apple',
    category: 'Fruits',
    unit: '1 kg',
    price: 169,
    mrp: 239,
    rating: 4.8,
    reviews: 1820,
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    name: 'Banana Premium',
    category: 'Fruits',
    unit: '6 pcs',
    price: 59,
    mrp: 89,
    rating: 4.7,
    reviews: 1340,
    image:
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    name: 'Farm Tomato',
    category: 'Vegetables',
    unit: '500 g',
    price: 49,
    mrp: 72,
    rating: 4.7,
    reviews: 1024,
    image:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    name: 'Green Capsicum',
    category: 'Vegetables',
    unit: '500 g',
    price: 69,
    mrp: 99,
    rating: 4.6,
    reviews: 876,
    image:
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    name: 'Baby Spinach',
    category: 'Leafy Greens',
    unit: '250 g',
    price: 59,
    mrp: 89,
    rating: 4.9,
    reviews: 762,
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    name: 'Fresh Coriander',
    category: 'Leafy Greens',
    unit: '100 g',
    price: 19,
    mrp: 29,
    rating: 4.8,
    reviews: 564,
    image:
      'https://images.unsplash.com/photo-1628557115055-40f4c7dcb0be?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    name: 'Mango King Pack',
    category: 'Seasonal Specials',
    unit: '1 kg',
    price: 189,
    mrp: 279,
    rating: 4.9,
    reviews: 1498,
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 8,
    name: 'Litchi Delight',
    category: 'Seasonal Specials',
    unit: '500 g',
    price: 129,
    mrp: 189,
    rating: 4.7,
    reviews: 619,
    image:
      'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 9,
    name: 'Organic Carrot',
    category: 'Organic',
    unit: '500 g',
    price: 64,
    mrp: 94,
    rating: 4.8,
    reviews: 812,
    image:
      'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 10,
    name: 'Organic Broccoli',
    category: 'Organic',
    unit: '1 pc',
    price: 89,
    mrp: 129,
    rating: 4.7,
    reviews: 701,
    image:
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 11,
    name: 'Family Fruit Box',
    category: 'Combo Packs',
    unit: '3 kg box',
    price: 449,
    mrp: 640,
    rating: 4.9,
    reviews: 1109,
    image:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 12,
    name: 'Veggie Essentials Box',
    category: 'Combo Packs',
    unit: '4 kg box',
    price: 399,
    mrp: 579,
    rating: 4.8,
    reviews: 923,
    image:
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80'
  }
];

const testimonials = [
  {
    name: 'Ritika Sethi',
    city: 'Gurgaon',
    text: 'Subah 7:30 baje fresh mandi wala maal aa jata hai. Price difference sach me visible hai.',
    image:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Aman Tiwari',
    city: 'Noida',
    text: 'Pehli baar app jaisa trust mila for fresh produce. Packaging, quality, sab premium.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Shreya Nair',
    city: 'Bengaluru',
    text: 'Combo packs amazing hain. Local market se genuinely sasta and quality better.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  }
];

function getTimeToMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = Math.max(midnight.getTime() - now.getTime(), 0);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeToMidnight());
  const [address, setAddress] = useState({
    fullName: '',
    mobile: '',
    line: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeToMidnight());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => {
          const product = products.find((item) => item.id === Number(id));
          return { ...product, qty };
        }),
    [cart]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const mrpTotal = cartItems.reduce((sum, item) => sum + item.mrp * item.qty, 0);
  const savings = mrpTotal - subtotal;
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 39;
  const handlingFee = subtotal === 0 ? 0 : 9;
  const finalTotal = subtotal + deliveryFee + handlingFee;

  function updateQuantity(productId, delta) {
    setOrderPlaced(false);
    setCart((previous) => {
      const currentQty = previous[productId] || 0;
      const nextQty = Math.max(currentQty + delta, 0);
      const next = { ...previous };
      if (nextQty === 0) {
        delete next[productId];
      } else {
        next[productId] = nextQty;
      }
      return next;
    });
  }

  function addToCart(productId) {
    setCartOpen(true);
    updateQuantity(productId, 1);
  }

  function removeFromCart(productId) {
    setCart((previous) => {
      const next = { ...previous };
      delete next[productId];
      return next;
    });
  }

  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  }

  function selectCategory(category) {
    setActiveCategory(category);
    scrollToSection('products');
  }

  function openAuth(mode) {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  function handleAuthSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get('fullName') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    setCustomer({
      fullName: fullName || 'FreshMandi Customer',
      email: email || 'hello@freshmandi.in',
      phone
    });
    setAuthOpen(false);
  }

  function placeOrder() {
    if (!customer) {
      openAuth('login');
      return;
    }
    if (cartItems.length === 0) return;
    if (!address.fullName || !address.mobile || !address.line || !address.city || !address.pincode) {
      return;
    }
    setOrderPlaced(true);
  }

  function clearOrder() {
    setCart({});
    setOrderPlaced(false);
  }

  return (
    <div className="min-h-screen bg-cream text-pine">
      <TopStrip hours={timeLeft.hours} minutes={timeLeft.minutes} />
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        openCart={() => setCartOpen(true)}
        customer={customer}
        openAuth={openAuth}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      <main>
        <Hero onOrderNow={() => scrollToSection('products')} />
        <TrustBar />
        <CategorySection selectCategory={selectCategory} />
        <HowItWorksSection />
        <ProductsSection
          products={filteredProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          cart={cart}
          addToCart={addToCart}
          updateQuantity={updateQuantity}
        />
        <TestimonialsSection />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        subtotal={subtotal}
        savings={savings}
        deliveryFee={deliveryFee}
        handlingFee={handlingFee}
        finalTotal={finalTotal}
        customer={customer}
        openAuth={openAuth}
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        address={address}
        setAddress={setAddress}
        placeOrder={placeOrder}
        orderPlaced={orderPlaced}
        clearOrder={clearOrder}
      />

      <AuthModal
        open={authOpen}
        mode={authMode}
        setMode={setAuthMode}
        onClose={() => setAuthOpen(false)}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
}

function TopStrip({ hours, minutes }) {
  return (
    <div className="bg-pine px-4 py-2 text-white sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 text-center text-sm font-semibold">
        <span className="inline-flex items-center gap-2">
          <Clock3 size={14} /> Order till 12 AM tonight
        </span>
        <span className="text-white/70">|</span>
        <span className="inline-flex items-center gap-2">
          <Truck size={14} /> Direct from mandi by next morning
        </span>
        <span className="rounded-full bg-white/15 px-3 py-0.5 text-xs font-bold">
          {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m left
        </span>
      </div>
    </div>
  );
}

function Header({
  search,
  setSearch,
  cartCount,
  openCart,
  customer,
  openAuth,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dbeadf] bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
        <button
          className="icon-button lg:hidden"
          onClick={() => setMobileMenuOpen((value) => !value)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <a href="#" className="flex items-center gap-2">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mandi text-white shadow-glow">
            <Leaf size={22} />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">FreshMandi</span>
        </a>

        <nav className="ml-8 hidden items-center gap-6 text-sm font-bold text-[#35594f] lg:flex">
          <button className="nav-link" onClick={() => scrollToSection('categories')}>
            Categories
          </button>
          <button className="nav-link" onClick={() => scrollToSection('how-it-works')}>
            How it works
          </button>
          <button className="nav-link" onClick={() => scrollToSection('products')}>
            Best Sellers
          </button>
          <button className="nav-link" onClick={() => scrollToSection('testimonials')}>
            Reviews
          </button>
        </nav>

        <div className="ml-auto hidden max-w-sm flex-1 items-center rounded-full border border-[#dbeadf] bg-[#f2fbf7] px-4 py-2.5 md:flex">
          <Search size={17} className="text-mandi" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-[#77a294]"
            placeholder="Search fruits, vegetables, combos..."
          />
        </div>

        <button className="icon-button relative" onClick={openCart} aria-label="Open cart drawer">
          <ShoppingBag size={18} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-sunrise px-1 text-[11px] font-extrabold text-white">
            {cartCount}
          </span>
        </button>

        <button
          className="hidden rounded-full bg-mandi px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-pine sm:inline-flex"
          onClick={() => openAuth('login')}
        >
          <UserRound size={16} className="mr-2" />
          {customer ? customer.fullName.split(' ')[0] : 'Login'}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#dbeadf] bg-white px-4 py-4 lg:hidden">
          <div className="mb-4 flex items-center rounded-full border border-[#dbeadf] bg-[#f2fbf7] px-4 py-2.5">
            <Search size={17} className="text-mandi" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent px-3 text-sm font-semibold outline-none"
              placeholder="Search produce..."
            />
          </div>
          <div className="grid gap-2 text-sm font-bold text-[#35594f]">
            <button className="text-left" onClick={() => scrollToSection('categories')}>
              Categories
            </button>
            <button className="text-left" onClick={() => scrollToSection('how-it-works')}>
              How it works
            </button>
            <button className="text-left" onClick={() => scrollToSection('products')}>
              Best Sellers
            </button>
            <button className="text-left" onClick={() => scrollToSection('testimonials')}>
              Reviews
            </button>
            <button className="text-left" onClick={() => openAuth('login')}>
              Login / Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ onOrderNow }) {
  return (
    <section className="hero-section relative min-h-[92vh] overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2400&q=80"
        alt="Fresh produce arriving from mandi in morning light"
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(10,47,37,0.78)_0%,rgba(10,47,37,0.18)_60%,rgba(255,255,255,0.08)_100%)]" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 py-12 sm:px-6">
        <div className="max-w-3xl animate-lift-in text-white">
          <p className="mb-5 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
            <ShieldCheck size={16} className="mr-2" />
            Market se 30% sasta guaranteed
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            Aaj Raat 12 Baje Tak Order Karo
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
            Subah mandi se taza laakar ghar deliver. Better quality, lower rates, and premium
            freshness in every order.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
            <span className="hero-chip">
              <Clock3 size={15} /> Morning Delivery
            </span>
            <span className="hero-chip">
              <Percent size={15} /> 30% Guaranteed Discount
            </span>
            <span className="hero-chip">
              <BadgeCheck size={15} /> Direct from Mandi
            </span>
          </div>
          <button className="hero-button mt-10" onClick={onOrderNow}>
            Order Now <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    'Direct from Mandi',
    'No Middlemen',
    '30% Cheaper',
    'Super Fresh',
    'Morning Delivery'
  ];

  return (
    <section className="bg-[#e8f8f2] py-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-3 px-4 sm:px-6">
        {items.map((item) => (
          <span key={item} className="trust-pill">
            <BadgeCheck size={14} /> {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function CategorySection({ selectCategory }) {
  return (
    <section id="categories" className="section-wrap">
      <SectionTitle
        eyebrow="Shop Categories"
        title="Pick what your kitchen needs today."
        subtitle="Fresh produce categories curated for Indian households and morning delivery."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categoryMeta.map((item) => (
          <button
            key={item.key}
            className="category-card"
            onClick={() => selectCategory(item.key)}
            aria-label={`Browse ${item.title}`}
          >
            <img src={item.image} alt={item.title} className="h-52 w-full object-cover" />
            <div className="p-5 text-left">
              <h3 className="font-display text-2xl font-bold">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold text-[#67847a]">{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-wrap bg-beige/70">
      <SectionTitle
        eyebrow="How It Works"
        title="From mandi to your doorstep in one night."
        subtitle="Transparent process designed for freshness, speed, and savings."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-4">
        {workflowSteps.map((step, index) => (
          <article key={step.title} className="workflow-card">
            <div className="relative">
              <img className="h-36 w-full rounded-2xl object-cover" src={step.image} alt={step.title} />
              <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-mandi">
                Step {index + 1}
              </span>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e5f7f1] text-mandi">
                <step.icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#5f7a71]">{step.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductsSection({
  products,
  activeCategory,
  setActiveCategory,
  cart,
  addToCart,
  updateQuantity
}) {
  const filters = ['All', 'Fruits', 'Vegetables', 'Leafy Greens', 'Seasonal Specials', 'Organic', 'Combo Packs'];

  return (
    <section id="products" className="section-wrap">
      <SectionTitle
        eyebrow="Best Sellers"
        title="Mandi rates, premium quality, reliable mornings."
        subtitle="MRP strike-through, direct mandi pricing, and real delivery promise."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-pill ${activeCategory === filter ? 'active' : ''}`}
            onClick={() => setActiveCategory(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const quantity = cart[product.id] || 0;
          const offPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

          return (
            <article key={product.id} className="product-card">
              <div className="relative">
                <img src={product.image} alt={product.name} className="h-56 w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-sunrise px-3 py-1 text-xs font-extrabold text-white">
                  {offPercent}% OFF
                </span>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-[#e8f8f2] px-3 py-1 text-xs font-extrabold text-mandi">
                    {product.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#35594f]">
                    <Star size={14} className="fill-[#ffce47] text-[#ffce47]" />
                    {product.rating}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold leading-tight">{product.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[#67847a]">
                  {product.unit} • {product.reviews.toLocaleString()} reviews
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <p className="text-2xl font-extrabold text-mandi">Rs {product.price}</p>
                  <p className="text-sm font-bold text-[#94aaa2] line-through">Rs {product.mrp}</p>
                </div>

                <div className="mt-5">
                  {quantity === 0 ? (
                    <button
                      className="add-cart-button"
                      onClick={() => addToCart(product.id)}
                      aria-label={`Add ${product.name}`}
                    >
                      <Plus size={17} /> Add
                    </button>
                  ) : (
                    <div className="inline-flex items-center rounded-full border border-[#d6ece3] bg-[#f4fcf8] p-1">
                      <button
                        className="qty-button"
                        onClick={() => updateQuantity(product.id, -1)}
                        aria-label={`Decrease ${product.name}`}
                      >
                        <Minus size={15} />
                      </button>
                      <span className="grid min-w-9 px-2 text-sm font-extrabold">{quantity}</span>
                      <button
                        className="qty-button"
                        onClick={() => updateQuantity(product.id, 1)}
                        aria-label={`Increase ${product.name}`}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-[#cce6db] bg-[#f6fcf9] p-8 text-center">
          <p className="font-display text-2xl font-bold">No products found</p>
          <p className="mt-2 text-sm font-semibold text-[#67847a]">Try another filter or search term.</p>
        </div>
      )}
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-wrap bg-pine text-white">
      <SectionTitle
        eyebrow="Testimonials"
        title="Trusted by families across India."
        subtitle="People love the price edge and freshness consistency."
        dark
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="testimonial-card">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-display text-lg font-bold">{item.name}</p>
                <p className="text-sm font-semibold text-white/65">{item.city}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={15} className="fill-[#ffce47] text-[#ffce47]" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-white/85">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CartDrawer({
  open,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  subtotal,
  savings,
  deliveryFee,
  handlingFee,
  finalTotal,
  customer,
  openAuth,
  paymentMode,
  setPaymentMode,
  address,
  setAddress,
  placeOrder,
  orderPlaced,
  clearOrder
}) {
  if (!open) return null;

  const paymentOptions = ['UPI', 'COD', 'Card'];
  const canPlaceOrder =
    Boolean(customer) &&
    cartItems.length > 0 &&
    Boolean(address.fullName && address.mobile && address.line && address.city && address.pincode);

  return (
    <div className="fixed inset-0 z-[70]">
      <button className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-[#f9fdfb] shadow-soft">
        <div className="flex items-center justify-between border-b border-[#d6ece3] bg-white px-5 py-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-mandi">Your Cart</p>
            <h2 className="font-display text-3xl font-bold">FreshMandi Basket</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close cart">
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {orderPlaced && (
            <div className="mb-5 rounded-3xl bg-mandi p-5 text-white">
              <p className="font-display text-2xl font-bold">Order Confirmed</p>
              <p className="mt-1 text-sm font-semibold text-white/85">
                Your order is queued for morning mandi delivery.
              </p>
              <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-mandi" onClick={clearOrder}>
                Start New Order
              </button>
            </div>
          )}

          {cartItems.length === 0 && !orderPlaced && (
            <div className="grid min-h-[280px] place-items-center text-center">
              <div>
                <ShoppingBag size={44} className="mx-auto text-mandi" />
                <h3 className="mt-3 font-display text-2xl font-bold">Cart is empty</h3>
                <p className="mt-1 text-sm font-semibold text-[#5f7a71]">
                  Add products from Best Sellers to continue.
                </p>
              </div>
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article key={item.id} className="rounded-3xl bg-white p-4 ring-1 ring-[#d6ece3]">
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="h-24 w-24 rounded-2xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-display text-xl font-bold leading-tight">{item.name}</h4>
                          <p className="text-xs font-semibold text-[#6d8a80]">{item.unit}</p>
                        </div>
                        <button className="text-sm font-extrabold text-[#839d94] transition hover:text-[#d04921]" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-lg font-extrabold text-mandi">Rs {item.price * item.qty}</p>
                        <div className="inline-flex items-center rounded-full border border-[#d6ece3] bg-[#f4fcf8] p-1">
                          <button className="qty-button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease cart item ${item.name}`}>
                            <Minus size={15} />
                          </button>
                          <span className="grid min-w-9 px-2 text-sm font-extrabold">{item.qty}</span>
                          <button className="qty-button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase cart item ${item.name}`}>
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <section className="rounded-3xl bg-white p-5 ring-1 ring-[#d6ece3]">
                <h3 className="font-display text-2xl font-bold">Checkout Details</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InputField
                    label="Full Name"
                    value={address.fullName}
                    onChange={(value) => setAddress((prev) => ({ ...prev, fullName: value }))}
                  />
                  <InputField
                    label="Mobile Number"
                    value={address.mobile}
                    onChange={(value) => setAddress((prev) => ({ ...prev, mobile: value }))}
                  />
                  <InputField
                    label="Address Line"
                    value={address.line}
                    onChange={(value) => setAddress((prev) => ({ ...prev, line: value }))}
                  />
                  <InputField
                    label="City"
                    value={address.city}
                    onChange={(value) => setAddress((prev) => ({ ...prev, city: value }))}
                  />
                  <InputField
                    label="Pincode"
                    value={address.pincode}
                    onChange={(value) => setAddress((prev) => ({ ...prev, pincode: value }))}
                  />
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm font-extrabold text-[#35594f]">Payment Method</p>
                  <div className="flex flex-wrap gap-2">
                    {paymentOptions.map((option) => (
                      <button
                        key={option}
                        className={`payment-pill ${paymentMode === option ? 'active' : ''}`}
                        onClick={() => setPaymentMode(option)}
                      >
                        {option === 'UPI' && <WalletCards size={14} />}
                        {option === 'COD' && <Truck size={14} />}
                        {option === 'Card' && <CreditCard size={14} />}
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {!customer && (
                  <button className="mt-4 rounded-full bg-pine px-4 py-2 text-sm font-extrabold text-white" onClick={() => openAuth('login')}>
                    Login to Continue
                  </button>
                )}
              </section>

              <section className="rounded-3xl bg-white p-5 ring-1 ring-[#d6ece3]">
                <h3 className="font-display text-2xl font-bold">Price Details</h3>
                <div className="mt-4 space-y-2 text-sm font-semibold text-[#4c6c61]">
                  <PriceRow label="Subtotal" value={`Rs ${subtotal}`} />
                  <PriceRow label="Delivery Fee" value={deliveryFee === 0 ? 'Free' : `Rs ${deliveryFee}`} />
                  <PriceRow label="Handling Fee" value={`Rs ${handlingFee}`} />
                  <PriceRow label="You Save" value={`Rs ${savings}`} green />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#d6ece3] pt-4">
                  <span className="font-display text-xl font-bold">Total</span>
                  <span className="font-display text-2xl font-extrabold text-pine">Rs {finalTotal}</span>
                </div>
              </section>
            </div>
          )}
        </div>

        <div className="border-t border-[#d6ece3] bg-white p-5">
          <button
            className="w-full rounded-full bg-mandi px-6 py-4 text-base font-extrabold text-white transition hover:bg-pine disabled:cursor-not-allowed disabled:bg-[#9ecfc0]"
            onClick={placeOrder}
            disabled={cartItems.length === 0 || orderPlaced}
          >
            {customer ? 'Place Morning Delivery Order' : 'Login to Checkout'}
          </button>
          {!canPlaceOrder && cartItems.length > 0 && customer && (
            <p className="mt-2 text-center text-xs font-semibold text-[#7b938b]">
              Fill all address fields to place order.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-extrabold uppercase tracking-wider text-[#5f7a71]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-[#d6ece3] bg-[#f8fcfa] px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-mandi"
      />
    </label>
  );
}

function PriceRow({ label, value, green = false }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className={green ? 'font-extrabold text-mandi' : 'font-extrabold text-pine'}>{value}</span>
    </div>
  );
}

function AuthModal({ open, mode, setMode, onClose, onSubmit }) {
  if (!open) return null;
  const isRegister = mode === 'register';

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.8rem] bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-mandi">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              {isRegister ? 'Register on FreshMandi' : 'Login to FreshMandi'}
            </h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close auth modal">
            <X size={18} />
          </button>
        </div>

        <form className="space-y-3" onSubmit={onSubmit}>
          {isRegister && <AuthField icon={UserRound} name="fullName" placeholder="Full name" required />}
          <AuthField icon={Mail} name="email" placeholder="Email address" required />
          <AuthField icon={Phone} name="phone" placeholder="Mobile number" required />
          <AuthField icon={Lock} name="password" placeholder="Password" type="password" required />
          <button className="mt-2 w-full rounded-full bg-mandi px-6 py-3.5 text-base font-extrabold text-white transition hover:bg-pine">
            {isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm font-semibold text-[#6c867d]">
          {isRegister ? 'Already have an account?' : 'New to FreshMandi?'}{' '}
          <button className="font-extrabold text-mandi" onClick={() => setMode(isRegister ? 'login' : 'register')}>
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}

function AuthField({ icon: Icon, name, placeholder, type = 'text', required = false }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-[#d6ece3] bg-[#f8fcfa] px-4 py-3">
      <Icon size={18} className="text-mandi" />
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
        className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[#8aa399]"
      />
    </label>
  );
}

function SectionTitle({ eyebrow, title, subtitle, dark = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-extrabold uppercase tracking-[0.2em] ${dark ? 'text-[#95dbca]' : 'text-mandi'}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl ${dark ? 'text-white' : 'text-pine'}`}>
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 font-semibold ${dark ? 'text-white/70' : 'text-[#5f7a71]'}`}>
        {subtitle}
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#08261f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-bold">FreshMandi</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/75">
            Order till midnight, get mandi-fresh produce by morning with guaranteed lower pricing.
          </p>
          <div className="mt-5 flex gap-2">
            <button className="footer-badge">
              <Play size={14} /> Google Play
            </button>
            <button className="footer-badge">App Store</button>
          </div>
        </div>

        <div>
          <h4 className="footer-title">Quick Links</h4>
          <div className="footer-links">
            <a href="#categories">Categories</a>
            <a href="#products">Best Sellers</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Customer Reviews</a>
          </div>
        </div>

        <div>
          <h4 className="footer-title">Support</h4>
          <div className="footer-links">
            <p className="inline-flex items-center gap-2"><Phone size={14} /> +91 92000 22000</p>
            <p className="inline-flex items-center gap-2"><Mail size={14} /> support@freshmandi.in</p>
            <p className="inline-flex items-center gap-2"><MapPin size={14} /> Delhi NCR, Bengaluru, Pune</p>
          </div>
        </div>

        <div>
          <h4 className="footer-title">Payments</h4>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-extrabold">
            <span className="payment-chip">UPI</span>
            <span className="payment-chip">Cards</span>
            <span className="payment-chip">NetBanking</span>
            <span className="payment-chip">COD</span>
            <span className="payment-chip">Wallets</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs font-semibold text-white/55">
        (c) 2026 FreshMandi. All rights reserved.
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
