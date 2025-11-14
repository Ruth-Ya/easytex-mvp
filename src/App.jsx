// src/App.jsx
import React, { useMemo, useState } from "react";

/* -----------------------------------------------------------
   UTILITAIRES
----------------------------------------------------------- */
const formatPrice = (n) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(n);

// Ton numéro WhatsApp (format international sans +)
const WA_NUMBER = "221707546281";

/* -----------------------------------------------------------
   DONNÉES DÉMO
   (Ajout: usage, material, weight, aspect pour les filtres)
----------------------------------------------------------- */
const DEMO_SUPPLIERS = [
  { id: "s1", name: "Atelier Ndar Textile", city: "Saint-Louis", country: "Sénégal", whatsapp: "221771112233" },
  { id: "s2", name: "Tissages de Korhogo", city: "Korhogo", country: "Côte d’Ivoire", whatsapp: "2250501020304" },
  { id: "s3", name: "Wax & Co Abidjan", city: "Abidjan", country: "Côte d’Ivoire", whatsapp: "2250703040506" },
];

const DEMO_PRODUCTS = [
  {
    id: "p1",
    name: "Bazin riche 1.8m",
    type: "Bazin",
    color: "Bleu roi",
    origin: "Sénégal",
    price: 8500,
    supplierId: "s1",
    images: ["/p1-1.jpg", "/p1-2.jpg"],
    usage: "Tissus spécifiques et traditionnels",
    material: "Coton",
    weight: "Lourd",
    aspect: "Texturé",
  },
  {
    id: "p2",
    name: "Pagne tissé (lot de 5)",
    type: "Pagne tissé",
    color: "Multicolore",
    origin: "Côte d’Ivoire",
    price: 24000,
    supplierId: "s2",
    images: ["/p2-1.jpg", "/p2-2.jpg"],
    usage: "Tissus spécifiques et traditionnels",
    material: "Coton",
    weight: "Moyen",
    aspect: "Texturé",
  },
  {
    id: "p3",
    name: "Wax premium 6 yards",
    type: "Wax",
    color: "Rouge",
    origin: "Côte d’Ivoire",
    price: 19000,
    supplierId: "s3",
    images: ["/p3-1.jpg", "/p3-2.jpg"],
    usage: "Tissus spécifiques et traditionnels",
    material: "Coton",
    weight: "Moyen",
    aspect: "Wax",
  },
  {
    id: "p4",
    name: "Popeline unie 150 cm",
    type: "Popeline",
    color: "Blanc",
    origin: "Sénégal",
    price: 6500,
    supplierId: "s1",
    images: ["/p4-1.jpg", "/p4-2.jpg"],
    usage: "Tissus habillement",
    material: "Coton",
    weight: "Léger",
    aspect: "Uni",
  },
  {
    id: "p5",
    name: "Gabardine workwear",
    type: "Gabardine",
    color: "Marine",
    origin: "Sénégal",
    price: 12000,
    supplierId: "s1",
    images: ["/p5-1.jpg", "/p5-2.jpg"],
    usage: "Tissus habillement",
    material: "Mélange",
    weight: "Lourd",
    aspect: "Uni",
  },
  {
    id: "p6",
    name: "Nid d’abeille éponge",
    type: "Éponge",
    color: "Blanc cassé",
    origin: "Turquie",
    price: 10500,
    supplierId: "s2",
    images: ["/p6-1.jpg", "/p6-2.jpg"],
    usage: "Tissus Maison et Linge",
    material: "Coton",
    weight: "Lourd",
    aspect: "Texturé",
  },
  {
    id: "p7",
    name: "Toile d’ameublement outdoor",
    type: "Toile",
    color: "Beige",
    origin: "Chine",
    price: 15500,
    supplierId: "s3",
    images: ["/p7-1.jpg", "/p7-2.jpg"],
    usage: "Tissus Ameublement et Décoration",
    material: "Synthétique",
    weight: "Lourd",
    aspect: "Uni",
  },
];

/* -----------------------------------------------------------
   MODAUX GÉNÉRIQUES
----------------------------------------------------------- */
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        {title && <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>}
        <div>{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 font-medium ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

function QuoteModal({ open, onClose, product }) {
  if (!open || !product) return null;
  const waText = encodeURIComponent(
    `Bonjour EasyTex,\n\nJe souhaite un devis pour:\n- Produit: ${product.name}\n- Usage: ${product.usage}\n- Type: ${product.type}\n- Matière: ${product.material}\n- Poids: ${product.weight}\n- Aspect: ${product.aspect}\n- Origine: ${product.origin}\n- Prix indicatif: ${formatPrice(
      product.price
    )}\n\nPrécisions (quantité, délais, livraison, etc.):\n`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  return (
    <Modal open={open} onClose={onClose} title="Demande de devis">
      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Produit:</span> {product.name}
        </div>
        <div>
          <span className="font-medium">Usage:</span> {product.usage}
        </div>
        <div>
          <span className="font-medium">Matière:</span> {product.material}
        </div>
        <div>
          <span className="font-medium">Poids:</span> {product.weight}
        </div>
        <div>
          <span className="font-medium">Aspect:</span> {product.aspect}
        </div>
        <div>
          <span className="font-medium">Origine:</span> {product.origin}
        </div>
        <div>
          <span className="font-medium">Prix indicatif:</span> {formatPrice(product.price)}
        </div>
      </div>

      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400"
      >
        Ouvrir WhatsApp et envoyer
      </a>
    </Modal>
  );
}

/* -----------------------------------------------------------
   LIGHTBOX (agrandissement + navigation)
----------------------------------------------------------- */
function Lightbox({ open, images, index, onClose, onPrev, onNext }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
          >
            ✕ Fermer
          </button>

          <img src={images[index]} alt="" className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain bg-white" />

          <div className="mt-4 flex justify-center gap-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="rounded-full bg-white/90 px-4 py-2 shadow hover:bg-white"
            >
              ← Précédente
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="rounded-full bg-white/90 px-4 py-2 shadow hover:bg-white"
            >
              Suivante →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   FORMULAIRE FOURNISSEUR
----------------------------------------------------------- */
function SupplierSignup({ onClose }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const submit = (e) => {
    e.preventDefault();
    alert(
      `Merci !\n\nNom: ${name}\nVille: ${city}\nPays: ${country}\nWhatsApp: ${whatsapp}\n\nL’équipe EasyTex vous recontactera.`
    );
    onClose?.();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">Nom de l’entreprise</label>
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">Ville</label>
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">Pays</label>
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-900">Numéro WhatsApp</label>
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400"
      >
        Envoyer ma demande
      </button>
    </form>
  );
}

/* -----------------------------------------------------------
   CATALOGUE avec catégories + filtres
----------------------------------------------------------- */

const USAGE_OPTIONS = [
  "Tissus habillement",
  "Tissus Maison et Linge",
  "Tissus Ameublement et Décoration",
  "Tissus spécifiques et traditionnels",
];

function Catalog({ products, suppliers, onQuote, openLightbox }) {
  const [q, setQ] = useState("");
  const [usage, setUsage] = useState("Tous les usages");
  const [material, setMaterial] = useState("Toutes les matières");
  const [weight, setWeight] = useState("Tous les poids");
  const [aspect, setAspect] = useState("Tous les aspects");

  const usages = useMemo(
    () => ["Tous les usages", ...USAGE_OPTIONS.filter((u) => products.some((p) => p.usage === u))],
    [products]
  );
  const materials = useMemo(
    () => [
      "Toutes les matières",
      ...Array.from(new Set(products.map((p) => p.material))).filter(Boolean),
    ],
    [products]
  );
  const weights = useMemo(
    () => ["Tous les poids", ...Array.from(new Set(products.map((p) => p.weight))).filter(Boolean)],
    [products]
  );
  const aspects = useMemo(
    () => ["Tous les aspects", ...Array.from(new Set(products.map((p) => p.aspect))).filter(Boolean)],
    [products]
  );

  const supplierById = useMemo(() => {
    const map = new Map();
    suppliers.forEach((s) => map.set(s.id, s));
    return map;
  }, [suppliers]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const search = q.toLowerCase();
      const matchQ =
        !search ||
        p.name.toLowerCase().includes(search) ||
        p.type.toLowerCase().includes(search) ||
        p.color.toLowerCase().includes(search) ||
        p.origin.toLowerCase().includes(search) ||
        (p.usage && p.usage.toLowerCase().includes(search));

      const matchUsage = usage === "Tous les usages" || p.usage === usage;
      const matchMaterial = material === "Toutes les matières" || p.material === material;
      const matchWeight = weight === "Tous les poids" || p.weight === weight;
      const matchAspect = aspect === "Tous les aspects" || p.aspect === aspect;

      return matchQ && matchUsage && matchMaterial && matchWeight && matchAspect;
    });
  }, [products, q, usage, material, weight, aspect]);

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Catalogue EasyTex</h2>

        <div className="flex w-full flex-wrap gap-3 sm:justify-end">
          <input
            placeholder="Rechercher (nom, type, couleur, usage, origine)"
            className="w-full min-w-[260px] flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Filtres avancés */}
      <div className="mt-4 flex flex-wrap gap-3">
        <select
          className="min-w-[180px] flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
        >
          {usages.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <select
          className="min-w-[160px] flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          {materials.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          className="min-w-[140px] flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        >
          {weights.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>

        <select
          className="min-w-[160px] flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-400"
          value={aspect}
          onChange={(e) => setAspect(e.target.value)}
        >
          {aspects.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Résultats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const s = supplierById.get(p.supplierId);
          const firstImg = p.images?.[0];

          return (
            <div key={p.id} className="flex flex-col rounded-2xl border p-4 transition hover:shadow-sm">
              {/* image cliquable */}
              {firstImg && (
                <button
                  className="block w-full overflow-hidden rounded-xl"
                  onClick={() => openLightbox(p.images, 0)}
                  aria-label={`Voir ${p.name}`}
                >
                  <img
                    src={firstImg}
                    alt={p.name}
                    className="h-44 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/logo-easytex.png";
                    }}
                  />
                </button>
              )}

              {/* Usage */}
              {p.usage && (
                <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {p.usage}
                </div>
              )}

              <div className="mt-2 text-base font-semibold text-gray-900">{p.name}</div>
              <div className="mt-1 text-xs text-gray-600">
                {p.type} • {p.material} • {p.weight} • {p.aspect}
              </div>
              <div className="mt-3 text-lg font-extrabold text-gray-900">{formatPrice(p.price)}</div>

              {s && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">{s.name}</span> — {s.city}, {s.country}
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => onQuote(p)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-brand-500 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400"
                >
                  Demander un devis
                </button>
                {s && (
                  <a
                    href={`https://wa.me/${s.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-brand-600 ring-1 ring-brand-500 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400"
                  >
                    Contacter
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">
          Aucun tissu ne correspond à votre recherche pour le moment. Essayez d’élargir les filtres ou contactez EasyTex
          directement via WhatsApp.
        </p>
      )}
    </section>
  );
}

/* -----------------------------------------------------------
   VUES (Accueil / Catalogue / Fournisseurs)
----------------------------------------------------------- */

function HomeView({ onGoCatalogue, onOpenSupplier }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border bg-brand-50 p-6 md:p-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm ring-1 ring-gray-200">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
            EasyTex
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Sourcing textile, simple et rapide.
          </h1>

          <p className="mt-4 text-gray-700 md:text-lg">
            EasyTex connecte les acheteurs de textile aux meilleurs fournisseurs de la zone UEMOA, directement sur
            WhatsApp. Comparez les tissus, demandez un devis en un clic et échangez avec des fournisseurs vérifiés.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onGoCatalogue}
              className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400"
            >
              Explorer le catalogue
            </button>

            <button
              onClick={onOpenSupplier}
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold ring-1 ring-brand-500 text-brand-600 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400"
            >
              Devenir fournisseur
            </button>
          </div>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border bg-white/70 px-3 py-2 text-sm backdrop-blur">
              <span className="font-medium text-gray-900">Fournisseurs vérifiés</span>
              <span className="text-gray-600"> — Qualité et confiance</span>
            </div>
            <div className="rounded-2xl border bg-white/70 px-3 py-2 text-sm backdrop-blur">
              <span className="font-medium text-gray-900">Expédition régionale</span>
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
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <div className="font-semibold text-gray-900">1) Explorez</div>
            <p className="mt-1 text-sm text-gray-600">Filtrez par usage, matière, poids ou aspect.</p>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-semibold text-gray-900">2) Demandez un devis</div>
            <p className="mt-1 text-sm text-gray-600">En un clic via WhatsApp, directement au fournisseur.</p>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-semibold text-gray-900">3) Recevez & finalisez</div>
            <p className="mt-1 text-sm text-gray-600">Comparez les offres et confirmez votre commande.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CatalogView({ onQuote, openLightbox }) {
  return (
    <div id="catalogue" className="mx-auto max-w-6xl px-4 pb-16">
      <Catalog products={DEMO_PRODUCTS} suppliers={DEMO_SUPPLIERS} onQuote={onQuote} openLightbox={openLightbox} />
    </div>
  );
}

function SuppliersView({ onCloseModal }) {
  return (
    <div id="fournisseurs" className="mx-auto max-w-6xl px-4 pb-16">
      <section className="rounded-2xl border p-5">
        <h2 className="text-lg font-semibold text-gray-900">Vous vendez du textile ? Rejoignez EasyTex</h2>
        <p className="mt-1 text-sm text-gray-700">
          Créez une vitrine simple, recevez des demandes qualifiées et développez votre clientèle dans l’espace UEMOA.
        </p>
        <div className="mt-4">
          <SupplierSignup onClose={onCloseModal} />
        </div>
      </section>
    </div>
  );
}

/* -----------------------------------------------------------
   APP PRINCIPALE
----------------------------------------------------------- */
export default function App() {
  const [tab, setTab] = useState("accueil");
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [openSupplier, setOpenSupplier] = useState(false);

  // Mentions légales / politique / CGU
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openImprint, setOpenImprint] = useState(false);

  // Lightbox global
  const [lbOpen, setLbOpen] = useState(false);
  const [lbImages, setLbImages] = useState([]);
  const [lbIndex, setLbIndex] = useState(0);

  const openLightbox = (images, index = 0) => {
    setLbImages(images || []);
    setLbIndex(index);
    setLbOpen(true);
  };
  const closeLightbox = () => setLbOpen(false);
  const prevLightbox = () => setLbIndex((i) => (i - 1 + lbImages.length) % lbImages.length);
  const nextLightbox = () => setLbIndex((i) => (i + 1) % lbImages.length);

  const switchTo = (key) => {
    setTab(key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            switchTo("accueil");
          }}
          className="flex items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
        >
          {/* Logo : utiliser ici la version icône seule */}
          <img src="/logo-easytex.png" alt="Logo EasyTex" className="h-11 w-11 rounded-md" loading="eager" />
          <span className="text-lg font-bold text-gray-900">EasyTex</span>
        </a>

        <nav className="flex items-center gap-2">
          {[
            { key: "accueil", label: "Accueil" },
            { key: "catalogue", label: "Catalogue" },
            { key: "fournisseurs", label: "Devenir fournisseur" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => switchTo(item.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 ${
                tab === item.key ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* VUE ACTIVE */}
      {tab === "accueil" && (
        <HomeView
          onGoCatalogue={() => switchTo("catalogue")}
          onOpenSupplier={() => setOpenSupplier(true)}
        />
      )}

      {tab === "catalogue" && (
        <CatalogView
          onQuote={(p) => setQuoteProduct(p)}
          openLightbox={openLightbox}
        />
      )}

      {tab === "fournisseurs" && (
        <SuppliersView onCloseModal={() => setOpenSupplier(false)} />
      )}

      {/* FOOTER + Mentions */}
      <footer className="mt-10 w-full border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600">
          <div>© EasyTex 2025 – Tous droits réservés</div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-gray-500">
            <button
              onClick={() => setOpenPrivacy(true)}
              className="rounded underline-offset-2 hover:text-gray-700 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
            >
              Confidentialité
            </button>
            <span>•</span>
            <button
              onClick={() => setOpenTerms(true)}
              className="rounded underline-offset-2 hover:text-gray-700 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
            >
              CGU
            </button>
            <span>•</span>
            <button
              onClick={() => setOpenImprint(true)}
              className="rounded underline-offset-2 hover:text-gray-700 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
            >
              Mentions légales
            </button>
          </div>
        </div>
      </footer>

      {/* MODAUX GLOBAUX */}
      <QuoteModal open={!!quoteProduct} onClose={() => setQuoteProduct(null)} product={quoteProduct} />

      <Modal open={openSupplier} onClose={() => setOpenSupplier(false)} title="Devenir fournisseur">
        <SupplierSignup onClose={() => setOpenSupplier(false)} />
      </Modal>

      {/* Mentions / Politique / CGU */}
      <Modal open={openPrivacy} onClose={() => setOpenPrivacy(false)} title="Politique de confidentialité">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            EasyTex respecte votre vie privée. Les données collectées (formulaires, demandes de devis)
            servent uniquement au traitement de vos sollicitations et à l’amélioration du service.
          </p>
          <ul className="list-disc pl-5">
            <li>Base légale : intérêt légitime et exécution pré-contractuelle.</li>
            <li>Conservation : durée nécessaire au traitement, complétée par les obligations légales.</li>
            <li>Droits : accès, rectification, effacement, opposition, portabilité.</li>
            <li>Contact : privacy@easytex.sn</li>
          </ul>
        </div>
      </Modal>

      <Modal open={openTerms} onClose={() => setOpenTerms(false)} title="Conditions Générales d’Utilisation (CGU)">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            EasyTex met en relation acheteurs et fournisseurs de textiles dans l’espace UEMOA.
            L’usage de la plateforme implique l’acceptation des présentes CGU.
          </p>
          <ul className="list-disc pl-5">
            <li>Le contenu du catalogue a une valeur indicative (prix, disponibilités, caractéristiques).</li>
            <li>Les échanges commerciaux se finalisent directement entre acheteurs et fournisseurs.</li>
            <li>Les utilisateurs s’engagent à respecter les lois applicables (douanes, propriété intellectuelle, etc.).</li>
            <li>Tout usage frauduleux de la plateforme est interdit.</li>
          </ul>
        </div>
      </Modal>

      <Modal open={openImprint} onClose={() => setOpenImprint(false)} title="Mentions légales">
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-medium">Éditeur :</span> EasyTex (raison sociale à compléter).
          </p>
          <p>
            <span className="font-medium">Siège :</span> Adresse à compléter, Sénégal.
          </p>
          <p>
            <span className="font-medium">Contact :</span> contact@easytex.sn — +221 …
          </p>
          <p>
            <span className="font-medium">Hébergement :</span> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
            USA.
          </p>
          <p>Pour toute notification légale : legal@easytex.sn</p>
        </div>
      </Modal>

      {/* LIGHTBOX globale */}
      <Lightbox
        open={lbOpen}
        images={lbImages}
        index={lbIndex}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
      />
    </div>
  );
}
