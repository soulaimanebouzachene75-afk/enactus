// Construit une version 100 % statique du site dans /out (hébergement sans serveur :
// GitHub Pages, Netlify drop, hébergement mutualisé…). Les routes /api sont mises de
// côté le temps du build : les formulaires utilisent alors NEXT_PUBLIC_FORM_ENDPOINT.
import { execSync } from "node:child_process";
import { existsSync, renameSync } from "node:fs";

const api = "src/app/api";
const parked = ".api-parked";
if (existsSync(api)) renameSync(api, parked);
try {
  execSync("next build", { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } });
} finally {
  if (existsSync(parked)) renameSync(parked, api);
}
