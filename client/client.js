
const parseJSON = (xhr, content) => {
    // parse response
    const obj = xhr.response ? JSON.parse(xhr.response) : {};

    // if the server sent a message add it to the screen
    if (obj.message) {
        const p = document.createElement('p');
        p.textContent = `Message: ${obj.message}`;
        content.appendChild(p);
    }

    // if response has users, render it
    if (obj.users) {
        const userList = document.createElement('p');
        const users = JSON.stringify(obj.users);
        userList.textContent = users;
        content.appendChild(userList);
    }
};

const handleResponse = (xhr, isHEAD) => {
    // retrieve content
    const content = document.querySelector('#content');

    // xhr status code check
    switch (xhr.status) {
        case 200:
            content.innerHTML = `<b>Success</b>`;
            break;
        case 201:
            content.innerHTML = `<b>Create</b>`;
            break; 
        case 204:
            content.innerHTML = `<b>Updated (No Content)</b>`;
            break;    
        case 400:
            content.innerHTML = `<b>Bad Request</b>`;
            break;
        case 404:
            content.innerHTML = `<b>Resource Not Found</b>`;
            break;
        default:
            content.innerHTML = `Error code not implemented by client.`;
    }

    if (!isHEAD || xhr.status !== 204) {
      parseJSON(xhr, content);  
    }
};

const addUser = (e, form) => {
    const nameAction = form.getAttribute('action');
    const nameMethod = form.getAttribute('method');
    // retrieve doc elements
    const nameField = document.querySelector('#nameField');
    const ageField = document.querySelector('#ageField');
    
    const xhr = new XMLHttpRequest();

    xhr.open(nameMethod, nameAction);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencodedd');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => handleResponse(xhr, false);

    const formData = `name=${nameField.value}&age=${ageField.value}`;

    xhr.send(formData);
    e.preventDefault();
    
    return false;
};

const getUsers = (e) => {
    const url = document.querySelector('#urlField');
    const method = document.querySelector('#methodSelect');
    
    const xhr = new XMLHttpRequest();

    xhr.open(method.value, url.value);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => handleResponse(xhr, method.value === 'head' ? true : false);

    xhr.send();
    e.preventDefault();
    
    return false;
};

const initialize = () => {
    // get button elements
    const addUserElem = document.querySelector('#nameForm');
    const getUserElem = document.querySelector('#userForm');
    // functions to call
    const requestAddUser = (e) => addUser(e, addUserElem);
    const requestGetUsers = (e) => getUsers(e, getUserElem);
    // attach to listener
    addUserElem.addEventListener('submit', requestAddUser);
    getUserElem.addEventListener('submit', requestGetUsers);
};

window.onload = initialize;
