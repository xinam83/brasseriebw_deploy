const MIN_DELIVERY = 15.0;
let cart = [];

function updateCartDisplay(){
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    const div=document.createElement("div");
    div.textContent=`${item.name} - ${item.price} € x ${item.quantity}`;
    cartDiv.appendChild(div);
    total+=item.price*item.quantity;
  });
  document.getElementById("cart-total").textContent=`Total: ${total.toFixed(2)} €`;
}

function addToCart(item){
  if(!item.inStock){ alert("Produit en rupture de stock !"); return; }
  let exist=cart.find(c=>c.name===item.name);
  if(exist) exist.quantity++; else cart.push({...item,quantity:1});
  updateCartDisplay();
}

document.getElementById("checkout-btn").addEventListener("click",()=>{
  let total=cart.reduce((sum,it)=>sum+it.price*it.quantity,0);
  if(total<MIN_DELIVERY){
    alert(`Le minimum pour la livraison est de ${MIN_DELIVERY} €`);
    return;
  }
  alert("Commande passée ! (simulation)");
  cart=[];
  updateCartDisplay();
});

// Réservation
document.getElementById("reservation-form").addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  alert(`Réservation : ${data.get("type")}, ${data.get("people")} personnes le ${data.get("date")} à ${data.get("time")}`);
  e.target.reset();
});
