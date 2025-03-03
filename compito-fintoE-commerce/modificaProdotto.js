const apiEndpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MzMDgwN2UwYTU1MDAwMTVlNjVkZmQiLCJpYXQiOjE3NDA4NTEyOTgsImV4cCI6MTc0MjA2MDg5OH0.8FGivQMt7Afl-pw0I74fKds5Rv6OQYVyutfvoq4szpE'; // API key

document.addEventListener('DOMContentLoaded', function () {
  const idProdotto = sessionStorage.getItem('idProdotto');
  if (!idProdotto) {
    window.location.href = 'backOffice.html'; // Se non c'è ID, reind al back office
    return;
  }

  // Funzione per caricare i dettagli del prodotto
  function caricaDettagliProdotto() {
    fetch(`${apiEndpoint}${idProdotto}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nel recupero del prodotto');
      }
      return response.json();
    })
    .then(data => {
      
      document.getElementById('nome').value = data.name;
      document.getElementById('descrizione').value = data.description;
      document.getElementById('prezzo').value = data.price;
      document.getElementById('immagine').value = data.imageUrl;
      document.getElementById('brand').value = data.brand;
    })
    .catch(error => {
      console.error('Errore nel caricare il prodotto:', error);
      alert('Errore nel caricare il prodotto!');
    });
  }

  // Carica i dettagli del prodotto all'inizio
  caricaDettagliProdotto();

  // Funzione per inviare le modifiche
  const form = document.getElementById('modifica-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const prodottoModificato = {
      name: document.getElementById('nome').value,
      description: document.getElementById('descrizione').value,
      price: document.getElementById('prezzo').value,
      imageUrl: document.getElementById('immagine').value,
      brand: document.getElementById('brand').value
    };

    
    if (!prodottoModificato.name || !prodottoModificato.description || !prodottoModificato.price || !prodottoModificato.imageUrl || !prodottoModificato.brand) {
      alert('Tutti i campi sono obbligatori!');
      return;
    }

    // Disabilita il pulsante di invio durante l'aggiornamento
    const btnSubmit = form.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Caricamento...';

    
    fetch(`${apiEndpoint}${idProdotto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(prodottoModificato)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nell\'aggiornare il prodotto');
      }
      return response.json();
    })
    .then(data => {
      alert('Prodotto modificato con successo!');
      window.location.href = 'backOffice.html'; // Torna al back office dopo la modifica
    })
    .catch(error => {
      console.error('Errore nell\'aggiornamento del prodotto:', error);
      alert('Errore nel modificare il prodotto!');
    })
    .finally(() => {
      // Riapri il pulsante di invio dopo che l'operazione è finita
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Salva Modifiche';
    });
  });
});


