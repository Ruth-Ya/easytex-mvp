// src/App.jsx
import React, { useState } from "react";

/* -----------------------------------------------------------
   CONFIG
----------------------------------------------------------- */

// Ton numéro WhatsApp (sans le +)
const WA_NUMBER = "221707546281";

const formatPrice = (n) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(n);

/* -----------------------------------------------------------
   DONNÉES DÉMO SIMPLE (SANS FILTRES)
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
  },
  {
    id: "p2",
    name: "Wax premium 6 yards",
    category: "Tissus habillement",
    type: "Wax",
    color: "Rouge / Jaune",
    origin: "Côte d’Ivoire",
    price: 19000,
  },
  {
    id: "p3",
    name: "Pagne tissé (lot de 5)",
    category: "Tissus spécifiques et traditionnels",
    type: "Tissé",
    color: "Multicolore",
    origin: "Côte d’Ivoire",
    price: 24000,
  },
  {
    id: "p4",
    name: "Indigo artisanal",
    category: "Tissus spécifiques et traditionnels",
    type: "Indigo",
    color: "Indigo profond",
    origin: "Mali",
    price: 17500,
  },
  {
    id: "p5",
    name: "Toile épaisse ameublement",
    category: "Tissus Ameublement et Décoration",
    type: "Toile",
    color: "Beige",
    origin: "Ghana",
    price: 22000,
  },
  {
    id: "p6",
    name: "Éponge serviettes",
    category: "Tissus Maison et Linge",
    type: "Éponge",
    color: "Blanc",
    origin: "Sénégal",
    price: 6500,
  },
];

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
            fournisseurs de la zone UEMOA, directement sur WhatsApp. Comparez
            les tissus, demandez un devis en un clic et échangez avec des
            fournisseurs vérifiés.
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

function CatalogView() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <section id="catalogue">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Catalogue de tissus
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Aperçu de quelques types de tissus disponibles sur EasyTex. Les
          prix sont indicatifs et peuvent varier selon la quantité, la
          finition et les délais.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_PRODUCTS.map((p) => {
            const waText = encodeURIComponent(
              `Bonjour EasyTex,\n\nJe souhaite un devis pour :\n- ${p.name}\n- Catégorie : ${p.category}\n- Type : ${p.type}\n- Couleur : ${p.color}\n- Origine : ${p.origin}\n- Prix indicatif : ${formatPrice(
                p.price
              )}\n\nMerci de me préciser les minimums de commande, délais et conditions de livraison.`
            );
            const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;

            return (
              <div
                key={p.id}
                className="flex h-full flex-col rounded-2xl border p-4"
              >
                <div className="text-sm font-medium text-blue-700">
                  {p.category}
                </div>
                <div className="mt-1 text-base font-semibold text-gray-900">
                  {p.name}
                </div>
                <div className="mt-1 text-sm text-gray-600">
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
      </section>
    </div>
  );
}

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
        className="rounded-2xl border p-5 md:p-8 bg-white"
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
   APP PRINCIPALE
   Header RESPONSIVE + logo mis en avant
----------------------------------------------------------- */

export default function App() {
  const [tab, setTab] = useState("accueil");

  const switchTo = (key) => {
    setTab(key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          {/* Logo seul, plus grand */}
          <button
            onClick={() => switchTo("accueil")}
            className="flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <img
              src="/logo-easytex.png"
              alt="EasyTex"
              className="h-9 w-auto sm:h-10 md:h-11"
              loading="eager"
            />
          </button>

          {/* Bouton WhatsApp à droite sur grand écran, en haut sur mobile */}
          <div className="order-2 ml-auto flex items-center sm:order-3 sm:ml-0">
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              WhatsApp
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex sm:hidden items-center justify-center rounded-full bg-black px-3 py-2 text-xs font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              WA
            </a>
          </div>

          {/* Navigation : prend toute la largeur en dessous sur mobile */}
          <nav className="order-3 flex w-full justify-center gap-2 text-sm sm:order-2 sm:w-auto">
            {[
              { key: "accueil", label: "Accueil" },
              { key: "catalogue", label: "Catalogue" },
              { key: "fournisseurs", label: "Devenir fournisseur" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => switchTo(item.key)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium sm:flex-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
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
      </header>

      {/* CONTENU */}
      {tab === "accueil" && (
        <HomeView
          onGoCatalogue={() => switchTo("catalogue")}
          onOpenSupplier={() => switchTo("fournisseurs")}
        />
      )}
      {tab === "catalogue" && <CatalogView />}
      {tab === "fournisseurs" && <SupplierSignupView />}

      {/* FOOTER simplifié */}
      <footer className="mt-10 w-full border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600">
          © EasyTex 2025 – Tous droits réservés
        </div>
      </footer>
    </div>
  );
}
