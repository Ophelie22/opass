/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Exemple : ajoutez les variables d'environnement ici
  readonly VITE_ANOTHER_VAR?: string; // Une autre variable optionnelle
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
