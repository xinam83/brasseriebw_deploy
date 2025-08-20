// admin_full_save.js
import menuDataOriginal from './menu.json' assert { type: 'json' };

let menuData = JSON.parse(JSON.stringify(menuDataOriginal)); // clone pour modification

const menuAdminContainer = document.getElementById('menu-admin');

// Charger les données sauvegardées depuis localStorage si existantes
if(localStorage.getItem('menuData')) {
  menuData = JSON.parse(localStorage.getItem('menuData'));
}

function afficherMenuAdmin() {
  menuAdminContainer.innerHTML = '';
  [...menuData.plats, ...menuData.desserts, ...menuData.boissons].forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `
      <h3>${item.nom}</h3>
      <label>Prix midi:</label>
      <input type="number" value="${item.prix_midi || item.prix || 0}" onchange="changerPrix(${index}, 'midi', this.value)">
      <label>Prix soir:</label>
      <input type="number" value="${item.prix_soir || item.prix || 0}" onchange="changerPrix(${index}, 'soir', this.value)">
      <label>Prix happy hour:</label>
      <input type="number" value="${item.prix_happyhour || item.prix || 0}" onchange="changerPrix(${index}, 'happyhour', this.value)">
      <label>Prix soirée spéciale:</label>
      <input type="number" value="${item.prix_soiree || item.prix || 0}" onchange="changerPrix(${index}, 'soiree', this.value)">
      <label>Activer livraison:</label>
      <input type="checkbox" ${item.disponibilite.includes('livraison') ? 'checked' : ''} onchange="toggleLivraison(${index}, this.checked)">
      <label>Activer C&C:</label>
      <input type="checkbox" ${item.disponibilite.includes('clic_collect') ? 'checked' : ''} onchange="toggleCC(${index}, this.checked)">
      <label>Activer sur place:</label>
      <input type="checkbox" ${item.disponibilite.includes('sur_place') ? 'checked' : ''} onchange="togglePlace(${index}, this.checked)">
      <label>Rupture de stock:</label>
      <input type="checkbox" ${item.rupture ? 'checked' : ''} onchange="toggleRupture(${index}, this.checked)">
      <button onclick="saveMenu()">Sauvegarder ✅</button>
    `;
    menuAdminContainer.appendChild(div);
  });
}

// Fonctions de modification
window.changerPrix = (index, type, value) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  item[`prix_${type}`] = parseFloat(value);
};

window.toggleLivraison = (index, checked) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  if(checked && !item.disponibilite.includes('livraison')) item.disponibilite.push('livraison');
  if(!checked) item.disponibilite = item.disponibilite.filter(x => x !== 'livraison');
};

window.toggleCC = (index, checked) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  if(checked && !item.disponibilite.includes('clic_collect')) item.disponibilite.push('clic_collect');
  if(!checked) item.disponibilite = item.disponibilite.filter(x => x !== 'clic_collect');
};

window.togglePlace = (index, checked) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  if(checked && !item.disponibilite.includes('sur_place')) item.disponibilite.push('sur_place');
  if(!checked) item.disponibilite = item.disponibilite.filter(x => x !== 'sur_place');
};

window.toggleRupture = (index, checked) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  item.rupture = checked;
};

// Fonction de sauvegarde
function saveMenu() {
  localStorage.setItem('menuData', JSON.stringify(menuData));
  alert('Menu sauvegardé localement !');
}

// Initialisation
afficherMenuAdmin();
