async function loadGallery(){
  const res = await fetch("/gallery.json");
  const data = await res.json();
  const container = document.getElementById("gallery");
  container.innerHTML = "";
  data.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.style.width = "200px";
    image.style.margin = "10px";
    container.appendChild(image);
  });
}
loadGallery();
