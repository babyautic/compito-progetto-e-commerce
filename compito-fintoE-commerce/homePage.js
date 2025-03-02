// Definisci l'endpoint dell'API
const apiEndpoint = 'https://striveschool-api.herokuapp.com/api/product';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MzMDgwN2UwYTU1MDAwMTVlNjVkZmQiLCJpYXQiOjE3NDA4NTEyOTgsImV4cCI6MTc0MjA2MDg5OH0.8FGivQMt7Afl-pw0I74fKds5Rv6OQYVyutfvoq4szpE'; // Usa la tua chiave API
document.addEventListener('DOMContentLoaded', function () {
  function recuperaProdotti() {
    console.log('Recupero prodotti...');

    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`, // Usa correttamente la tua chiave API
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Prodotti ricevuti:', data);
      visualizzaProdotti(data);
    })
    .catch(error => {
      console.error('Errore nel recupero dei prodotti:', error);
    });
  }

  function visualizzaProdotti(prodotti) {
    const listaProdotti = document.getElementById('prodotti-lista');
    listaProdotti.innerHTML = '';  // Resetta la lista prima di mostrarla

    if (prodotti.length > 0) {
      prodotti.forEach(prodotto => {
        const div = document.createElement('div');
        div.classList.add('prodotto');  // Aggiungi una classe per lo stile (se necessario)
        div.innerHTML = `
          <h3>${prodotto.name}</h3>
          <p>${prodotto.description}</p>
          <p>Prezzo: €${prodotto.price}</p>
          <img src="${prodotto.imageUrl}" alt="${prodotto.name}" style="width: 150px; height: 150px;">
        `;
        // Aggiungi un evento di click per ciascun prodotto
        div.addEventListener('click', function() {
          sessionStorage.setItem('idProdotto', prodotto._id); // Salva l'ID del prodotto in sessionStorage
          window.location.href = 'dettaglioProdotto.html'; // Reindirizza alla pagina di dettaglio prodotto
        });

        listaProdotti.appendChild(div);
      });
    } else {
      listaProdotti.innerHTML = '<p>Nessun prodotto trovato.</p>';
    }
  }

  recuperaProdotti();
});
