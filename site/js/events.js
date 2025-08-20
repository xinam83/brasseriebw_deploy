fetch('events.json')
  .then(response => response.json())
  .then(events => {
    const container = document.getElementById('events-container');
    events.forEach(event => {
      let div = document.createElement('div');
      div.classList.add('event-item');
      div.innerHTML = `<h4>${event.nom}</h4>
        <p>${event.date} ${event.heure_debut} - ${event.heure_fin}</p>
        <p>${event.description}</p>
        <img src="${event.image}" alt="${event.nom}" style="width:100%;max-width:300px;">`;
      container.appendChild(div);
    });
  });
