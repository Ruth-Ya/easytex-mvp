// src/App.jsx
import React, { useState, useEffect } from "react";

/* -----------------------------------------------------------
   CONFIG
----------------------------------------------------------- */

const WA_NUMBER = "221707546281";

const formatPrice = (n) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(n);

/* -----------------------------------------------------------
   DONNÉES DÉMO AVEC CATÉGORIES + IMAGES
----------------------------------------------------------- */

const DEMO_PRODUCTS = [
  {
    id: "p1",
    name: "Bazin riche 1,8 m",
    category: "Tissus habillement",
    type: "Bazin",
    color: "Bleu roi",
    origin: "Sénégal",
    price: 8500,
    material: "Coton",
    weight: "Moyen",
    pattern: "Uni",
    images: ["/p1-1.jpg", "/p1-2.jpg"],
    featured: true,
  },
  {
    id: "p2",
    name: "Wax premium 6 yards",
    category: "Tissus habillement",
    type: "Wax",
    color: "Bleu / Vert",
    origin: "Côte d’Ivoire",
    price: 19000,
    material: "Coton",
    weight: "Léger",
    pattern: "Imprimé Wax",
    images: ["/p2-1.jpg", "/p2-2.jpg"],
    featured: true,
  },
  {
    id: "p3",
    name: "Popeline coton chemise",
    category: "Tissus habillement",
    type: "Popeline",
    color: "Blanc",
    origin: "Turquie",
    price: 6500,
    material: "Coton",
    weight: "Léger",
    pattern: "Uni",
    images: ["/p3-1.jpg", "/p3-2.jpg"],
    featured: true,
  },
  {
    id: "p4",
    name: "Pagne tissé",
    category: "Tissus spécifiques et traditionnels",
    type: "Tissé",
    color: "Multicolore",
    origin: "Côte d’Ivoire",
    price: 24000,
    material: "Coton",
    weight: "Moyen",
    pattern: "Rayé",
    images: ["/p4-1.jpg", "/p4-2.jpg"],
    featured: true,
  },
  {
    id: "p5",
    name: "Indigo artisanal",
    category: "Tissus spécifiques et traditionnels",
    type: "Indigo",
    color: "Indigo profond",
    origin: "Mali",
    price: 17500,
    material: "Coton",
    weight: "Moyen",
    pattern: "Uni",
    images: ["/p5-1.jpg", "/p5-2.jpg"],
    featured: false,
  },
  {
    id: "p6",
    name: "Toile épaisse ameublement",
    category: "Tissus Ameublement et Décoration",
    type: "Toile",
    color: "Beige",
    origin: "Ghana",
    price: 22000,
    material: "Polyester",
    weight: "Lourd",
    pattern: "Uni",
    images: ["/p6-1.jpg", "/p6-2.jpg"],
    featured: false,
  },
  {
    id: "p7",
    name: "Velours jacquard canapé",
    category: "Tissus Ameublement et Décoration",
    type: "Velours",
    color: "Vert bouteille",
    origin: "Chine",
    price: 28500,
    material: "Mélange",
    weight: "Lourd",
    pattern: "Jacquard",
    images: ["/p7-1.jpg", "/p7-2.jpg"],
    featured: false,
  },
  {
    id: "p8",
    name: "Éponge serviettes hôtel",
    category: "Tissus Maison et Linge",
    type: "Éponge",
    color: "Blanc",
    origin: "Sénégal",
    price: 6500,
    material: "Coton",
    weight: "Moyen",
    pattern: "Uni",
    images: ["/p8-1.jpg", "/p8-2.jpg"],
    featured: false,
  },
  {
    id: "p9",
    name: "Drap housse percale",
    category: "Tissus Maison et Linge",
    type: "Percale",
    color: "Gris clair",
    origin: "Portugal",
    price: 11000,
    material: "Coton",
    weight: "Moyen",
    pattern: "Uni",
    images: ["/p9-1.jpg", "/p9-2.jpg"],
    featured: false,
  },
];

/* -----------------------------------------------------------
   LIGHTBOX / SLIDER “VERSION PRO” (avec swipe mobile)
----------------------------------------------------------- */

function Lightbox({
  open,
  images,
  index,
  onClose,
  onPrev,
  onNext,
  onSelect,
}) {
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const isOpen = open && images && images.length > 0;
  const currentIndex = index ?? 0;
  const total = images ? images.length : 0;

  // Bloquer / réactiver le scroll + clavier
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen) return null;

  // Gestion du swipe tactile (mobile)
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const deltaX = touchEndX - touchStartX;
    const threshold = 40;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        onNext?.();
      } else {
        onPrev?.();
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* clic en dehors pour fermer */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Contenu */}
      <div className="relative z-10 flex max-h-[90vh] max-w-[92vw] flex-col items-center px-4">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute right-0 top-[-3rem] rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-white"
        >
          ✕ Fermer
        </button>

        <div
          className="relative flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Flèche gauche (desktop) */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              className="absolute left-[-2.5rem] hidden rounded-full bg-white/90 p-2 text-gray-700 shadow hover:bg-white sm:inline-flex"
            >
              <span className="text-lg">←</span>
            </button>
          )}

          {/* Image */}
          <img
            src={images[currentIndex]}
            alt=""
            className="max-h-[70vh] max-w-[80vw] rounded-xl bg-white object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/logo-easytex.png";
            }}
          />

          {/* Flèche droite (desktop) */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              className="absolute right-[-2.5rem] hidden rounded-full bg-white/90 p-2 text-gray-700 shadow hover:bg-white sm:inline-flex"
            >
              <span className="text-lg">→</span>
            </button>
          )}
        </div>

        {/* Bas : compteur + pastilles */}
        {total > 1 && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="text-xs font-medium text-white/80">
              Photo {currentIndex + 1} / {total}
            </div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.(i);
                  }}
                  className={`h-2.5 w-2.5 rounded-full border border-white/60 transition ${
                    i === currentIndex
                      ? "bg-white"
                      : "bg-white/20 hover:bg-white/50"
                  }`}
                  aria-label={`Aller à l’image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   HOME
----------------------------------------------------------- */

function HomeView({ onGoCatalogue, onOpenSupplier }) {
  const [heroIndex, setHeroIndex] = useState(0);

  const slides = [
    {
      badge: "EasyTex",
      title: "Sourcing textile, simple et rapide.",
      description:
        "EasyTex connecte les acheteurs de textile aux meilleurs fournisseurs de la zone UEMOA, directement sur WhatsApp.",
    },
    {
      badge: "Tissus habillement",
      title: "Bazin, Wax, Popeline… en un seul endroit.",
      description:
        "Comparez les qualités, origines et prix indicatifs avant de contacter les fournisseurs.",
    },
    {
      badge: "Professionnels & ateliers",
      title: "Gagnez du temps sur vos achats textile.",
      description:
        "Recevez des devis rapides, discutez sur WhatsApp et optimisez vos approvisionnements.",
    },
  ];

  const featuredProducts = DEMO_PRODUCTS.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* HERO SLIDER */}
      <div className="relative overflow-hidden rounded-3xl border bg-blue-50 p-6 md:p-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm ring-1 ring-gray-200">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
            {slides[heroIndex].badge}
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            {slides[heroIndex].title}
          </h1>

          <p className="mt-4 text-gray-700 md:text-lg">
            {slides[heroIndex].description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onGoCatalogue}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Explorer le catalogue
            </button>

            <button
              onClick={onOpenSupplier}
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-blue-700 ring-1 ring-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Devenir fournisseur
            </button>
          </div>

          {/* Dots slider */}
          <div className="mt-6 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === heroIndex ? "bg-blue-700" : "bg-blue-200"
                }`}
                aria-label={`Aller au slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <div className="text-3xl font-extrabold text-gray-900">100</div>
          <div className="text-gray-600">Tissus disponibles</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-3xl font-extrabold text-gray-900">UEMOA</div>
          <div className="text-gray-600">Zone desservie</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-3xl font-extrabold text-gray-900">24–48h</div>
          <div className="text-gray-600">Délai de réponse</div>
        </div>
      </section>

      {/* TOP TISSUS DE LA SEMAINE */}
      {featuredProducts.length > 0 && (
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Top tissus de la semaine
            </h2>
            <button
              type="button"
              onClick={onGoCatalogue}
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              Voir tout le catalogue
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-2">
              {featuredProducts.map((p) => {
                const waText = encodeURIComponent(
                  `Bonjour EasyTex,\n\nJe souhaite un devis pour :\n- ${p.name}\n- Catégorie : ${p.category}\n- Matière : ${p.material}\n- Poids : ${p.weight}\n- Motif / aspect : ${p.pattern}\n- Couleur : ${p.color}\n- Origine : ${p.origin}\n- Prix indicatif : ${formatPrice(
                    p.price
                  )}\n\nMerci de me préciser les minimums de commande, délais et conditions de livraison.`
                );
                const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;
                const firstImage =
                  Array.isArray(p.images) && p.images.length > 0
                    ? p.images[0]
                    : null;

                return (
                  <div
                    key={p.id}
                    className="min-w-[220px] max-w-[260px] flex-1 rounded-2xl border bg-white p-3"
                  >
                    {firstImage && (
                      <div className="mb-2 overflow-hidden rounded-xl">
                        <img
                          src={firstImage}
                          alt={p.name}
                          className="h-32 w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/logo-easytex.png";
                          }}
                        />
                      </div>
                    )}
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                      {p.category}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-gray-900">
                      {p.name}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      {p.material} • {p.weight}
                    </div>
                    <div className="mt-1 text-base font-extrabold text-gray-900">
                      {formatPrice(p.price)}
                    </div>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      Demander un devis
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* COMMENT ÇA MARCHE */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Comment ça marche ?
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <div className="font-semibold text-gray-900">1) Explorez</div>
            <p className="mt-1 text-sm text-gray-600">
              Parcourez les tissus par catégorie : habillement, maison,
              ameublement, tissus traditionnels…
            </p>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-semibold text-gray-900">
              2) Demandez un devis
            </div>
            <p className="mt-1 text-sm text-gray-600">
              En un clic, envoyez une demande de devis détaillée sur WhatsApp.
            </p>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-semibold text-gray-900">
              3) Recevez & finalisez
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Comparez les offres, négociez directement avec les fournisseurs
              et confirmez votre commande.
            </p>
          </div>
        </div>
      </section>

      {/* CATÉGORIES DE TISSUS (GRILLE) */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Catégories de tissus
          </h2>
          <button
            type="button"
            onClick={onGoCatalogue}
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            Accéder au catalogue
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <button
            type="button"
            onClick={onGoCatalogue}
            className="flex flex-col items-start rounded-2xl border bg-white p-4 text-left hover:border-blue-500 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">👗</span>
              <span className="font-semibold text-gray-900">
                Tissus habillement
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Bazin, Wax, popeline, indigo… pour créateurs, ateliers et
              boutiques.
            </p>
          </button>

          <button
            type="button"
            onClick={onGoCatalogue}
            className="flex flex-col items-start rounded-2xl border bg-white p-4 text-left hover:border-blue-500 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛏️</span>
              <span className="font-semibold text-gray-900">
                Maison & linge
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Draps, serviettes, linge de maison pour hôtels, maisons
              d’hôtes, etc.
            </p>
          </button>

          <button
            type="button"
            onClick={onGoCatalogue}
            className="flex flex-col items-start rounded-2xl border bg-white p-4 text-left hover:border-blue-500 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛋️</span>
              <span className="font-semibold text-gray-900">
                Ameublement & déco
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Toiles épaisses, velours, tissus pour canapés, rideaux et
              sièges.
            </p>
          </button>

          <button
            type="button"
            onClick={onGoCatalogue}
            className="flex flex-col items-start rounded-2xl border bg-white p-4 text-left hover:border-blue-500 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="font-semibold text-gray-900">
                Tissus traditionnels
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Pagne tissé, indigo, bazin teint… pour collections identitaires
              et cérémonies.
            </p>
          </button>
        </div>
      </section>
    </div>
  );
}

/* -----------------------------------------------------------
   CATALOGUE + FILTRES + IMAGES (LIGHTBOX)
----------------------------------------------------------- */

function CatalogView({ onOpenLightbox }) {
  const [category, setCategory] = useState("Toutes");
  const [material, setMaterial] = useState("Tous");
  const [weight, setWeight] = useState("Tous");
  const [pattern, setPattern] = useState("Tous");
  const [search, setSearch] = useState("");

  const categories = [
    "Toutes",
    "Tissus habillement",
    "Tissus Maison et Linge",
    "Tissus Ameublement et Décoration",
    "Tissus spécifiques et traditionnels",
  ];
  const materials = [
    "Tous",
    "Coton",
    "Polyester",
    "Viscose",
    "Lin",
    "Soie",
    "Mélange",
  ];
  const weights = ["Tous", "Léger", "Moyen", "Lourd"];
  const patterns = ["Tous", "Uni", "Imprimé Wax", "Jacquard", "Rayé"];

  const filteredProducts = DEMO_PRODUCTS.filter((p) => {
    const cOk = category === "Toutes" || p.category === category;
    const mOk = material === "Tous" || p.material === material;
    const wOk = weight === "Tous" || p.weight === weight;
    const pOk = pattern === "Tous" || p.pattern === pattern;

    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      [p.name, p.type, p.color, p.material, p.origin]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return cOk && mOk && wOk && pOk && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <section id="catalogue">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Catalogue de tissus
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Filtrez les tissus par catégorie, matière, poids, motif ou effectuez
          une recherche par nom, matière ou origine pour trouver la référence
          la plus adaptée à votre projet. Les prix sont indicatifs et peuvent
          varier selon la quantité, la finition et les délais.
        </p>

        {/* RECHERCHE */}
        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Rechercher un tissu
          </label>
          <div className="flex items-center rounded-xl border bg-white px-3 py-2">
            <svg
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              className="ml-2 flex-1 text-sm outline-none"
              placeholder="Nom, matière, couleur, origine…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* FILTRES */}
        <div className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border bg-gray-50 p-4 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Catégorie
            </label>
            <select
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Matière
            </label>
            <select
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              {materials.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Poids
            </label>
            <select
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            >
              {weights.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Motif / aspect
            </label>
            <select
              className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            >
              {patterns.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CARTES PRODUITS */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-sm text-gray-600">
            Aucun tissu ne correspond à ces filtres pour l’instant. Essayez de
            relâcher un critère (par exemple la catégorie, la matière ou la
            recherche).
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => {
              const waText = encodeURIComponent(
                `Bonjour EasyTex,\n\nJe souhaite un devis pour :\n- ${p.name}\n- Catégorie : ${p.category}\n- Matière : ${p.material}\n- Poids : ${p.weight}\n- Motif / aspect : ${p.pattern}\n- Couleur : ${p.color}\n- Origine : ${p.origin}\n- Prix indicatif : ${formatPrice(
                  p.price
                )}\n\nMerci de me préciser les minimums de commande, délais et conditions de livraison.`
              );
              const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;

              const hasImages = Array.isArray(p.images) && p.images.length > 0;
              const firstImage = hasImages ? p.images[0] : null;

              return (
                <div
                  key={p.id}
                  className="flex h-full flex-col rounded-2xl border bg-white p-4"
                >
                  {/* Image cliquable avec overlay “Voir les photos” */}
                  {hasImages && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(p.images, 0)}
                      className="group relative mb-3 block w-full overflow-hidden rounded-xl"
                      aria-label={`Voir les photos de ${p.name}`}
                    >
                      <img
                        src={firstImage}
                        alt={p.name}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/logo-easytex.png";
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <span className="m-2 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                          Voir les photos ({p.images.length})
                        </span>
                      </div>
                    </button>
                  )}

                  <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                    {p.category}
                  </div>
                  <div className="mt-1 text-base font-semibold text-gray-900">
                    {p.name}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    {p.material} • {p.weight} • {p.pattern}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    {p.type} • {p.color} • {p.origin}
                  </div>
                  <div className="mt-2 text-lg font-extrabold text-gray-900">
                    {formatPrice(p.price)}
                  </div>

                  <div className="mt-4 flex-1" />

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    Demander un devis sur WhatsApp
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

/* -----------------------------------------------------------
   FORMULAIRE FOURNISSEUR
----------------------------------------------------------- */

function SupplierSignupView() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert(
      `Merci !\n\nNom: ${name}\nVille: ${city}\nPays: ${country}\nWhatsApp: ${whatsapp}\n\nL’équipe EasyTex vous recontactera.`
    );
    setName("");
    setCity("");
    setCountry("");
    setWhatsapp("");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <section
        id="fournisseurs"
        className="rounded-2xl border bg-white p-5 md:p-8"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Vous vendez du textile ? Rejoignez EasyTex
        </h2>
        <p className="mt-1 text-sm text-gray-700">
          Créez une vitrine simple, recevez des demandes qualifiées et
          développez votre clientèle dans l’espace UEMOA.
        </p>

        <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Nom de l’entreprise
            </label>
            <input
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Ville
            </label>
            <input
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Pays
            </label>
            <input
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-900">
              Numéro WhatsApp
            </label>
            <input
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-start">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Envoyer ma demande
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

/* -----------------------------------------------------------
   FAQ / CGU / POLITIQUE DE CONFIDENTIALITÉ
----------------------------------------------------------- */

function FaqView() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        FAQ – EasyTex
      </h1>
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h2 className="font-semibold text-gray-900">
            1. Qu’est-ce qu’EasyTex ?
          </h2>
          <p className="mt-1">
            EasyTex est une plateforme de mise en relation entre acheteurs de
            textile (professionnels ou particuliers) et des fournisseurs situés
            principalement dans la zone UEMOA. Le site vous permet d’explorer
            un catalogue de tissus et d’envoyer vos demandes de devis
            directement aux fournisseurs via WhatsApp.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            2. Est-ce qu’EasyTex vend directement les tissus ?
          </h2>
          <p className="mt-1">
            Non. EasyTex n’est pas vendeur de textile. Nous facilitons la mise
            en relation entre vous et des fournisseurs partenaires. Les
            commandes, paiements et livraisons sont conclus directement entre
            vous et le fournisseur.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            3. Les prix affichés sont-ils définitifs ?
          </h2>
          <p className="mt-1">
            Les prix indiqués sur le site sont des prix indicatifs basés sur
            les informations fournies par nos partenaires. Ils peuvent varier
            en fonction de la quantité, de la finition, des délais de
            livraison ou d’autres conditions commerciales. Le prix ferme est
            confirmé par le fournisseur lors de l’échange sur WhatsApp.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            4. Comment demander un devis ?
          </h2>
          <p className="mt-1">
            Lorsque vous trouvez un tissu qui vous intéresse, cliquez sur le
            bouton « Demander un devis sur WhatsApp ». Un message pré-rempli
            s’ouvre avec les principales informations du produit. Vous pouvez
            l’ajuster et l’envoyer directement au numéro EasyTex ou au
            fournisseur indiqué.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            5. Est-ce que je dois créer un compte pour utiliser EasyTex ?
          </h2>
          <p className="mt-1">
            Non, vous n’avez pas besoin de créer un compte pour consulter le
            catalogue ou envoyer une demande de devis. L’échange se fait via
            WhatsApp à partir des informations que vous partagez
            volontairement.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            6. Comment devenir fournisseur sur EasyTex ?
          </h2>
          <p className="mt-1">
            Si vous êtes fournisseur de textile, vous pouvez remplir le
            formulaire dans la section « Devenir fournisseur ». Nous étudions
            ensuite votre profil (type de produits, capacité, localisation,
            etc.) et revenons vers vous pour la suite.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            7. EasyTex vérifie-t-il les fournisseurs ?
          </h2>
          <p className="mt-1">
            Nous cherchons à collaborer avec des fournisseurs sérieux et
            fiables. Avant de référencer un fournisseur, nous effectuons des
            vérifications de base (type d’activité, références, échanges
            préalables). Cependant, EasyTex ne peut pas garantir la
            performance de chaque fournisseur et ne se substitue pas à votre
            propre vigilance dans le choix de vos partenaires.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            8. Qui est responsable en cas de problème de commande ?
          </h2>
          <p className="mt-1">
            Les commandes et les paiements sont conclus directement entre vous
            et le fournisseur. En cas de litige, c’est donc le fournisseur qui
            est votre interlocuteur principal. EasyTex n’est pas partie au
            contrat de vente, mais vous pouvez nous signaler tout problème
            récurrent afin que nous puissions, le cas échéant, revoir notre
            collaboration avec le fournisseur concerné.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            9. Est-ce qu’EasyTex collecte mes données personnelles ?
          </h2>
          <p className="mt-1">
            Nous collectons uniquement les informations que vous nous
            fournissez volontairement, par exemple via le formulaire « Devenir
            fournisseur » ou lors de vos échanges avec nous sur WhatsApp. Ces
            données sont utilisées pour répondre à vos demandes et améliorer
            le service. Pour plus de détails, veuillez consulter notre
            Politique de confidentialité.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            10. Comment contacter EasyTex en dehors de WhatsApp ?
          </h2>
          <p className="mt-1">
            Vous pouvez nous contacter via WhatsApp au numéro indiqué sur le
            site. D’autres canaux (email, réseaux sociaux…) seront
            progressivement ajoutés et indiqués sur easytex.sn.
          </p>
        </div>
      </div>
    </div>
  );
}

function CguView() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        Conditions Générales d’Utilisation – EasyTex
      </h1>
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h2 className="font-semibold text-gray-900">1. Préambule</h2>
          <p className="mt-1">
            Les présentes Conditions Générales d’Utilisation (ci-après les
            « CGU ») ont pour objet de définir les modalités d’accès et
            d’utilisation du site internet easytex.sn (ci-après le « Site »).
            En accédant au Site, l’utilisateur reconnaît avoir pris
            connaissance des CGU et les accepter sans réserve.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">2. Objet du Site</h2>
          <p className="mt-1">
            EasyTex est une plateforme de mise en relation entre acheteurs de
            textile (professionnels ou particuliers) et des fournisseurs
            partenaires, principalement situés dans la zone UEMOA. Le Site
            permet de consulter un catalogue de tissus et d’envoyer des
            demandes de devis via WhatsApp.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">3. Rôle d’EasyTex</h2>
          <p className="mt-1">
            EasyTex n’est pas vendeur de textile. Les produits présentés sur
            le Site sont proposés par des fournisseurs tiers. Les contrats de
            vente, conditions de paiement, de livraison, de retour ou de
            réclamation sont conclus directement entre l’acheteur et le
            fournisseur. EasyTex ne devient à aucun moment partie au contrat
            de vente.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">4. Accès au Site</h2>
          <p className="mt-1">
            L’accès au Site est gratuit (hors coûts de connexion internet
            supportés par l’utilisateur). EasyTex s’efforce de maintenir le
            Site accessible en permanence, mais ne peut garantir une
            disponibilité continue. L’accès peut être suspendu temporairement
            pour des raisons techniques, de maintenance ou de mise à jour.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">5. Utilisation du Site</h2>
          <p className="mt-1">
            L’utilisateur s’engage à utiliser le Site de manière loyale et
            conforme aux lois en vigueur, notamment à ne pas usurper
            l’identité d’un tiers, envoyer des informations fausses ou
            injurieuses, ou tenter de porter atteinte au bon fonctionnement du
            Site. EasyTex se réserve le droit de limiter ou de suspendre
            l’accès au Site à tout utilisateur qui ne respecterait pas les
            présentes CGU.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            6. Informations produits et prix
          </h2>
          <p className="mt-1">
            Les caractéristiques et prix des tissus sont fournis par les
            fournisseurs partenaires ou estimés à titre indicatif. Les prix
            affichés peuvent varier en fonction de la quantité commandée, de
            la finition, des conditions logistiques et des délais de
            livraison. Le prix définitif est confirmé par le fournisseur lors
            des échanges avec l’acheteur.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            7. Demande de devis et échanges via WhatsApp
          </h2>
          <p className="mt-1">
            Lorsque l’utilisateur clique sur « Demander un devis sur
            WhatsApp », un message pré-rempli est généré pour faciliter
            l’échange. Les échanges se déroulent ensuite sur WhatsApp, une
            plateforme tierce soumise à ses propres conditions d’utilisation
            et politiques de confidentialité. EasyTex ne peut être tenu
            responsable du fonctionnement de WhatsApp.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            8. Responsabilité d’EasyTex
          </h2>
          <p className="mt-1">
            EasyTex intervient comme intermédiaire de mise en relation. EasyTex
            ne saurait être tenu responsable de la disponibilité des produits,
            de la qualité, de la conformité ou de la livraison des tissus, ni
            des litiges relatifs aux paiements ou remboursements. En cas de
            problème récurrent avec un fournisseur, l’utilisateur est invité à
            en informer EasyTex.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            9. Propriété intellectuelle
          </h2>
          <p className="mt-1">
            Le contenu du Site (textes, visuels, logo, mise en page, etc.) est
            protégé par la législation applicable en matière de propriété
            intellectuelle. Toute reproduction, représentation ou exploitation
            non autorisée est interdite, sauf accord préalable écrit d’EasyTex.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">10. Données personnelles</h2>
          <p className="mt-1">
            Dans le cadre de l’utilisation du Site, certaines données
            personnelles peuvent être collectées. Les modalités de collecte et
            de traitement sont détaillées dans la Politique de confidentialité
            d’EasyTex, accessible sur le Site.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            11. Liens vers des sites tiers
          </h2>
          <p className="mt-1">
            Le Site peut contenir des liens vers des sites web tiers. EasyTex
            n’exerce aucun contrôle sur ces sites et ne saurait être tenu
            responsable de leur contenu, fonctionnement ou conformité
            juridique.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            12. Modification des CGU
          </h2>
          <p className="mt-1">
            EasyTex se réserve le droit de modifier à tout moment les présentes
            CGU. La version applicable est celle en vigueur au moment de la
            consultation du Site. Les utilisateurs sont invités à consulter
            régulièrement cette page.
          </p>
        </div>
      </div>
    </div>
  );
}

function PrivacyView() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        Politique de confidentialité – EasyTex
      </h1>
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h2 className="font-semibold text-gray-900">
            1. Objet de la politique
          </h2>
          <p className="mt-1">
            La présente Politique de confidentialité explique comment EasyTex
            collecte, utilise et protège les données personnelles des
            utilisateurs du site easytex.sn.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">2. Données collectées</h2>
          <p className="mt-1">
            EasyTex collecte uniquement les données nécessaires au
            fonctionnement du service, notamment :
          </p>
          <ul className="mt-1 list-disc pl-5">
            <li>
              Via le formulaire « Devenir fournisseur » : nom de l’entreprise,
              ville, pays, numéro WhatsApp, et informations supplémentaires
              transmises dans les champs libres.
            </li>
            <li>
              Via WhatsApp : les informations que vous partagez lors des
              échanges avec EasyTex.
            </li>
            <li>
              Éventuellement, des données techniques anonymisées (date et heure
              de visite, pages consultées), si un outil de mesure d’audience
              est ajouté ultérieurement.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            3. Finalités du traitement
          </h2>
          <p className="mt-1">
            Les données collectées sont utilisées pour répondre aux demandes
            des utilisateurs (devis, informations, devenir fournisseur),
            faciliter la mise en relation entre acheteurs et fournisseurs,
            suivre la relation avec les partenaires et améliorer le
            fonctionnement du Site.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">4. Base légale</h2>
          <p className="mt-1">
            Les traitements reposent sur votre consentement lorsque vous
            remplissez un formulaire ou nous contactez volontairement, et sur
            l’intérêt légitime d’EasyTex à organiser, suivre et améliorer son
            service de mise en relation.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            5. Durée de conservation
          </h2>
          <p className="mt-1">
            Les données sont conservées pendant une durée strictement
            nécessaire aux finalités poursuivies (gestion des demandes,
            relation avec les fournisseurs, statistiques anonymisées). Certaines
            données peuvent être conservées plus longtemps en cas d’obligation
            légale ou de nécessité de preuve.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            6. Partage des données
          </h2>
          <p className="mt-1">
            EasyTex ne vend pas les données personnelles des utilisateurs. Les
            données peuvent être partagées en interne (équipe EasyTex), avec
            des prestataires techniques soumis à une obligation de
            confidentialité, et avec des fournisseurs partenaires lorsque
            l’utilisateur demande explicitement un devis ou une mise en
            relation.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            7. Sécurité des données
          </h2>
          <p className="mt-1">
            EasyTex met en œuvre des mesures raisonnables pour protéger les
            données personnelles contre l’accès non autorisé, la perte ou
            l’altération. Aucun système n’étant parfaitement sécurisé, une
            sécurité absolue ne peut être garantie.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">8. Vos droits</h2>
          <p className="mt-1">
            Selon la réglementation applicable, vous disposez notamment d’un
            droit d’accès, de rectification, de suppression, de limitation et
            d’opposition concernant vos données. Pour exercer ces droits, vous
            pouvez contacter EasyTex via les canaux indiqués sur le site.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">
            9. Évolution de la politique
          </h2>
          <p className="mt-1">
            La présente politique pourra être mise à jour pour tenir compte de
            l’évolution du service EasyTex ou de la réglementation applicable.
            La version à jour est celle publiée sur le Site à la date de
            consultation.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   APP PRINCIPALE
----------------------------------------------------------- */

export default function App() {
  const [tab, setTab] = useState("accueil");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Lightbox global
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Newsletter (MVP : simple alert)
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const switchTo = (key) => {
    setTab(key);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLightbox = (images, startIndex = 0) => {
    if (!images || images.length === 0) return;
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevLightbox = () =>
    setLightboxIndex((i) =>
      lightboxImages.length
        ? (i - 1 + lightboxImages.length) % lightboxImages.length
        : 0
    );
  const nextLightbox = () =>
    setLightboxIndex((i) =>
      lightboxImages.length ? (i + 1) % lightboxImages.length : 0
    );

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(
      newsletterEmail
        ? `Merci ! Nous vous tiendrons informé(e) à : ${newsletterEmail}. (Fonctionnalité newsletter en cours de mise en place)`
        : "Merci ! Cette fonctionnalité newsletter sera bientôt activée."
    );
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          {/* Logo */}
          <button
            onClick={() => switchTo("accueil")}
            className="flex items-center rounded-md pr-1 sm:pr-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <img
              src="/logo-easytex.png"
              alt="EasyTex"
              className="h-14 w-auto sm:h-16 md:h-20"
              loading="eager"
            />
          </button>

          {/* NAV DESKTOP (centre) */}
          <nav className="hidden flex-1 justify-center gap-2 text-sm sm:flex">
            {[
              { key: "accueil", label: "Accueil" },
              { key: "catalogue", label: "Catalogue" },
              { key: "fournisseurs", label: "Devenir fournisseur" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => switchTo(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                  tab === item.key
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone droite : WA + menu hamburger */}
          <div className="flex items-center gap-2">
            {/* WhatsApp desktop (bleu) */}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:inline-flex"
            >
              WhatsApp
            </a>

            {/* WhatsApp mobile (entre logo et hamburger) */}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:hidden"
            >
              WhatsApp
            </a>

            {/* Bouton hamburger mobile */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md border px-2 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:hidden"
            >
              <span className="sr-only">Ouvrir le menu</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {mobileNavOpen && (
          <div className="border-t bg-white sm:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2">
              {[
                { key: "accueil", label: "Accueil" },
                { key: "catalogue", label: "Catalogue" },
                { key: "fournisseurs", label: "Devenir fournisseur" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => switchTo(item.key)}
                  className={`w-full rounded-full px-4 py-2 text-left text-sm font-medium ${
                    tab === item.key
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* CONTENU */}
      {tab === "accueil" && (
        <HomeView
          onGoCatalogue={() => switchTo("catalogue")}
          onOpenSupplier={() => switchTo("fournisseurs")}
        />
      )}
      {tab === "catalogue" && (
        <CatalogView onOpenLightbox={openLightbox} />
      )}
      {tab === "fournisseurs" && <SupplierSignupView />}
      {tab === "faq" && <FaqView />}
      {tab === "cgu" && <CguView />}
      {tab === "privacy" && <PrivacyView />}

      {/* FOOTER */}
      <footer className="mt-10 w-full border-t bg-white">
        {/* Newsletter */}
        <div className="border-b bg-blue-50">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div>
              <div className="text-base font-semibold text-gray-900">
                Restez informés des nouveautés textile
              </div>
              <div className="text-sm text-gray-700">
                Recevez notre sélection de tissus et offres EasyTex (MVP en
                cours de déploiement).
              </div>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Adresse e-mail"
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              >
                Je m’abonne
              </button>
            </form>
          </div>
        </div>

        {/* Liens bas de page */}
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm text-gray-600 sm:flex-row">
          <div>© EasyTex 2025 – Tous droits réservés</div>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => switchTo("faq")}
              className="text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => switchTo("cgu")}
              className="text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              CGU
            </button>
            <button
              type="button"
              onClick={() => switchTo("privacy")}
              className="text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              Politique de confidentialité
            </button>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              Contact WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* BOUTON WHATSAPP FLOTTANT */}
      <a
        href={`https://wa.me/${WA_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        <span className="sr-only">Contacter EasyTex sur WhatsApp</span>
        <span className="text-xl">W</span>
      </a>

      {/* LIGHTBOX GLOBAL */}
      <Lightbox
        open={lightboxOpen}
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
        onSelect={setLightboxIndex}
      />
    </div>
  );
}
