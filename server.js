import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Mot de passe admin
const ADMIN_PASSWORD = "TonMotDePasseIci"; // ⚠️ change-le !

// Middleware pour parser JSON et formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis "site"
app.use(express.static(path.join(__dirname, "site")));

// Endpoint pour mettre à jour menu.json
app.post("/update-menu", (req, res) => {
  const newMenu = req.body;
  fs.writeFile(
    path.join(__dirname, "menu.json"),
    JSON.stringify(newMenu, null, 2),
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur lors de la sauvegarde." });
      res.json({ message: "Menu mis à jour avec succès !" });
    }
  );
});

// Endpoint pour la connexion admin
app.post("/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.redirect("/admin.html");
  } else {
    res.send("Mot de passe incorrect !");
  }
});

// Fallback pour toutes les autres routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "site", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});
