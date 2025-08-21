import menuData from './menu.json' assert { type: 'json' };

const menuContainer = document.getElementById('menu-container');

// Fonction pour calculer le prix selon l'heure
function getPrix(item) {
  const now = new Date();
  const hours = now.getHours();
  // Exemple pour plat du jour et plats après 17h
  if(item.prix_apres_17h && hours >= 17) return item.prix_apres_17h;
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

afficherMenu();
setInterval(afficherMenu, 60000); // Mise à jour toutes les minutes
