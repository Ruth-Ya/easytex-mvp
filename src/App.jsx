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
   DONNÉES DÉMO
----------------------------------------------------------- */
const DEMO_SUPPLIERS = [
  { id: "s1", name: "Atelier Ndar Textile", city: "Saint-Louis", country: "Sénégal", whatsapp: "221771112233" },
  { id: "s2", name: "Tissages de Korhogo", city: "Korhogo", country: "Côte d’Ivoire", whatsapp: "2250501020304" },
  { id: "s3", name: "Wax & Co Abidjan", city: "Abidjan", country: "Côte d’Ivoire", whatsapp: "2250703040506" },
];

const DEMO_PRODUCTS = [
  { id: "p1", name: "Bazin Riche 1.8m", type: "Bazin", color: "Bleu roi", origin: "Sénégal", price: 8500, supplierId: "s1" },
  { id: "p2", name: "Pagne tissé (lot de 5)", type: "Tissé", color: "Multicolore", origin: "Côte d’Ivoire", price: 24000, supplierId: "s2" },
  { id: "p3", name: "Wax premium 6 yards", type: "Wax", color: "Rouge", origin: "Côte d’Ivoire", price: 19000, supplierId: "s3" },
  { id: "p4", name: "Indigo artisanal", type: "Indigo", color: "Indigo", origin: "Mali", price: 17500, supplierId: "s2" },
  { id: "p5", name: "Kente mix 6 yards", type: "Kente", color: "Jaune", origin: "Ghana", price: 28000, supplierId: "s3" },
];

/* -----------------------------------------------------------
   MODAUX
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
   CATALOGUE
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
    <section className="mx-auto max-w-6xl px-4">
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
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-400"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            {origins.map((o) => (
              <option key={o} value={o}>{o}</option>
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
   VUES
----------------------------------------------------------- */
function HomeView({ onGoCatalogue, onOpenSupplier }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* HERO */}
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
              onClick={onGoCatalogue}
              className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white hover:bg-brand-600"
            >
              Explorer le catalogue
            </button>

            <button
              onClick={onOpenSupplier}
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold ring-1 ring-brand-500 text-brand-600 hover:bg-brand-50"
            >
              Devenir fournisseur
            </button>
          </div>

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

      {/* STATS */}
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

      {/* COMMENT ÇA MARCHE */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <div className="font-semibold">1) Explorez</div>
            <p className="mt-1 text-sm text-gray-600">
              le catalogue et filtrez par type, couleur, pays.
            </p>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-semibold">2) Demandez un devis</div>
            <p className="mt-1 text-sm text-gray-600">
              en un clic via WhatsApp avec des détails auto-remplis.
            </p>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="font-semibold">3) Recevez & finalisez</div>
            <p className="mt-1 text-sm text-gray-600">
              Comparez les offres, choisissez et confirmez votre commande.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function CatalogView({ onQuote }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <Catalog
        products={DEMO_PRODUCTS}
        suppliers={DEMO_SUPPLIERS}
        onQuote={onQuote}
      />
    </div>
  );
}

function SuppliersView({ onCloseModal }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <section className="rounded-2xl border p-5">
        <h2 className="text-lg font-semibold">
          Vous vendez du textile ? Rejoignez EasyTex
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Créez une vitrine simple, recevez des demandes qualifiées et
          développez votre clientèle dans l’espace UEMOA.
        </p>
        <div className="mt-4">
          <SupplierSignup onClose={onCloseModal} />
        </div>
      </section>
    </div>
  );
}

/* -----------------------------------------------------------
   APP
----------------------------------------------------------- */
export default function App() {
  const [tab, setTab] = useState("accueil");
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [openSupplier, setOpenSupplier] = useState(false);

  // modales footer
