import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques (site web)
app.use(express.static(__dirname));

// Endpoint pour mettre à jour menu.json
app.post("/update-menu", (req, res) => {
  const newMenu = req.body;
  fs.writeFile(path.join(__dirname, "menu.json"), JSON.stringify(newMenu, null, 2), (err) => {
    if (err) {
      console.error("Erreur d'écriture:", err);
      return res.status(500).json({ message: "Erreur lors de la sauvegarde." });
    }
    res.json({ message: "Menu mis à jour avec succès !" });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
