let token = null;
let cart = [];

// Login admin
document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  const msg = document.getElementById("login-msg");
  if (res.ok) {
    token = data.token;
    msg.textContent = "Connecté !";
    loadMenu();
  } else {
    msg.textContent = data.message;
  }
});

// Charger le menu
async function loadMenu() {
  const res = await fetch("/menu", { headers: { "Authorization": "Bearer " + token } });
  const menu = await res.json();

  document.getElementById("login-section").style.display = "none";
  const menuSection = document.getElementById("menu-section");
  menuSection.style.display = "block";

  const ul = document.getElementById("menu-list");
  ul.innerHTML = "";
  menu.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nom} - ${p.prix} €`;
    const btn = document.createElement("button");
    btn.textContent = "Ajouter au panier";
    btn.addEventListener("click", () => addToCart(p.id, 1));
    li.appendChild(btn);
    ul.appendChild(li);
  });
  document.getElementById("cart-section").style.display = "block";
}

// Ajouter au panier
async function addToCart(produitId, quantite) {
  const res = await fetch("/add-to-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({ produitId, quantite })
  });
  const data = await res.json();
  updateCartList(data.ventes);
}

// Afficher panier
function updateCartList(ventes) {
  cart = ventes;
  const ul = document.getElementById("cart-list");
  ul.innerHTML = "";
  cart.forEach(v => {
    const li = document.createElement("li");
    li.textContent = `${v.nom} x${v.quantite} - ${v.prix} €`;
    ul.appendChild(li);
  });
}

// Voir ventes
document.getElementById("view-sales-btn").addEventListener("click", async () => {
  const res = await fetch("/ventes", { headers: { "Authorization": "Bearer " + token } });
  const ventes = await res.json();
  const ul = document.getElementById("sales-list");
  ul.innerHTML = "";
  ventes.forEach(v => {
    const li = document.createElement("li");
    li.textContent = `${v.nom} x${v.quantite} - ${v.prix} €`;
    ul.appendChild(li);
  });
});
