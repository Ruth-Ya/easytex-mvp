import React, { useMemo, useState } from "react";
import { Search, Filter, Store, Phone, Upload, Loader2, Plus, X, Globe, Sparkles, Shield, Truck, ArrowRight } from "lucide-react";

// --- Utilitaires
const formatPrice = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", maximumFractionDigits: 0 }).format(n);
const WA_NUMBER = "221707546281"; // Numéro WhatsApp EasyTex

// --- Données démo (remplaçables par un Google Sheet plus tard)
const DEMO_SUPPLIERS = [
  { id: "s1", name: "Atelier Ndar Textile", city: "Saint-Louis", country: "Sénégal", whatsapp: "221771112233" },
  { id: "s2", name: "Tissages de Korhogo", city: "Korhogo", country: "Côte d’Ivoire", whatsapp: "2250501020304" },
  { id: "s3", name: "Wax & Co Abidjan", city: "Abidjan", country: "Côte d’Ivoire", whatsapp: "2250703040506" },
];

const DEMO_PRODUCTS = [
  { id: "p1", name: "Bazin Riche 1.8m", type: "Bazin", color: "Bleu roi", origin: "Sénégal", price: 8500, supplierId: "s1", images: ["https://images.unsplash.com/photo-1520975922284-9d09a2b1a0d8?q=80&w=1200&auto=format&fit=crop"] },
  { id: "p2", name: "Pagnes tissés (lot de 5)", type: "Tissé", color: "Multicolore", origin: "Côte d’Ivoire", price: 24000, supplierId: "s2", images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"] },
  { id: "p3", name: "Wax premium 6 yards", type: "Wax", color: "Rouge", origin: "Côte d’Ivoire", price: 19000, supplierId: "s3", images: ["https://images.unsplash.com/photo-1623292554176-3f1d1b2f90b3?q=80&w=1200&auto=format&fit=crop"] },
  { id: "p4", name: "Indigo artisanal", type: "Indigo", color: "Indigo", origin: "Mali", price: 17500, supplierId: "s2", images: ["https://images.unsplash.com/photo-1520975731046-5f5f0f396b52?q=80&w=1200&auto=format&fit=crop"] },
  { id: "p5", name: "Kente mix 6 yards", type: "Kente", color: "Jaune", origin: "Ghana", price: 28000, supplierId: "s3", images: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop"] },
];

function Badge({ children }) {
  return <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">{children}</span>;
}

function Pill({ children, active = false, onClick }) {
  return (
    <button onClick={onClick} className={`rounded-full px-3 py-1 text-sm border ${active ? "bg-black text-white" : "hover:bg-black/5"}`}>
      {children}
    </button>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Hero({ onGoCatalog, onOpenSupplier }) {
  return (
   <div className="relative overflow-hidden rounded-3xl bg-blue-200 p-6 md:p-12 border">
      <div className="md:max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"><Sparkles size={16}/> EasyTex</div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">Sourcing textile, simple et local.<br/>Trouvez vos tissus en Afrique de l’Ouest.</h1>
        <p className="mt-4 text-base md:text-lg text-gray-600">Découvrez des fournisseurs vérifiés, comparez les tissus, et demandez un devis en un clic — directement sur WhatsApp.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={onGoCatalog} className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-white text-sm md:text-base"><Store size={18}/> Explorer le catalogue</button>
          <button onClick={onOpenSupplier} className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm md:text-base"><Upload size={18}/> Devenir fournisseur</button>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 max-w-md text-xs md:text-sm">
          <div className="rounded-xl border p-3"><Shield className="mb-2" size={18}/> <div className="font-medium">Fournisseurs vérifiés</div></div>
          <div className="rounded-xl border p-3"><Truck className="mb-2" size={18}/> <div className="font-medium">Expédition régionale</div></div>
          <div className="rounded-xl border p-3"><Globe className="mb-2" size={18}/> <div className="font-medium">UEMOA</div></div>
        </div>
      </div>
      <img alt="textile" className="pointer-events-none select-none hidden md:block absolute -right-10 bottom-0 w-[360px] rounded-tl-3xl shadow-2xl" src="https://images.unsplash.com/photo-1520975922284-9d09a2b1a0d8?q=80&w=1200&auto=format&fit=crop"/>
    </div>
  );
}

function Catalog({ products, suppliers, onQuote }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("Tous");
  const [origin, setOrigin] = useState("Toutes");

  const types = ["Tous", ...Array.from(new Set(products.map(p => p.type)))];
  const origins = ["Toutes", ...Array.from(new Set(products.map(p => p.origin)))];
  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchQ = q ? (p.name.toLowerCase().includes(q.toLowerCase()) || p.color.toLowerCase().includes(q.toLowerCase())) : true;
      const matchType = type === "Tous" ? true : p.type === type;
      const matchOrigin = origin === "Toutes" ? true : p.origin === origin;
      return matchQ && matchType && matchOrigin;
    });
  }, [q, type, origin, products]);

  const supIndex = Object.fromEntries(suppliers.map(s => [s.id, s]));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[240px]">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Rechercher un tissu (ex. Wax, Bleu, Bazin)" className="w-full rounded-2xl border px-10 py-3"/>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18}/>
        </div>
        <div className="flex items-center gap-2">
          <Pill active={type!=="Tous"}><Filter size={14} className="mr-1 inline"/>Type</Pill>
          <select value={type} onChange={(e)=>setType(e.target.value)} className="rounded-2xl border px-3 py-2">
            {types.map(t=> <option key={t}>{t}</option>)}
          </select>
          <select value={origin} onChange={(e)=>setOrigin(e.target.value)} className="rounded-2xl border px-3 py-2">
            {origins.map(o=> <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="group rounded-2xl border overflow-hidden hover:shadow-lg transition">
            <div className="aspect-[4/3] overflow-hidden bg-gray-50">
              <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover group-hover:scale-[1.02] transition"/>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.name}</h3>
                <Badge>{p.type}</Badge>
              </div>
              <div className="mt-1 text-sm text-gray-600">{p.color} • {p.origin}</div>
              <div className="mt-2 font-semibold">{formatPrice(p.price)}</div>
              <div className="mt-3 text-xs text-gray-500">Fournisseur : {supIndex[p.supplierId]?.name}</div>
              <button onClick={()=>onQuote(p)} className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-white text-sm">Demander un devis <ArrowRight size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border p-6 text-center text-gray-500">Aucun résultat. Essayez d’autres filtres.</div>
      )}
    </div>
  );
}

function SupplierSignup({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", country: "", whatsapp: "", types: "", photos: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("Supplier submission:", form);
      setLoading(false);
      alert("Merci ! Votre demande a été reçue. Nous reviendrons vers vous sous 24-48h.");
      onClose?.();
    }, 900);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm">Nom de l’établissement</label>
          <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-1 w-full rounded-xl border px-3 py-2"/>
        </div>
        <div>
          <label className="text-sm">Ville</label>
          <input required value={form.city} onChange={e=>setForm({...form, city:e.target.value})} className="mt-1 w-full rounded-xl border px-3 py-2"/>
        </div>
        <div>
          <label className="text-sm">Pays</label>
          <input required value={form.country} onChange={e=>setForm({...form, country:e.target.value})} className="mt-1 w-full rounded-xl border px-3 py-2"/>
        </div>
        <div>
          <label className="text-sm">WhatsApp</label>
          <input required placeholder="ex: 221771234567" value={form.whatsapp} onChange={e=>setForm({...form, whatsapp:e.target.value})} className="mt-1 w-full rounded-xl border px-3 py-2"/>
        </div>
      </div>
      <div>
        <label className="text-sm">Types de tissus proposés</label>
        <input required placeholder="Wax, Bazin, Tissé…" value={form.types} onChange={e=>setForm({...form, types:e.target.value})} className="mt-1 w-full rounded-xl border px-3 py-2"/>
      </div>
      <div>
        <label className="text-sm">Photos (liens ou Cloud)</label>
        <input placeholder="Lien Drive/Dropbox/URL" value={form.photos.join(", ")} onChange={e=>setForm({...form, photos:e.target.value.split(",").map(x=>x.trim())})} className="mt-1 w-full rounded-xl border px-3 py-2"/>
      </div>
      <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-white">
        {loading ? (<><Loader2 className="animate-spin" size={16}/> Envoi…</>) : (<><Plus size={16}/> Envoyer ma candidature fournisseur</>)}
      </button>
      <p className="text-xs text-gray-500">En soumettant, vous acceptez d’être contacté·e par EasyTex pour vérification.</p>
    </form>
  );
}

function QuoteModal({ open, onClose, product }) {
  if (!product) return null;
  const msg = encodeURIComponent(`Bonjour EasyTex, je souhaite un devis pour: ${product.name} (${product.type}, ${product.color}, ${product.origin}) au prix indicatif ${formatPrice(product.price)}.`);
  const wa = `https://wa.me/${WA_NUMBER}?text=${msg}`;
  return (
    <Modal open={open} onClose={onClose} title="Demande de devis">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <img src={product.images[0]} alt={product.name} className="w-24 h-20 object-cover rounded-xl border"/>
          <div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm text-gray-600">{product.type} • {product.color} • {product.origin}</div>
            <div className="mt-1 font-semibold">{formatPrice(product.price)}</div>
          </div>
        </div>
        <a href={wa} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white">
          <Phone size={18}/> Continuer sur WhatsApp
        </a>
        <p className="text-xs text-gray-500">Astuce : ajoutez vos précisions (quantité, délais, livraison) dans le message WhatsApp.</p>
      </div>
    </Modal>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t pt-6 text-sm text-gray-600">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>© {new Date().getFullYear()} EasyTex • Prototype MVP</div>
        <div className="flex flex-wrap items-center gap-3">
          <a className="hover:underline" href="#">Conditions d’utilisation</a>
          <a className="hover:underline" href="#">Confidentialité</a>
          <a className="hover:underline" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [tab, setTab] = useState("accueil");
  const [openSupplier, setOpenSupplier] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(null);

  const products = DEMO_PRODUCTS;
  const suppliers = DEMO_SUPPLIERS;

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-easytex.png" alt="EasyTex logo" className="h-10 w-auto object-contain mr-2" />
          <div className="font-semibold">EasyTex</div>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          {[
            { id: "accueil", label: "Accueil" },
            { id: "catalogue", label: "Catalogue" },
            { id: "fournisseurs", label: "Fournisseurs" },
          ].map((t) => (
            <button key={t.id} onClick={()=>setTab(t.id)} className={`rounded-full px-3 py-2 text-sm border ${tab===t.id?"bg-black text-white":"hover:bg-black/5"}`}>{t.label}</button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={()=>setOpenSupplier(true)} className="hidden sm:inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"><Upload size={16}/> Devenir fournisseur</button>
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-black px-3 py-2 text-white text-sm"><Phone size={16}/> WhatsApp</a>
        </div>
      </header>

      <div className="md:hidden mb-4 flex items-center gap-2">
        {[
          { id: "accueil", label: "Accueil" },
          { id: "catalogue", label: "Catalogue" },
          { id: "fournisseurs", label: "Fournisseurs" },
        ].map((t) => (
          <Pill key={t.id} active={tab===t.id} onClick={()=>setTab(t.id)}>{t.label}</Pill>
        ))}
      </div>

      {tab === "accueil" && (
        <div className="space-y-8">
          <Hero onGoCatalog={()=>setTab("catalogue")} onOpenSupplier={()=>setOpenSupplier(true)} />

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border p-5">
              <div className="text-3xl font-extrabold">{products.length}</div>
              <div className="text-sm text-gray-600">Tissus disponibles</div>
            </div>
            <div className="rounded-2xl border p-5">
              <div className="text-3xl font-extrabold">{new Set(suppliers.map(s=>s.country)).size}</div>
              <div className="text-sm text-gray-600">Pays représentés</div>
            </div>
            <div className="rounded-2xl border p-5">
              <div className="text-3xl font-extrabold">24-48h</div>
              <div className="text-sm text-gray-600">Réponse à vos demandes</div>
            </div>
          </section>

          <section className="rounded-2xl border p-5">
            <h2 className="text-lg font-semibold mb-3">Comment ça marche ?</h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <li className="rounded-xl border p-4"><span className="font-semibold">1) Explorez</span> le catalogue et filtrez par type, couleur, pays.</li>
              <li className="rounded-xl border p-4"><span className="font-semibold">2) Demandez un devis</span> en un clic via WhatsApp avec les détails auto‑remplis.</li>
              <li className="rounded-xl border p-4"><span className="font-semibold">3) Recevez</span> des offres, comparez et finalisez votre commande.</li>
            </ol>
          </section>
        </div>
      )}

      {tab === "catalogue" && (
        <Catalog products={products} suppliers={suppliers} onQuote={(p)=>setQuoteProduct(p)} />
      )}

      {tab === "fournisseurs" && (
        <div className="rounded-2xl border p-5">
          <h2 className="text-lg font-semibold">Vous vendez du textile ? Rejoignez EasyTex</h2>
          <p className="mt-1 text-gray-600 text-sm">Créez une vitrine simple, recevez des demandes qualifiées et développez votre clientèle régionale.</p>
          <div className="mt-4">
            <SupplierSignup onClose={()=>setOpenSupplier(false)} />
          </div>
        </div>
      )}

      <Footer />

      <QuoteModal open={!!quoteProduct} onClose={()=>setQuoteProduct(null)} product={quoteProduct} />
      <Modal open={openSupplier} onClose={()=>setOpenSupplier(false)} title="Devenir fournisseur">
        <SupplierSignup onClose={()=>setOpenSupplier(false)} />
      </Modal>
    </div>
  );
}
