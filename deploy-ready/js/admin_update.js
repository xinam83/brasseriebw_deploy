import menuData from './menu.json' assert { type: 'json' };

const menuAdminContainer = document.getElementById('menu-admin');

function displayMenuAdmin() {
  menuAdminContainer.innerHTML = '';

  [...menuData.plats, ...menuData.desserts, ...menuData.boissons].forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('menu-item');

    div.innerHTML = `
      <h3>${item.nom}</h3>
      <label>Prix midi: <input type="number" value="${item.prix_midi || item.prix}" onchange="updatePrice(${index}, 'midi', this.value)"></label>
      <label>Prix soir: <input type="number" value="${item.prix_soir || item.prix}" onchange="updatePrice(${index}, 'soir', this.value)"></label>
      <label>Prix happy hour: <input type="number" value="${item.prix_happyhour || item.prix}" onchange="updatePrice(${index}, 'happyhour', this.value)"></label>
      <label>Prix soirée spéciale: <input type="number" value="${item.prix_soiree || item.prix}" onchange="updatePrice(${index}, 'soiree', this.value)"></label>
      <label><input type="checkbox" ${item.disponibilite.includes('livraison') ? 'checked' : ''} onchange="toggleOption(${index}, 'livraison', this.checked)"> Livraison</label>
      <label><input type="checkbox" ${item.disponibilite.includes('clic_collect') ? 'checked' : ''} onchange="toggleOption(${index}, 'clic_collect', this.checked)"> Clic & Collect</label>
      <label><input type="checkbox" ${item.disponibilite.includes('sur_place') ? 'checked' : ''} onchange="toggleOption(${index}, 'sur_place', this.checked)"> Sur place</label>
      <label><input type="checkbox" ${item.rupture ? 'checked' : ''} onchange="toggleRupture(${index}, this.checked)"> Rupture de stock</label>
    `;

    menuAdminContainer.appendChild(div);
  });
}

window.updatePrice = (index, type, value) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  item[`prix_${type}`] = parseFloat(value);
};

window.toggleOption = (index, option, checked) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  if(checked && !item.disponibilite.includes(option)) item.disponibilite.push(option);
  if(!checked) item.disponibilite = item.disponibilite.filter(x => x !== option);
};

window.toggleRupture = (index, checked) => {
  const item = [...menuData.plats, ...menuData.desserts, ...menuData.boissons][index];
  item.rupture = checked;
};

window.exportMenu = () => {
  const blob = new Blob([JSON.stringify(menuData, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'menu-updated.json';
  a.click();
  URL.revokeObjectURL(url);
};

displayMenuAdmin();
