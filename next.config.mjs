/** @type {import('next').NextConfig} */
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  // Mode "export" : génère un site 100 % statique (dossier /out) — utilisé pour l'aperçu.
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
  // Sous-chemin de publication (GitHub Pages : "/nom-du-depot"). Vide par défaut.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: isStatic,
    formats: ["image/avif", "image/webp"],
  },
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "0",
  },
};

export default nextConfig;
