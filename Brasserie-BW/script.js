// 🔹 Config Firebase
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJECT.firebaseapp.com",
  projectId: "TON_PROJECT",
  storageBucket: "TON_PROJECT.appspot.com",
  messagingSenderId: "TON_ID",
  appId: "TON_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🔹 MENU
const menuContainer = document.getElementById('menu-items');
const cartItems = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
let cart = [];

db.collection('menu').onSnapshot(snapshot => {
  menuContainer.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${data.image}" alt="${data.name}">
      <h3>${data.name}</h3>
      <p>${data.price} €</p>
      <button onclick="addToCart('${data.name}', ${data.price})">Ajouter au panier</button>
    `;
    menuContainer.appendChild(card);
  });
});

window.addToCart = (name, price) => {
  cart.push({name, price});
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} €`;
    cartItems.appendChild(li);
    total += item.price;
  });
  totalEl.textContent = total;
}

document.getElementById('checkout').addEventListener('click', () => {
  if(cart.length === 0) { alert("Panier vide"); return; }
  alert(`Commande validée: ${cart.map(i => i.name).join(', ')}`);
  cart = [];
  renderCart();
});

// 🔹 RESERVATION
const form = document.getElementById('reservation-form');
const msg = document.getElementById('reservation-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const reservation = {
    name: form.name.value,
    date: form.date.value,
    time: form.time.value,
    guests: form.guests.value
  };
  db.collection('reservations').add(reservation)
    .then(() => {
      msg.textContent = "Réservation enregistrée !";
      form.reset();
    })
    .catch(err => { console.error(err); msg.textContent = "Erreur..."; });
});
