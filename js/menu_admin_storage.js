// menu_admin_storage.js

// Récupérer le menu depuis localStorage si présent, sinon utiliser menuData importé
let menu = JSON.parse(localStorage.getItem('menuData')) || menuData;

const menuContainer = document.getElementById('menu-container');
const menuAdminContainer = document.getElementById('menu-admin');

function getPrix(item) {
  const now = new Date();
  const hours = now.getHours();
  if(item.prix_apres_17h && hours >= 17 && hours < 3) return item.prix_apres_17h;
  if(item.prix_midi && hours >= 9 && hours < 15) return item.prix_midi;
  if(item.prix_soir && hours >= 17 && hours < 24) return item.prix_soir;
  if(item.prix_happyhour && hours >= 17 && hours < 24) return item.prix_happyhour;
  return item.prix || 0;
}

function afficherMenu() {
  menuContainer.innerHTML = '';
  menu.plats.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `<h3>${item.nom}</h3><p>Prix: ${getPrix(item)} €</p>`;
    menuContainer.appendChild(div);
  });
  menu.desserts.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `<h3>${item.nom}</h3><p>Prix: ${getPrix(item)} €</p>`;
    menuContainer.appendChild(div);
  });
  menu.boissons.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `<h3>${item.nom}</h3><p>Prix: ${getPrix(item)} €</p>${item.mention ? `<p>${item.mention}</p>` : ''}`;
    menuContainer.appendChild(div);
  });
}

function afficherMenuAdmin() {
  menuAdminContainer.innerHTML = '';
  [...menu.plats, ...menu.desserts, ...menu.boissons].forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `
      <h3>${item.nom}</h3>
      <label>Prix midi: <input type="number" value="${item.prix_midi || item.prix}" onchange="changerPrix(${index}, 'midi', this.value)"></label>
      <label>Prix soir: <input type="number" value="${item.prix_soir || item.prix}" onchange="changerPrix(${index}, 'soir', this.value)"></label>
      <label>Prix happy hour: <input type="number" value="${item.prix_happyhour || item.prix}" onchange="changerPrix(${index}, 'happyhour', this.value)"></label>
      <label>Prix soirée spéciale: <input type="number" value="${item.prix_soiree || item.prix}" onchange="changerPrix(${index}, 'soiree', this.value)"></label>
      <label>Livraison: <input type="checkbox" ${item.disponibilite.includes('livraison') ? 'checked' : ''} onchange="toggleLivraison(${index}, this.checked)"></label>
      <label>Clic & Collect: <input type="checkbox" ${item.disponibilite.includes('clic_collect') ? 'checked' : ''} onchange="toggleCC(${index}, this.checked)"></label>
      <label>Sur place: <input type="checkbox" ${item.disponibilite.includes('sur_place') ? 'checked' : ''} onchange="togglePlace(${index}, this.checked)"></label>
      <label>Rupture de stock: <input type="checkbox" ${item.rupture ? 'checked' : ''} onchange="toggleRupture(${index}, this.checked)"></label>
    `;
    menuAdminContainer.appendChild(div);
  });
}

window.changerPrix = (index, type, value) => {
  const item = [...menu.plats, ...menu.desserts, ...menu.boissons][index];
  item[`prix_${type}`] = parseFloat(value);
  localStorage.setItem('menuData', JSON.stringify(menu));
  afficherMenu();
};

window.toggleLivraison = (index, checked) => {
  const item = [...menu.plats, ...menu.desserts, ...menu.boissons][index];
  if(checked && !item.disponibilite.includes('livraison')) item.disponibilite.push('livraison');
  if(!checked) item.disponibilite = item.disponibilite.filter(x => x !== 'livraison');
  localStorage.setItem('menuData', JSON.stringify(menu));
};

window.toggleCC = (index, checked) => {
  const item = [...menu.plats, ...menu.desserts, ...menu.boissons][index];
  if(checked && !item.disponibilite.includes('clic_collect')) item.disponibilite.push('clic_collect');
  if(!checked) item.disponibilite = item.disponibilite.filter(x => x !== 'clic_collect');
  localStorage.setItem('menuData', JSON.stringify(menu));
};

window.togglePlace = (index, checked) => {
  const item = [...menu.plats, ...menu.desserts, ...menu.boissons][index];
  if(checked && !item.disponibilite.includes('sur_place')) item.disponibilite.push('sur_place');
  if(!checked) item.disponibilite = item.disponibilite.filter(x => x !== 'sur_place');
  localStorage.setItem('menuData', JSON.stringify(menu));
};

window.toggleRupture = (index, checked) => {
  const item = [...menu.plats, ...menu.desserts, ...menu.boissons][index];
  item.rupture = checked;
  localStorage.setItem('menuData', JSON.stringify(menu));
};

afficherMenu();
afficherMenuAdmin();
