import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"] as const;

/**
 * Résout un visuel optionnel de public/ sans présumer de son extension —
 * un fichier livré en .jpg peut très bien être un PNG. Renvoie null tant que
 * rien n'est déposé, ce qui laisse le composant retomber sur la maquette.
 */
export function findPublicAsset(base: string): string | null {
  for (const ext of EXTENSIONS) {
    const rel = `${base}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return null;
}
