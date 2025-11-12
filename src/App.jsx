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

const WA_NUMBER = "221707546281"; // Mets ton numéro WhatsApp EasyTex

/* -----------------------------------------------------------
   DONNÉES DÉMO (tu pourras brancher un Google Sheet plus tard)
----------------------------------------------------------- */
const DEMO_SUPPLIERS = [
  { id: "s1", name: "Atelier Ndar Textile", city: "Saint-Louis", country: "Sénégal", whatsapp: "221771112233" },
  { id: "s2", name: "Tissages de Korhogo", city: "Korhogo", country: "Côte d’Ivoire", whatsapp: "2250501020304" },
  { id: "s3", name: "Wax & Co Abidjan", city: "Abidjan", country: "Côte d’Ivoire", whatsapp: "2250703040506" },
];

const DEMO_PRODUCTS = [
  {
    id: "p1",
    name: "Bazin Riche 1.8m",
    type: "Bazin",
    color: "Bleu roi",
    origin: "Sénégal",
    price: 8500,
    supplierId: "s1",
  },
  {
    id: "p2",
    name: "Pagne tissé (lot de 5)",
    type: "Tissé",
    color: "Multicolore",
    origin: "Côte d’Ivoire",
    price: 24000,
    supplierId: "s2",
  },
  {
    id: "p3",
    name: "Wax premium 6 yards",
    type: "Wax",
    color: "Rouge",
    origin: "Côte d’Ivoire",
    price: 19000,
    supplierId: "s3",
  },
  {
    id: "p4",
    name: "Indigo artisanal",
    type: "Indigo",
    color: "Indigo",
    origin: "Mali",
    price: 17500,
    supplierId: "s2",
  },
  {
    id: "p5",
    name: "Kente mix 6 yards",
    type: "Kente",
    color: "Jaune",
    origin: "Ghana",
    price: 28000,
    supplierId: "s3",
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
        {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
        <div>{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 font-medium ring-1 ring-gray-300 hover:bg-gray-50"
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
    `Bonjour EasyTex,\n\nJe souhaite un devis pour:\n- Produit: ${product.name}\n- Type: ${product.type}\n- Couleur: ${product.color}\n- Origine: ${product.origin}\n- Prix indicatif: ${formatPrice(product.price)}\n\nPrécisions (quantité, délais, livraison, etc.):\n`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  return (
    <Modal open={open} onClose={onClose} title="Demande de devis">
      <div className="space-y-2 text-sm text-gray-700">
        <div><span className="font-medium">Produit:</span> {product.name}</div>
        <div><span className="font-medium">Type:</span> {product.type}</div>
        <div><span className="font-medium">Couleur:</span> {product.color}</div>
        <div><span className="font-medium">Origine:</span> {product.origin}</div>
        <div><span className="font-medium">Prix indicatif:</span> {formatPrice(product.price)}</div>
      </div>

      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white hover:bg-brand-600"
      >
        Ouvrir WhatsApp et envoyer
      </a>
    </Modal>
  );
}

/* -----------------------------------------------------------
   FORMULAIRE FOURNISSEUR (simple)
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
          <label className="mb-1 block text-sm font-medium">Nom de l’entreprise</label>
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Ville</label>
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Pays</label>
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Numéro WhatsApp</label>
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
        className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white hover:bg-brand-600"
      >
        Envoyer ma demande
      </button>
    </form>
  );
}

/* -----------------------------------------------------------
   CATALOGUE (recherche + filtres simples)
----------------------------------------------------------- */
function Catalog({ products, suppliers, onQuote }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("Tous");
  const [origin, setOrigin] = useState("Toutes");

  const types = useMemo(
    () => ["Tous", ...Array.from(new Set(products.map((p) => p.type)))],
    [products]
  );
  const origins = useMemo(
    () => ["Toutes", ...Array.from(new Set(products.map((p) => p.origin)))],
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.type.toLowerCase().includes(q.toLowerCase()) ||
        p.color.toLowerCase().includes(q.toLowerCase()) ||
        p.origin.toLowerCase().includes(q.toLowerCase());
      const matchType = type === "Tous" || p.type === type;
      const matchOrigin = origin === "Toutes" || p.origin === origin;
      return matchQ && matchType && matchOrigin;
    });
  }, [products, q, type, origin]);

  const supplierById = useMemo(() => {
    const map = new Map();
    suppliers.forEach((s) => map.set(s.id, s));
    return map;
  }, [suppliers]);

  return (
    <section id="catalogue" className="mx-auto mt-10 max-w-6xl px-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Catalogue</h2>

        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Rechercher (nom, type, couleur, origine)"
            className="w-full min-w-[260px] flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            {origins.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const s = supplierById.get(p.supplierId);
          return (
            <div key={p.id} className="rounded-2xl border p-4">
              <div className="text-base font-semibold">{p.name}</div>
              <div className="mt-1 text-sm text-gray-600">
                {p.type} • {p.color} • {p.origin}
              </div>
              <div className="mt-3 text-lg font-extrabold">{formatPrice(p.price)}</div>

              {s && (
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">{s.name}</span> — {s.city}, {s.country}
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => onQuote(p)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-brand-500 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Demander un devis
                </button>

                {s && (
                  <a
                    href={`https://wa.me/${s.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold ring-1 ring-brand-500 text-brand-600 hover:bg-brand-50"
                  >
                    Contacter
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   APP PRINCIPALE
----------------------------------------------------------- */
export default function App() {
  const [tab, setTab] = useState("accueil");
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [openSupplier, setOpenSupplier] = useState(false);

  const goCatalogue = () => {
    setTab("catalogue");
    // scroll doux vers la section catalogue
    setTimeout(() => {
      document.querySelector("#catalogue")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Logo dans /public/logo-easytex.png */}
          <img
            src="/logo-easytex.png"
            alt="EasyTex logo"
            className="h-7 w-7 rounded-md"
          />
          <span className="text-lg font-bold">EasyTex</span>
        </div>

        <nav className="flex items-center gap-2">
          {[
            { key: "accueil", label: "Accueil" },
            { key: "catalogue", label: "Catalogue" },
            { key: "fournisseurs", label: "Fournisseurs" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                tab === item.key
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={() => setOpenSupplier(true)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Devenir fournisseur
          </button>
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* HERO — fond bleu clair + nouveau texte */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-50 p-6 md:p-12 border">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm ring-1 ring-gray-200">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
              EasyTex
            </span>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              Sourcing textile, simple et rapide.
            </h1>

            <p className="mt-4 text-gray-600 md:text-lg">
              Comparez les tissus, demandez un devis en un clic et échangez
              directement sur WhatsApp avec des fournisseurs vérifiés.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={goCatalogue}
                className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-600"
              >
                Explorer le catalogue
              </button>

              <button
                onClick={() => {
                  setTab("fournisseurs");
                  setOpenSupplier(true);
                }}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold ring-1 ring-brand-500 text-brand-600 hover:bg-brand-50"
              >
                Devenir fournisseur
              </button>
            </div>

            {/* Badges / atouts */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl bg-white/70 backdrop-blur border px-3 py-2 text-sm">
                <span className="font-medium">Fournisseurs vérifiés</span>
                <span className="text-gray-500"> — Qualité et confiance</span>
              </div>

              <div className="rounded-2xl bg-white/70 backdrop-blur border px-3 py-2 text-sm">
                <span className="font-medium">Expédition régionale</span>
                <span className="text-gray-500"> — UEMOA</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATISTIQUES */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <div className="text-3xl font-extrabold">100</div>
            <div className="text-gray-600">Tissus disponibles</div>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="text-3xl font-extrabold">UEMOA</div>
            <div className="text-gray-600">Zone desservie</div>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="text-3xl font-extrabold">24–48h</div>
            <div className="text-gray-600">Délai de réponse</div>
          </div>
        </section>

        {/* CATALOGUE */}
        {tab === "catalogue" && (
          <Catalog
            products={DEMO_PRODUCTS}
            suppliers={DEMO_SUPPLIERS}
            onQuote={(p) => setQuoteProduct(p)}
          />
        )}

        {/* SECTION FOURNISSEURS (texte + formulaire simple) */}
        {tab === "fournisseurs" && (
          <section id="fournisseurs" className="mt-10 rounded-2xl border p-5">
            <h2 className="text-lg font-semibold">
              Vous vendez du textile ? Rejoignez EasyTex
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Créez une vitrine simple, recevez des demandes qualifiées et
              développez votre clientèle dans l’espace UEMOA.
            </p>

            <div className="mt-4">
              <SupplierSignup onClose={() => setOpenSupplier(false)} />
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-10 w-full border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600">
          © EasyTex 2025 – Tous droits réservés
        </div>
      </footer>

      {/* MODAUX */}
      <QuoteModal
        open={!!quoteProduct}
        onClose={() => setQuoteProduct(null)}
        product={quoteProduct}
      />

      <Modal
        open={openSupplier}
        onClose={() => setOpenSupplier(false)}
        title="Devenir fournisseur"
      >
        <SupplierSignup onClose={() => setOpenSupplier(false)} />
      </Modal>
    </div>
  );
}

