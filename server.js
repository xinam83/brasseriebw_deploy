import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Correction pour __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour parser les requêtes JSON et formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis le dossier "site"
app.use(express.static(path.join(__dirname, "site")));

// Fallback pour toutes les autres routes (⚠️ corrigé ici)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "site", "index.html"));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});
