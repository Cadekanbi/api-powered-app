const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/welcome': htmlHandler.getIndex,
  '/': htmlHandler.getHome,
  '/style.css': htmlHandler.getCSS,
  '/client.js': htmlHandler.getJS,
  '/getUsers': jsonHandler.getUsers,
  '/notReal': jsonHandler.notReal,
  '/addUser': jsonHandler.addUser,
  '/getGames': jsonHandler.getGames,
  notFound: jsonHandler.notFound,
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const res = response;

    const body = [];

    // just throw a bad request and send it back, if
    // the upload stream has an error
    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyStr = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyStr);

      // addUser
      jsonHandler.addUser(request, res, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl) => {
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

const onRequest = (request, response) => {
  // parse url
  // returns an obj of url parts by name
  const parsedUrl = url.parse(request.url);

  // check if method was POST, otherwise GET
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
