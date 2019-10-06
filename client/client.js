
const parseJSON = (xhr) => {
    const response = JSON.parse(xhr.response);
    console.log(response.games);
    return JSON.parse(response['games']);
};

const handleResponse = (xhr, data) => {
    // retrieve content
    const feed = document.querySelector('#content');
    let parsedResponse;

    // xhr status code check
    switch (xhr.status) {
        case 200:
            console.log('Success!');
            parsedResponse = parseJSON(xhr, data);
            break;
        case 404:
            console.log('Resource not found.');
            break;
        default:
            console.log('Well Crap... :/');
            break;
    }
    // const p = document.createElement('p');
    // p.textContent = `Message: ${obj.message}`;
    // content.appendChild(p);

    if (parsedResponse) {
        const count = parsedResponse.limit;
        const results = parsedResponse.results;
        for (let i = 0; i < count; i++) {
            const img = document.createElement('img');
            img.src = results[i].image.square_small;
            const h2 = document.createElement('h2');
            h2.textContent = results[i].name;
            const p = document.createElement('p');
            p.textContent = results[i].description;
            feed.appendChild(img);
            feed.appendChild(h2);
            feed.appendChild(p);
        }
    } 
};

// const addUser = (e, form) => {
//     const nameAction = form.getAttribute('action');
//     const nameMethod = form.getAttribute('method');
//     // retrieve doc elements
//     const nameField = document.querySelector('#nameField');
//     const ageField = document.querySelector('#ageField');
    
//     const xhr = new XMLHttpRequest();

//     xhr.open(nameMethod, nameAction);
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencodedd');
//     xhr.setRequestHeader('Accept', 'application/json');
//     xhr.onload = () => handleResponse(xhr, false);

//     const formData = `name=${nameField.value}&age=${ageField.value}`;

//     xhr.send(formData);
//     e.preventDefault();
    
//     return false;
// };

// const getUser = () => {
//     const url = document.querySelector('#urlField');
//     const method = document.querySelector('#methodSelect');
    
//     const xhr = new XMLHttpRequest();

//     xhr.open(method.value, url.value);
//     xhr.setRequestHeader('Accept', 'application/json');
//     xhr.onload = () => handleResponse(xhr, method.value === 'head' ? true : false);

//     xhr.send();
//     e.preventDefault();
    
//     return false;
// };

const getGames = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/getGames');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => handleResponse(xhr, 'games');
    xhr.send();
    
    return false;
};


const initialize = () => {
    // // get button elements
    // const addUserElem = document.querySelector('#nameForm');
    // const getUserElem = document.querySelector('#userForm');
    // // functions to call
    // const requestAddUser = (e) => addUser(e, addUserElem);
    // const requestGetUsers = (e) => getUsers(e, getUserElem);

    getGames();
    // // attach to listener
    // addUserElem.addEventListener('submit', requestAddUser);
    // getUserElem.addEventListener('submit', requestGetUsers);
};

window.onload = initialize;
