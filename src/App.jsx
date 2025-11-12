import React, { useState } from "react";
import "./App.css";

// === Données du catalogue (avec 2 photos par article) ===
const products = [
  {
    id: 1,
    name: "Bazin bleu",
    description: "Tissu noble à la brillance élégante, idéal pour vos tenues traditionnelles.",
    images: ["/p1-1.jpg", "/p1-2.jpg"],
  },
  {
    id: 2,
    name: "Tissé multicolore",
    description: "Textile artisanal tissé à la main, synonyme de durabilité et de créativité africaine.",
    images: ["/p2-1.jpg", "/p2-2.jpg"],
  },
  {
    id: 3,
    name: "Wax rouge",
    description: "Tissu africain vibrant avec des motifs audacieux, parfait pour toutes les occasions.",
    images: ["/p3-1.jpg", "/p3-2.jpg"],
  },
  {
    id: 4,
    name: "Indigo",
    description: "Tissu teint à la main avec des nuances profondes, symbole d’authenticité et de style.",
    images: ["/p4-1.jpg", "/p4-2.jpg"],
  },
  {
    id: 5,
    name: "Kente jaune",
    description: "Tissu traditionnel aux motifs royaux, emblème du patrimoine africain.",
    images: ["/p5-1.jpg", "/p5-2.jpg"],
  },
];

function ProductCard({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
      <img
        src={product.images[activeImage]}
        alt={product.name}
        className="w-full h-56 object-cover cursor-pointer"
        onClick={() => setActiveImage((activeImage + 1) % product.images.length)}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* === HEADER / HERO === */}
      <header className="bg-[#1E88E5] text-white py-16 text-center px-4">
        <img
          src="/logo-easytex.png"
          alt="EasyTex"
          className="mx-auto mb-6 w-28 md:w-36"
        />
        <h1 className="text-3xl md:text-5xl font-bold">
          Sourcing textile, simple et rapide.
        </h1>
        <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">
          Comparez les tissus, demandez un devis en un clic et échangez directement sur WhatsApp avec des fournisseurs vérifiés.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="bg-white text-[#1E88E5] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
            Explorer le catalogue
          </button>
          <button className="bg-[#0D47A1] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#1565C0] transition">
            Devenir fournisseur
          </button>
        </div>
      </header>

      {/* === BADGES / ATOUTS === */}
      <section className="bg-white py-8 flex flex-wrap justify-center gap-6 text-sm md:text-base text-gray-700 border-b">
        <div className="px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
          <strong>Fournisseurs vérifiés</strong> — Qualité et confiance
        </div>
        <div className="px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
          <strong>Expédition régionale</strong> — UEMOA
        </div>
      </section>

      {/* === STATS === */}
      <section className="py-10 bg-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-3xl font-bold text-[#1E88E5]">100</h3>
          <p className="text-gray-600">Tissus disponibles</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#1E88E5]">UEMOA</h3>
          <p className="text-gray-600">Zone desservie</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#1E88E5]">24–48h</h3>
          <p className="text-gray-600">Délai de réponse</p>
        </div>
      </section>

      {/* === CATALOGUE === */}
      <main className="flex-grow px-6 md:px-12 py-12 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Découvrez nos tissus
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      {/* === FOOTER === */}
      <footer className="border-t bg-gray-50 text-gray-600 text-center text-sm py-6">
        <div>© EasyTex 2025 – Tous droits réservés</div>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:underline">Confidentialité</a>
          <a href="#" className="hover:underline">CGU</a>
          <a href="#" className="hover:underline">Mentions légales</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
