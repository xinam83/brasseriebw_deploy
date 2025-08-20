import menuData from './menu.json' assert { type: 'json' };

const menuContainer = document.getElementById('menu-container');
const menuAdminContainer = document.getElementById('menu-admin');

// Fonction pour calculer le prix selon l'heure
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
  menuData.plats.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `<h3>${item.nom}</h3>
                     <p>Prix: ${getPrix(item)} €</p>`;
    menuContainer.appendChild(div);
  });

  menuData.desserts.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `<h3>${item.nom}</h3>
                     <p>Prix: ${getPrix(item)} €</p>`;
    menuContainer.appendChild(div);
  });

  menuData.boissons.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `<h3>${item.nom}</h3>
                     <p>Prix: ${getPrix(item)} €</p>
                     ${item.mention ? `<p>${item.mention}</p>` : ''}`;
    menuContainer.appendChild(div);
  });
}

function afficherMenuAdmin() {
  menuAdminContainer.innerHTML = '';
  [...menuData.plats, ...menuData.desserts, ...menuData.boissons].forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('menu-item');
    div.innerHTML = `
      <h3>${item.nom}</h3>
      <label>Prix midi:</label>
      <input type="number" value="${item.prix_midi || item.prix}" onchange="changerPrix(${index}, 'midi', this.value)">
      <label>Prix soir:</label>
      <input type="number" value="${item.prix_soir || item.prix}" onchange="changerPrix(${index}, 'soir', this.value)">
      <label>Prix happy hour:</label>
      <input type="number" value="${item.prix_happyhour || item.prix}" onchange="changerPrix(${index}, 'happyhour', this.value)">
      <label>Prix soirée spéciale:</label>
      <input type="number" value="${item.prix_soiree || item.prix}" onchange="changerPrix(${index}, 'soiree', this.value)">
      <label>Activer livraison:</label>
      <input type="checkbox" ${item.disponibilite.includes('livraison') ? 'checked' : ''} onchange="toggleLivraison(${index}, this.checked)">
      <label>Activer C&C:</label>
      <input type="checkbox" ${item.disponibilite.includes('clic_collect') ? 'checked' : ''} onchange="toggleCC(${index}, this.checked)">
      <label>Activer sur place:</label>
      <input type="checkbox" ${item.disponibilite.includes('sur_place') ? 'checked' : ''} onchange="togglePlace(${index}, this.checked)">
      <label>Rupture de stock:</label>
      <input type="checkbox" ${item.rupture ? 'checked' : ''} onchange="toggleRupture(${index}, this.checked)">
    `;
    menuAdminContainer.appendChild(div);
  });
}

window.changerPrix = (index, type, value) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  switch(type) {
    case 'midi': item.prix_midi = parseFloat(value); break;
    case 'soir': item.prix_soir = parseFloat(value); break;
    case 'happyhour': item.prix_happyhour = parseFloat(value); break;
    case 'soiree': item.prix_soiree = parseFloat(value); break;
  }
  afficherMenu();
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

afficherMenu();
setInterval(afficherMenu, 60000);
