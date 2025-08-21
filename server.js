import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser JSON et formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis "site"
app.use(express.static(path.join(__dirname, "site")));

// Mot de passe admin (à remplacer par ton vrai mot de passe)
const ADMIN_PASSWORD = "TonVraiMotDePasse";

// Route pour login admin
app.post("/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.redirect("/admin.html");
  } else {
    res.send("Mot de passe incorrect !");
  }
});

// Endpoint pour mettre à jour menu.json
app.post("/update-menu", (req, res) => {
  const newMenu = req.body;
  fs.writeFile(
    path.join(__dirname, "menu.json"),
    JSON.stringify(newMenu, null, 2),
    (err) => {
      if (err) {
        console.error("Erreur d'écriture:", err);
        return res.status(500).json({ message: "Erreur lors de la sauvegarde." });
      }
      res.json({ message: "Menu mis à jour avec succès !" });
    }
  );
});

// Fallback pour toutes les autres routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "site", "index.html"));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en ligne sur le port ${PORT}`);
});
