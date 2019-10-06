
const https = require('https');
const api = require('./apiUrls.js');

let apiContent = {};

const handleResponse = (res, data) => {
  switch (res.statusCode) {
    case 200:
      console.log(` ~ [${res.statusCode}] - Successful API request`);
      break;
    case 404:
      console.log(` ~ [${res.statusCode}] - Resource not found`);
      break;
    default:
      console.log(` ~ [${res.statusCode}] - Something went wrong in API request`);
      break;
  }
  apiContent = data;
};

const getGamesData = () => {
  console.log(api.urls.gamespotGames);
  https.get(api.urls.gamespotGames, (res) => {
    let data = '';

    // Concat all chunks of data
    res.on('data', (chunk) => {
      data += chunk;
    });

    // Once the entire respsonse is recieved, handle it
    res.on('end', () => handleResponse(res, data));
  }).on('error', (e) => {
    console.error(`You done slipped up: ${e.message}`);
  });

  return apiContent;
};

module.exports = {
  getGamesData,
};
