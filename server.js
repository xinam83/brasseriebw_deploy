import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Pour avoir __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000; // Render utilise PORT fourni par l'env

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques depuis le dossier 'site'
app.use(express.static(path.join(__dirname, "site")));

// Endpoint pour mettre à jour menu.json
app.post("/update-menu", (req, res) => {
  const newMenu = req.body;

  fs.writeFile(
    path.join(__dirname, "menu.json"),
    JSON.stringify(newMenu, null, 2),
    (err) => {
      if (err) {
        console.error("❌ Erreur d'écriture:", err);
        return res.status(500).json({ message: "Erreur lors de la sauvegarde." });
      }
      console.log("✅ menu.json mis à jour");
      res.json({ message: "Menu mis à jour avec succès !" });
    }
  );
});

// Sécurité basique (exemple : future authentification admin)
app.use("/admin", (req, res, next) => {
  // À améliorer plus tard (JWT ou sessions)
  next();
});

// Fallback : renvoyer index.html pour toute route non trouvée
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "site", "index.html"));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
