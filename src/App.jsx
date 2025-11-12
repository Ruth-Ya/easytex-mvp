import React, { useState } from "react";

/* =========
   Paramètres
   ========= */
const BRAND_BLUE = "#2E7FCD"; // même nuance que le favicon
const WA_NUMBER = "221707546281"; // WhatsApp EasyTex

/* =========
   Données démo
   ========= */
const DEMO_SUPPLIERS = [
  { id: "s1", name: "Atelier Ndar Textile", city: "Saint-Louis", country: "Sénégal", whatsapp: "221771112233" },
  { id: "s2", name: "Tissages de Korhogo", city: "Korhogo", country: "Côte d’Ivoire", whatsapp: "2250501202304" },
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
    images: ["/p1-1.jpg", "/p1-2.jpg"],
  },
  {
    id: "p2",
    name: "Pagnes tissés (lot de 5)",
    type: "Tissé",
    color: "Multicolore",
    origin: "Côte d’Ivoire",
    price: 24000,
    supplierId: "s2",
    images: ["/p2-1.jpg", "/p2-2.jpg"],
  },
  {
    id: "p3",
    name: "Wax premium 6 yards",
    type: "Wax",
    color: "Rouge",
    origin: "Côte d’Ivoire",
    price: 10000,
    supplierId: "s3",
    images: ["/p3-1.jpg", "/p3-2.jpg"],
  },
  {
    id: "p4",
    name: "Indigo artisanal",
    type: "Indigo",
    color: "Indigo",
    origin: "Mali",
    price: 17500,
    supplierId: "s2",
    images: ["/p4-1.jpg", "/p4-2.jpg"],
  },
  {
    id: "p5",
    name: "Kente mix 6 yards",
    type: "Kente",
    color: "Jaune",
    origin: "Ghana",
    price: 28000,
    supplierId: "s3",
    images: ["/p5-1.jpg", "/p5-2.jpg"],
  },
];

/* =========
   Petits utilitaires
   ========= */
const formatPrice = (n) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", maximumFractionDigits: 0 }).format(n);

const findSupplier = (id) => DEMO_SUPPLIERS.find((s) => s.id === id);

/* =========
   Composants génériques (Modal + Lightbox)
   ========= */
function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={`relative bg-white rounded-2xl shadow-xl p-6 mx-4 ${
          wide ? "w-[min(100%,900px)]" : "w-[min(100%,560px)]"
        }`}
      >
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
        >
          Fermer
        </button>
        {children}
      </div>
    </div>
  );
}

/* >>> SEULE MODIF : Lightbox avec bouton ✕ Fermer visible <<< */
function Lightbox({ open, images, index, onClose, onPrev, onNext }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      {/* close overlay (clic en dehors) */}
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative flex flex-col items-center">
          {/* Bouton Fermer en haut à droite du visuel */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white"
          >
            ✕ Fermer
          </button>

          {/* Image principale */}
          <img
            src={images[index]}
            alt=""
            className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain bg-white"
          />

          {/* Boutons navigation */}
          <div className="mt-4 flex justify-center gap-6">
            <button
              onClick={(e)=>{e.stopPropagation(); onPrev();}}
              className="rounded-full bg-white/90 px-4 py-2 shadow hover:bg-white"
            >
              ← Précédente
            </button>
            <button
              onClick={(e)=>{e.stopPropagation(); onNext();}}
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

/* =========
   Cartes produits (galerie + CTA)
   ========= */
function ProductCard({ product, onQuote, openLightbox }) {
  const [mainIdx, setMainIdx] = useState(0);
  const supplier = findSupplier(product.supplierId);

  return (
    <div className="rounded-2xl border bg-white p-3 hover:shadow-md transition">
      {/* Image principale */}
      <button
        className="block w-full overflow-hidden rounded-xl"
        onClick={() => openLightbox(product.images, mainIdx)}
        aria-label={`Voir ${product.name}`}
      >
        <img
          src={product.images?.[mainIdx]}
          alt={product.name}
          className="block w-full h-48 object-cover"
        />
      </button>

      {/* Vignettes */}
      <div className="mt-2 flex gap-2">
        {product.images.map((src, i) => (
          <button
            key={src}
            onClick={() => setMainIdx(i)}
            className={`h-14 w-20 overflow-hidden rounded-lg border ${
              i === mainIdx ? "ring-2 ring-[var(--brand-blue)] ring-offset-2" : ""
            }`}
            style={{ ["--brand-blue"]: BRAND_BLUE }}
            aria-label={`Changer image ${i + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Infos */}
      <div className="mt-3 space-y-1">
        <div className="text-sm text-gray-500">{product.type} · {product.color} · {product.origin}</div>
        <div className="font-semibold">{product.name}</div>
        <div className="text-[15px]">{formatPrice(product.price)} / pièce</div>
        <div className="text-sm text-gray-500">
          Fournisseur : <span className="font-medium">{supplier?.name}</span> · {supplier?.city}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onQuote(product)}
          className="flex-1 rounded-xl bg-[var(--brand-blue)] px-3 py-2 text-white hover:opacity-90"
          style={{ ["--brand-blue"]: BRAND_BLUE }}
        >
          Demander un devis
        </button>
      </div>
    </div>
  );
}

/* =========
   Modales fonctionnelles
   ========= */
function QuoteModal({ open, product, onClose }) {
  if (!open || !product) return null;

  const text =
    `Bonjour EasyTex,%0A%0AJe souhaite un devis pour:%0A` +
    `• ${product.name}%0A` +
    `• Type: ${product.type}%0A` +
    `• Couleur: ${product.color}%0A` +
    `• Origine: ${product.origin}%0A%0A` +
    `Quantité souhaitée: ___ %0A` +
    `Délai: ___ %0A` +
    `Lieu de livraison (UEMOA): ___%0A%0A` +
    `Merci !`;

  const waLink = `https://wa.me/${WA_NUMBER}?text=${text}`;

  return (
    <Modal open={open} onClose={onClose} title="Demande de devis">
      <div className="space-y-3">
        <div className="rounded-xl border p-3">
          <div className="text-sm text-gray-500">Produit</div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-gray-500">{product.type} · {product.color} · {product.origin}</div>
          <div className="text-sm mt-1">Prix indicatif : {formatPrice(product.price)} / pièce</div>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
        >
          Ouvrir WhatsApp et envoyer
        </a>
      </div>
    </Modal>
  );
}

function SupplierSignup({ onClose }) {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      alert("Merci ! Votre demande a bien été envoyée. Nous revenons vers vous très vite.");
      onClose?.();
    }, 900);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid">
          <span className="text-sm text-gray-600">Nom de l’entreprise</span>
          <input className="rounded-xl border px-3 py-2" required placeholder="Ex: Atelier Ndar Textile" />
        </label>
        <label className="grid">
          <span className="text-sm text-gray-600">WhatsApp</span>
          <input className="rounded-xl border px-3 py-2" required placeholder="+221…" />
        </label>
        <label className="grid">
          <span className="text-sm text-gray-600">Ville</span>
          <input className="rounded-xl border px-3 py-2" required placeholder="Dakar / Abidjan / Korhogo…" />
        </label>
        <label className="grid">
          <span className="text-sm text-gray-600">Pays (UEMOA)</span>
          <input className="rounded-xl border px-3 py-2" required placeholder="Sénégal, Côte d’Ivoire, …" />
        </label>
      </div>

      <label className="grid">
        <span className="text-sm text-gray-600">Produits (type, couleurs, métrages…)</span>
        <textarea className="rounded-xl border px-3 py-2" rows={3} placeholder="Décrivez vos tissus…"></textarea>
      </label>

      <button
        type="submit"
        disabled={sending}
        className="rounded-xl bg-[var(--brand-blue)] px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-60"
        style={{ ["--brand-blue"]: BRAND_BLUE }}
      >
        {sending ? "Envoi…" : "Envoyer la demande"}
      </button>
    </form>
  );
}

/* =========
   Footer + mentions légales (dans ce fichier)
   ========= */
function LegalFooter() {
  const [openPrivacy, setOpenPrivacy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openImprint, setOpenImprint] = useState(false);

  return (
    <>
      <footer className="mt-10 w-full border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600">
          <div>© EasyTex 2025 – Tous droits réservés</div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-gray-500">
            <button onClick={() => setOpenPrivacy(true)} className="hover:underline">Confidentialité</button>
            <button onClick={() => setOpenTerms(true)} className="hover:underline">CGU</button>
            <button onClick={() => setOpenImprint(true)} className="hover:underline">Mentions légales</button>
          </div>
        </div>
      </footer>

      <Modal open={openPrivacy} onClose={() => setOpenPrivacy(false)} title="Politique de confidentialité">
        <p className="text-sm leading-relaxed text-gray-700">
          Nous collectons les informations strictement nécessaires pour traiter vos demandes de devis
          et vos inscriptions fournisseurs (coordonnées, détails produits). Vos données ne sont ni
          revendues ni partagées hors du traitement opérationnel EasyTex.
        </p>
      </Modal>

      <Modal open={openTerms} onClose={() => setOpenTerms(false)} title="Conditions générales d’utilisation">
        <p className="text-sm leading-relaxed text-gray-700">
          EasyTex met en relation acheteurs et fournisseurs de tissus dans l’espace UEMOA.
          Les prix affichés sont indicatifs. Les ventes, délais et livraisons sont convenus
          directement entre les parties via WhatsApp.
        </p>
      </Modal>

      <Modal open={openImprint} onClose={() => setOpenImprint(false)} title="Mentions légales">
        <p className="text-sm leading-relaxed text-gray-700">
          Éditeur : EasyTex. Contact : WhatsApp {WA_NUMBER}. Hébergement : Vercel, Inc.
        </p>
      </Modal>
    </>
  );
}

/* =========
   Sections
   ========= */
function Hero({ onBecomeSupplier, goCatalogue }) {
  return (
    <section
      className="rounded-3xl border p-6 md:p-12"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f7fbff 40%, #eef6ff 100%)",
      }}
    >
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm shadow">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: BRAND_BLUE }}
        />
        EasyTex
      </div>

      <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
        Sourcing textile, simple et rapide.
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-gray-600">
        Comparez les tissus, demandez un devis en un clic et échangez directement sur WhatsApp
        avec des fournisseurs vérifiés.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={goCatalogue}
          className="rounded-xl bg-black px-4 py-2 font-medium text-white hover:opacity-90"
        >
          Explorer le catalogue
        </button>
        <button
          onClick={onBecomeSupplier}
          className="rounded-xl border px-4 py-2 font-medium hover:bg-gray-50"
        >
          Devenir fournisseur
        </button>
      </div>

      {/* Badges */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border px-4 py-3">
          <div className="font-medium">Fournisseurs vérifiés</div>
          <div className="text-sm text-gray-500">Qualité et confiance</div>
        </div>
        <div className="rounded-2xl border px-4 py-3">
          <div className="font-medium">Expédition régionale</div>
          <div className="text-sm text-gray-500">UEMOA</div>
        </div>
        <div className="rounded-2xl border px-4 py-3">
          <div className="font-medium">Support WhatsApp</div>
          <div className="text-sm text-gray-500">Réponse 24–48h</div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border p-5 text-center">
        <div className="text-3xl font-extrabold tracking-tight">100</div>
        <div className="mt-1 text-sm text-gray-600">Tissus disponibles</div>
      </div>
      <div className="rounded-2xl border p-5 text-center">
        <div className="text-3xl font-extrabold tracking-tight">UEMOA</div>
        <div className="mt-1 text-sm text-gray-600">Zone desservie</div>
      </div>
      <div className="rounded-2xl border p-5 text-center">
        <div className="text-3xl font-extrabold tracking-tight">24–48h</div>
        <div className="mt-1 text-sm text-gray-600">Délai de réponse</div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mt-10">
      <h3 className="mb-4 text-lg font-semibold">Comment ça marche ?</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-5">
          <div className="font-medium">1) Explorez</div>
          <p className="mt-1 text-sm text-gray-600">
            Parcourez le catalogue et filtrez par type, couleur, pays.
          </p>
        </div>
        <div className="rounded-2xl border p-5">
          <div className="font-medium">2) Demandez un devis</div>
          <p className="mt-1 text-sm text-gray-600">
            En un clic via WhatsApp avec des détails auto-remplis.
          </p>
        </div>
        <div className="rounded-2xl border p-5">
          <div className="font-medium">3) Recevez des offres</div>
          <p className="mt-1 text-sm text-gray-600">
            Comparez, négociez et finalisez votre commande.
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========
   Pages Catalogue / Fournisseurs
   ========= */
function Catalogue({ products, onQuote, openLightbox }) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-end justify-between">
        <h3 className="text-lg font-semibold">Catalogue</h3>
        <div className="text-sm text-gray-500">{products.length} références</div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onQuote={onQuote}
            openLightbox={openLightbox}
          />
        ))}
      </div>
    </section>
  );
}

function SuppliersSection({ onClose }) {
  return (
    <section className="mt-8 rounded-2xl border p-5">
      <h3 className="text-lg font-semibold">Vous vendez du textile ? Rejoignez EasyTex</h3>
      <p className="mt-1 text-gray-600">
        Créez une vitrine simple, recevez des demandes qualifiées et développez votre clientèle régionale.
      </p>
      <div className="mt-4">
        <SupplierSignup onClose={onClose} />
      </div>
    </section>
  );
}

/* =========
   App
   ========= */
export default function App() {
  const [tab, setTab] = useState("accueil"); // "accueil" | "catalogue" | "fournisseurs"
  const [quoteProduct, setQuoteProduct] = useState(null);

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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo-easytex.png"
              alt="EasyTex logo"
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-lg font-semibold">EasyTex</span>
          </div>

          <nav className="flex gap-2">
            {[
              { key: "accueil", label: "Accueil" },
              { key: "catalogue", label: "Catalogue" },
              { key: "fournisseurs", label: "Fournisseurs" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`rounded-full px-4 py-2 text-sm ${
                  tab === item.key ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* Contenu */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {tab === "accueil" && (
          <>
            <Hero
              onBecomeSupplier={() => setTab("fournisseurs")}
              goCatalogue={() => setTab("catalogue")}
            />
            <Stats />
            <HowItWorks />
          </>
        )}

        {tab === "catalogue" && (
          <Catalogue
            products={DEMO_PRODUCTS}
            onQuote={(p) => setQuoteProduct(p)}
            openLightbox={openLightbox}
          />
        )}

        {tab === "fournisseurs" && (
          <SuppliersSection onClose={() => setTab("accueil")} />
        )}
      </main>

      <LegalFooter />

      <QuoteModal
        open={!!quoteProduct}
        product={quoteProduct}
        onClose={() => setQuoteProduct(null)}
      />

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
