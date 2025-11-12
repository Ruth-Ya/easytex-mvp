<footer className="mt-10 w-full border-t bg-white">
  <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600">
    <div>© EasyTex 2025 – Tous droits réservés</div>
    <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-gray-500">
      <button
        onClick={() => setOpenPrivacy(true)}
        className="underline-offset-2 hover:text-gray-700 hover:underline"
      >
        Confidentialité
      </button>
      <span>•</span>
      <button
        onClick={() => setOpenTerms(true)}
        className="underline-offset-2 hover:text-gray-700 hover:underline"
      >
        CGU
      </button>
      <span>•</span>
      <button
        onClick={() => setOpenImprint(true)}
        className="underline-offset-2 hover:text-gray-700 hover:underline"
      >
        Mentions légales
      </button>
    </div>
  </div>
</footer>
