// admin-update.js

// Cette fonction envoie le menu modifié vers le serveur Node.js
function sauvegarderMenu() {
  fetch('/update-menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menuData)
  })
  .then(res => {
    if(res.ok) {
      alert('✅ Menu sauvegardé avec succès !');
    } else {
      alert('❌ Erreur lors de la sauvegarde du menu');
    }
  })
  .catch(err => alert('⚠️ Erreur: ' + err.message));
}
