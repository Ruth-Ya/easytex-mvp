// src/App.jsx
import React, { useState } from "react";

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
   DONNÉES DÉMO AVEC CATÉGORIES + (OPTION IMAGES)
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
  },
];

/* -----------------------------------------------------------
   LIGHTBOX / SLIDER POUR LES PHOTOS
----------------------------------------------------------- */

function Lightbox({ open, images, index, onClose, onPrev, onNext }) {
  if (!open || !images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      {/* clic en dehors pour fermer */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative flex h-full flex-col items-center justify-center px-4">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
        >
          ✕ Fermer
        </button>

        {/* Image */}
        <div className="relative">
          <img
            src={images[index]}
            alt=""
            className="max-h-[70vh] max-w-[90vw] rounded-xl bg-white object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/logo-easytex.png";
            }}
          />
        </div>

        {/* Contrôles */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-white"
            >
              ← Précédente
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-white"
            >
              Suivante →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   SECTIONS
----------------------------------------------------------- */

function HomeView({ onGoCatalogue, onOpenSupplier }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border bg-blue-50 p-6 md:p-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm ring-1 ring-gray-200">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
            EasyTex
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Sourcing textile, simple et rapide.
          </h1>

          <p className="mt-4 text-gray-700 md:text-lg">
            EasyTex connecte les acheteurs de textile aux meilleurs
            fournisseurs de la zone UEMOA, directement sur WhatsApp.
            Comparez les tissus, demandez un devis en un clic et échangez
            avec des fournisseurs vérifiés.
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

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border bg-white/70 px-3 py-2 text-sm backdrop-blur">
              <span className="font-medium text-gray-900">
                Fournisseurs vérifiés
              </span>
              <span className="text-gray-600"> — Qualité et confiance</span>
            </div>
            <div className="rounded-2xl border bg-white/70 px-3 py-2 text-sm backdrop-blur">
              <span className="font-medium text-gray-900">
                Expédition régionale
              </span>
              <span className="text-gray-600"> — UEMOA</span>
            </div>
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
    </div>
  );
}

/* -----------------------------------------------------------
   CATALOGUE + FILTRES + IMAGES CLIQUABLES (LIGHTBOX)
----------------------------------------------------------- */

function CatalogView({ onOpenLightbox }) {
  const [material, setMaterial] = useState("Tous");
  const [weight, setWeight] = useState("Tous");
  const [pattern, setPattern] = useState("Tous");

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
    const mOk = material === "Tous" || p.material === material;
    const wOk = weight === "Tous" || p.weight === weight;
    const pOk = pattern === "Tous" || p.pattern === pattern;
    return mOk && wOk && pOk;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <section id="catalogue">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Catalogue de tissus
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Filtrez les tissus par matière, poids et motif pour trouver la
          référence la plus adaptée à votre projet. Les prix sont indicatifs
          et peuvent varier selon la quantité, la finition et les délais.
        </p>

        {/* FILTRES */}
        <div className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border bg-gray-50 p-4 md:grid-cols-3">
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
            relâcher un critère (par exemple la matière ou le poids).
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
                  {/* Image cliquable */}
                  {hasImages && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(p.images, 0)}
                      className="mb-3 block w-full overflow-hidden rounded-xl"
                      aria-label={`Voir les photos de ${p.name}`}
                    >
                      <img
                        src={firstImage}
                        alt={p.name}
                        className="h-40 w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/logo-easytex.png";
                        }}
                      />
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
   APP PRINCIPALE (HEADER MOBILE + LIGHTBOX)
----------------------------------------------------------- */

export default function App() {
  const [tab, setTab] = useState("accueil");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Lightbox global
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
    className="h-10 w-auto sm:h-12 md:h-14"
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

            {/* WhatsApp mobile (dans le header, entre logo et hamburger) */}
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

      <footer className="mt-10 w-full border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600">
          © EasyTex 2025 – Tous droits réservés
        </div>
      </footer>

      {/* LIGHTBOX GLOBAL */}
      <Lightbox
        open={lightboxOpen}
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
      />
    </div>
  );
}
