

//const endpoint = 'https://striveschool-api.herokuapp.com/api/product';
//const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MzMDgwN2UwYTU1MDAwMTVlNjVkZmQiLCJpYXQiOjE3NDA4NTEyOTgsImV4cCI6MTc0MjA2MDg5OH0.8FGivQMt7Afl-pw0I74fKds5Rv6OQYVyutfvoq4szpE';
const apiEndpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MzMDgwN2UwYTU1MDAwMTVlNjVkZmQiLCJpYXQiOjE3NDA4NTEyOTgsImV4cCI6MTc0MjA2MDg5OH0.8FGivQMt7Afl-pw0I74fKds5Rv6OQYVyutfvoq4szpE';  // Sostituisci con la tua API Key

const prodottiDefault = [
  {
    name: "Prodotto 1",
    description: "Descrizione del prodotto 1",
    price: 10.00,
    imageUrl: "https://example.com/img1.jpg",
    brand: "Brand 1"
  },
  {
    name: "Prodotto 2",
    description: "Descrizione del prodotto 2",
    price: 20.00,
    imageUrl: "https://example.com/img2.jpg",
    brand: "Brand 2"
  },
  {
    name: "Prodotto 3",
    description: "Descrizione del prodotto 3",
    price: 30.00,
    imageUrl: "https://example.com/img3.jpg",
    brand: "Brand 3"
  },
  {
    name: "Prodotto 4",
    description: "Descrizione del prodotto 4",
    price: 40.00,
    imageUrl: "https://example.com/img4.jpg",
    brand: "Brand 4"
  }
];

document.addEventListener('DOMContentLoaded', function () {

  // Funzione per aggiungere un prodotto
  function aggiungiProdotto(event) {
    event.preventDefault(); // Impedisce il comportamento predefinito di ricaricare la pagina

    // Recupera i dati dal modulo
    const nome = document.getElementById('nome').value;
    const descrizione = document.getElementById('descrizione').value;
    const prezzo = document.getElementById('prezzo').value;
    const immagine = document.getElementById('immagine').value;
    const brand = document.getElementById('brand').value;

    // Verifica se tutti i campi sono riempiti
    if (!nome || !descrizione || !prezzo || !immagine || !brand) {
      alert('Tutti i campi sono obbligatori!');
      return;
    }

    // Crea l'oggetto del nuovo prodotto
    const nuovoProdotto = {
      name: nome,
      description: descrizione,
      price: prezzo,
      imageUrl: immagine,
      brand: brand
    };

    // Aggiungi il prodotto con la richiesta POST
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` ,
      },
      body: JSON.stringify(nuovoProdotto)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Prodotto aggiunto:', data);
      alert('Prodotto aggiunto con successo!');
      recuperaProdotti(); // Ricarica i prodotti dopo aver aggiunto uno
    })
    .catch(error => {
      console.error('Errore nell\'aggiungere il prodotto:', error);
      alert('Si è verificato un errore. Riprova.');
    });
  }

  // Funzione per recuperare i prodotti dal server
  function recuperaProdotti() {
    console.log('Recupero prodotti dal back office...');

    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Prodotti ricevuti nel back office:', data);

      // Verifica se i prodotti di default esistono, altrimenti li crea
      prodottiDefault.forEach(prodottoDefault => {
        const prodottoEsistente = data.find(prodotto => prodotto.name === prodottoDefault.name);
        if (!prodottoEsistente) {
          // Aggiungi il prodotto di default solo se non esiste
          aggiungiProdottoAPI(prodottoDefault);
        }
      });

      visualizzaProdotti(data);
    })
    .catch(error => {
      console.error('Errore nel recupero dei prodotti nel back office:', error);
    });
  }

  // Funzione per aggiungere i prodotti di default (via API)
  function aggiungiProdottoAPI(prodotto) {
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(prodotto)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Prodotto di default aggiunto:', data);
    })
    .catch(error => {
      console.error('Errore nell\'aggiungere il prodotto di default:', error);
    });
  }

 // Funzione per visualizzare i prodotti nel back office
function visualizzaProdotti(prodotti) {
  const listaProdotti = document.getElementById('lista-prodotti');
  listaProdotti.innerHTML = '';  // Resetta la lista prima di mostrarla

  if (prodotti.length > 0) {
    prodotti.forEach(prodotto => {
      const row = document.createElement('tr'); // Crea una riga della tabella
      row.innerHTML = `
        <td>${prodotto.name}</td>
        <td>${prodotto.description}</td>
        <td>€${prodotto.price}</td>
        <td>${prodotto.brand}</td>
        <td>
          <button class="modifica-prodotto" data-id="${prodotto._id}">Modifica</button>
          <button class="elimina-prodotto" data-id="${prodotto._id}">Elimina</button>
        </td>
      `;
      listaProdotti.appendChild(row); // Aggiungi la riga alla tabella

      // Aggiungi eventi per i pulsanti "Modifica" ed "Elimina"
      row.querySelector('.elimina-prodotto').addEventListener('click', eliminaProdotto);
      row.querySelector('.modifica-prodotto').addEventListener('click', modificaProdotto);
    });
  } else {
    listaProdotti.innerHTML = '<tr><td colspan="5">Nessun prodotto trovato.</td></tr>';
  }
}


  // Funzione per eliminare un prodotto
  function eliminaProdotto(event) {
    const idProdotto = event.target.getAttribute('data-id');
    const conferma = confirm('Sei sicuro di voler eliminare questo prodotto?');
    if (conferma) {
      fetch(`${apiEndpoint}${idProdotto}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Prodotto eliminato:', data);
        alert('Prodotto eliminato con successo!');
        recuperaProdotti(); // Ricarica i prodotti dopo aver eliminato uno
      })
      .catch(error => {
        console.error('Errore nell\'eliminare il prodotto:', error);
        alert('Si è verificato un errore durante l\'eliminazione.');
      });
    }
  }

  // Funzione per modificare un prodotto
  function modificaProdotto(event) {
    const idProdotto = event.target.getAttribute('data-id');
    // Salva l'ID del prodotto nella sessionStorage per utilizzarlo nella pagina di modifica
    sessionStorage.setItem('idProdotto', idProdotto);
    // Reindirizza alla pagina di modifica del prodotto
    window.location.href = 'modificaProdotto.html';
  }

  // Carica i prodotti inizialmente
  recuperaProdotti();
});
