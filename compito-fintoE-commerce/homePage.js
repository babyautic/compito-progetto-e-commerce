
const apiEndpoint = 'https://striveschool-api.herokuapp.com/api/product'; //EndPoint
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MzMDgwN2UwYTU1MDAwMTVlNjVkZmQiLCJpYXQiOjE3NDA4NTEyOTgsImV4cCI6MTc0MjA2MDg5OH0.8FGivQMt7Afl-pw0I74fKds5Rv6OQYVyutfvoq4szpE'; //Api Key 
document.addEventListener('DOMContentLoaded', function () {
  function recuperaProdotti() {
    console.log('Recupero prodotti...');

    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
    listaProdotti.innerHTML = ''; 

    if (prodotti.length > 0) {
      prodotti.forEach(prodotto => {
        const div = document.createElement('div');
        div.classList.add('prodotto');  
        div.innerHTML = `
          <h3>${prodotto.name}</h3>
          <p>${prodotto.description}</p>
          <p>Prezzo: €${prodotto.price}</p>
          <img src="${prodotto.imageUrl}" alt="${prodotto.name}" style="width: 150px; height: 150px;">
        `;
        
        div.addEventListener('click', function() {
          sessionStorage.setItem('idProdotto', prodotto._id); 
          window.location.href = 'dettaglioProdotto.html'; //Rend page
        });

        listaProdotti.appendChild(div);
      });
    } else {
      listaProdotti.innerHTML = '<p>Nessun prodotto trovato.</p>';
    }
  }

  recuperaProdotti();
});
