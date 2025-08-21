// Nom du fichier : menu.js

let menuData = {};
const currentDate = new Date();

// Fonction pour charger le JSON
async function loadMenu() {
  const response = await fetch('menu.json');
  menuData = await response.json();
  updateMenuPrices();
  displayMenu();
}

// Fonction pour calculer le prix selon l'heure et le type
function updateMenuPrices() {
  const hour = currentDate.getHours();
  const day = currentDate.getDay(); // 0=Dimanche, 1=Lundi...
  
  for (let category in menuData) {
    menuData[category].forEach(item => {
      // Tarif plat du jour
      if(item.name === "Plat du jour") {
        const firstSept = new Date(currentDate.getFullYear(), 8, 1, 16); // 1 Sept 16h
        if(currentDate >= firstSept) {
          item.currentPrice = item.prices.fromSept1;
        } else {
          item.currentPrice = item.prices.normal;
        }
      } else if(item.prices) {
        // Boissons : tarif selon midi/soir/happy
        if(item.prices.midi && item.prices.soir && item.prices.happy) {
          if(hour >= 9 && hour < 15) item.currentPrice = item.prices.midi;
          else if(day >=1 && day <=3 && hour >=17 && hour <= 2) item.currentPrice = item.prices.soir;
          else if(day >=4 && day <=6 && hour >=17 && hour <=2) item.currentPrice = item.prices.happy;
          else item.currentPrice = item.prices.midi;
        } else {
          item.currentPrice = item.prices.normal || 0;
        }
      }
    });
  }
}

// Fonction pour afficher le menu
function displayMenu() {
  const menuContainer = document.getElementById('menu');
  menuContainer.innerHTML = '';

  for(let category in menuData) {
    const catDiv = document.createElement('div');
    catDiv.className = 'menu-category';
    const catTitle = document.createElement('h2');
    catTitle.textContent = category.toUpperCase();
    catDiv.appendChild(catTitle);

    menuData[category].forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'menu-item';
      let priceText = item.currentPrice ? item.currentPrice + ' €' : '';
      itemDiv.innerHTML = `<span class="item-name">${item.name}</span> <span class="item-price">${priceText}</span>`;
      
      // Si rupture de stock
      if(!item.stock) {
        itemDiv.classList.add('out-of-stock');
        itemDiv.innerHTML += " (Rupture de stock)";
      }

      // Si livraison désactivée
      if(item.delivery === false) {
        itemDiv.innerHTML += " (Sur place uniquement)";
      }

      catDiv.appendChild(itemDiv);
    });

    menuContainer.appendChild(catDiv);
  }
}

// Fonction pour imprimer une liste (réservations ou commandes)
function printList(title, list) {
  let printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>' + title + '</title></head><body>');
  printWindow.document.write('<h1>' + title + '</h1><ul>');
  list.forEach(entry => {
    printWindow.document.write('<li>' + JSON.stringify(entry) + '</li>');
  });
  printWindow.document.write('</ul></body></html>');
  printWindow.document.close();
  printWindow.print();
}

// Charger le menu au démarrage
window.addEventListener('DOMContentLoaded', loadMenu);
