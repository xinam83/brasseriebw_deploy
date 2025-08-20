// ----- Côté Admin -----
if (document.getElementById("menu-admin")) {
  const menuContainer = document.getElementById("menu-admin");

  // Charger le menu existant
  async function loadMenu() {
    const res = await fetch("/menu.json");
    const menu = await res.json();

    menuContainer.innerHTML = "";

    menu.forEach((item, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <input type="text" value="${item.name}" id="name-${index}" placeholder="Nom">
        <input type="text" value="${item.price}" id="price-${index}" placeholder="Prix">
        <button onclick="updateItem(${index})">Modifier</button>
        <button onclick="deleteItem(${index})">Supprimer</button>
      `;
      menuContainer.appendChild(div);
    });

    // Ajouter nouvel item
    const addDiv = document.createElement("div");
    addDiv.innerHTML = `
      <input type="text" id="new-name" placeholder="Nom">
      <input type="text" id="new-price" placeholder="Prix">
      <button onclick="addItem()">Ajouter</button>
    `;
    menuContainer.appendChild(addDiv);
  }

  async function saveMenu(menu) {
    await fetch("/update-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu)
    });
    loadMenu(); // Recharger après modification
  }

  async function updateItem(index) {
    const res = await fetch("/menu.json");
    const menu = await res.json();

    menu[index].name = document.getElementById(`name-${index}`).value;
    menu[index].price = document.getElementById(`price-${index}`).value;

    await saveMenu(menu);
  }

  async function deleteItem(index) {
    const res = await fetch("/menu.json");
    const menu = await res.json();

    menu.splice(index, 1);
    await saveMenu(menu);
  }

  async function addItem() {
    const res = await fetch("/menu.json");
    const menu = await res.json();

    const name = document.getElementById("new-name").value;
    const price = document.getElementById("new-price").value;

    if (name && price) {
      menu.push({ name, price });
      await saveMenu(menu);
      document.getElementById("new-name").value = "";
      document.getElementById("new-price").value = "";
    }
  }

  // Initialiser le menu admin
  loadMenu();
}

// ----- Côté Site Public -----
if (document.getElementById("menu-public")) {
  const menuContainer = document.getElementById("menu-public");

  async function loadPublicMenu() {
    const res = await fetch("/menu.json");
    const menu = await res.json();

    menuContainer.innerHTML = "";
    menu.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${item.name}</strong> - ${item.price}`;
      menuContainer.appendChild(div);
    });
  }

  loadPublicMenu();
}
