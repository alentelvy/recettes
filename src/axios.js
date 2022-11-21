const axios = require('axios');

// Requêter un utilisateur avec un ID donné.
axios.get('http://localhost:9000/api/recipes')
  .then(function (response) {
    // en cas de réussite de la requête
    console.log(response);
  })
  .catch((error) => {
    // en cas d’échec de la requête
    console.log(error);
  })
  .then(function () {
    // dans tous les cas
  });
