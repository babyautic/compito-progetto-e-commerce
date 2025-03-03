
const apiEndpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MzMDgwN2UwYTU1MDAwMTVlNjVkZmQiLCJpYXQiOjE3NDA4NTEyOTgsImV4cCI6MTc0MjA2MDg5OH0.8FGivQMt7Afl-pw0I74fKds5Rv6OQYVyutfvoq4szpE';  //API Key

const prodottiDefault = [
  {
    name: "Prodotto Default 1",
    description: "Questo prodotto non potrà essere eliminato",
    price: 10.00,
    imageUrl: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_144637617?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    brand: "Brand"
  },
  {
    name: "Prodotto Default 2",
    description: "Questo prodotto non potrà essere eliminato",
    price: 20.00,
    imageUrl: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_146267702?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
    brand: "Brand 2"
  },
  {
    name: "Prodotto Default 3",
    description: "Questo prodotto non potrà essere eliminato",
    price: 30.00,
    imageUrl: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_133555273?x=280&y=190&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=280&ey=190&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=280&cdy=190",
    brand: "Brand 3"
  },
  {
    name: "Prodotto Default 4",
    description: "Questo prodotto non potrà essere eliminato",
    price: 549.00,
    imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR0XmHJf7y1GHmswcQPb2JAipy2LTCjpw5W1D0pM3GeWYnHy6pq_YO_DqpdJu55C2zrfBqmPVEx1y4OXGXbuB5fh6P36Tf82IOOph8S8SnyZOeSleTO8FmYl5FqPukUjeYhdnNGKto&usqp=CAc",
    brand: "Brand 4"
  }
];

document.addEventListener('DOMContentLoaded', function () {

  // Funzione per aggiungere un prodotto
  function aggiungiProdotto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descrizione = document.getElementById('descrizione').value;
    const prezzo = document.getElementById('prezzo').value;
    const immagine = document.getElementById('immagine').value;
    const brand = document.getElementById('brand').value;

    
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
      recuperaProdotti();
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
  listaProdotti.innerHTML = '';  

  if (prodotti.length > 0) {
    prodotti.forEach(prodotto => {
      const row = document.createElement('tr');
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
        recuperaProdotti(); 
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
    sessionStorage.setItem('idProdotto', idProdotto);
    window.location.href = 'modificaProdotto.html';
  }

  // Carica i prodotti inizialmente
  recuperaProdotti();
});
