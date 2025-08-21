import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "site")));

// ADMIN LOGIN
const ADMIN_PASSWORD = "monMotDePasse123"; // change-le

app.post("/admin/login", (req, res) => {
  const { password } = req.body;
  if(password === ADMIN_PASSWORD){
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// MENU
app.get("/menu.json", (req, res) => {
  res.sendFile(path.join(__dirname, "menu.json"));
});

app.post("/update-menu", (req, res) => {
  fs.writeFileSync(
    path.join(__dirname, "menu.json"),
    JSON.stringify(req.body, null, 2)
  );
  res.json({ message: "Menu mis à jour !" });
});

// GALLERY
app.get("/gallery.json", (req, res) => {
  res.sendFile(path.join(__dirname, "gallery.json"));
});

app.post("/update-gallery", (req, res) => {
  fs.writeFileSync(
    path.join(__dirname, "gallery.json"),
    JSON.stringify(req.body, null, 2)
  );
  res.json({ message: "Galerie mise à jour !" });
});

// CLIENTS
app.get("/users.json", (req, res) => {
  res.sendFile(path.join(__dirname, "users.json"));
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")));
  if(users.find(u => u.username === username)){
    return res.json({ success: false, message: "Utilisateur déjà existant" });
  }
  users.push({ username, password });
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2));
  res.json({ success: true });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")));
  const user = users.find(u => u.username === username && u.password === password);
  if(user){
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Identifiants incorrects" });
  }
});

// Fallback
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "site", "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Serveur en ligne sur le port ${PORT}`));
