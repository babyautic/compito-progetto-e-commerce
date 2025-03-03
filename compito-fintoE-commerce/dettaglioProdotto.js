const apiEndpoint = 'https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MzMDgwN2UwYTU1MDAwMTVlNjVkZmQiLCJpYXQiOjE3NDA4NTEyOTgsImV4cCI6MTc0MjA2MDg5OH0.8FGivQMt7Afl-pw0I74fKds5Rv6OQYVyutfvoq4szpE';  // API Key

document.addEventListener('DOMContentLoaded', function () {
    const idProdotto = sessionStorage.getItem('idProdotto');
    if (!idProdotto) {
      window.location.href = 'homePage.html'; 
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
        const dettagliDiv = document.getElementById('dettagli-prodotto');
        dettagliDiv.innerHTML = `
          <h2>${data.name}</h2>
          <p><strong>Descrizione:</strong> ${data.description}</p>
          <p><strong>Prezzo:</strong> €${data.price}</p>
          <p><strong>Brand:</strong> ${data.brand}</p>
          <img src="${data.imageUrl}" alt="${data.name}" style="width: 300px; height: 300px;">
        `;
      })
      .catch(error => {
        console.error('Errore nel caricare il prodotto:', error);
        alert('Errore nel caricare il prodotto!');
      });
    }
  
    caricaDettagliProdotto();
  });
  