function initMap() {
  const mapDiv = document.getElementById("map");
  const iframe = document.createElement("iframe");
  iframe.width = "100%";
  iframe.height = "300";
  iframe.style.border = "0";
  iframe.src = "https://www.google.com/maps/embed/v1/directions?key=VOTRE_CLE_API&origin=&destination=134+Rue+Robert+Schuman,83300+DRAGUIGNAN&mode=driving";
  mapDiv.appendChild(iframe);
}
window.onload = initMap;
