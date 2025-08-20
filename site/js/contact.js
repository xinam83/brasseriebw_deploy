document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contact");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!nom || !email || !message) {
      alert("Merci de remplir tous les champs.");
      return;
    }
    // Simulation d'envoi côté client
    alert("Merci, votre message a été envoyé !");
    form.reset();
  });
});
