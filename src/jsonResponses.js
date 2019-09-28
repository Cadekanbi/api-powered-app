
const users = {};

const jsonResponse = (request, response, status, object) => {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const jsonResponseMeta = (request, response, status) => {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end();
};

// Handle each status
const getUsers = (request, response) => {
  const obj = {
    users,
  };

  return jsonResponse(request, response, 200, obj);
};

const notReal = (request, response) => {
  let obj = {
      id: 'notFound',
      message: 'The page you are looking for was not found.',
    };

    return jsonResponse(request, response, 404, obj);
};

const addUser = (request, response, body) => {
  const obj = {
    message: 'Name and age are both required.',
  };

  // check both fields
  if ((!body.name || !body.age)) {
    obj.id = 'missingParams';
    return jsonResponse(request, response, 400, obj);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  // update
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  // response w/ message
  if (responseCode === 201) {
    obj.message = 'Created Successfully';
    return jsonResponse(request, response, responseCode, obj);
  }
  // 204 response
  return jsonResponseMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const obj = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
  };

  jsonResponse(request, response, 404, obj);
};

module.exports = {
  getUsers,
  addUser,
  notReal,
  notFound,
};
