// get the form element
function addAlumno (){
    const form = document.getElementById('alumno-form');

    // add a submit event listener
    form.addEventListener('submit', (event) => {
        // prevent the default form submission
        event.preventDefault();
        postData(form, 'Alumnos')
    });
}

function addAutor (){
    const form = document.getElementById('autor-form');

    // add a submit event listener
    form.addEventListener('submit', (event) => {
        // prevent the default form submission
        event.preventDefault();
        postData(form, 'Autor')
    });
}

function addCarrera (){
    const form = document.getElementById('carrera-form');

    // add a submit event listener
    form.addEventListener('submit', (event) => {
        // prevent the default form submission
        event.preventDefault();
        postData(form, 'Carrera')
    });
}

function addLibro (){
    const form = document.getElementById('libros-form');

    // add a submit event listener
    form.addEventListener('submit', (event) => {
        // prevent the default form submission
        event.preventDefault();
        postData(form, 'Libros')
    });
}

function postData(form, tabla){
    // create an empty object to store the form data
    const formData = {};

    // loop through the form elements
    for (let element of form.elements) {
        // if the element has a name attribute
        if (element.name) {
        // add a property to the formData object with the element name and value
        formData[element.name] = element.value;
        }
    }

    // convert the formData object to a JSON string
    const jsonData = JSON.stringify(formData);

    // send the JSON data to the API using Fetch
    fetch('https://bibliotecait.azurewebsites.net/api/'+tabla, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
    // check if the response is ok
    if (response.ok) {
        // parse the response body as JSON
        form.reset();
        return response.json();
    } else {
        // throw an error with the status code
        throw new Error(response.status);
    }
    })
    .then(data => {
    // log the data to the console
    console.log(data);
    // do something with the data here
    })
    .catch(error => {
    // log the error to the console
    console.error(error);
    // handle the error here
    });

}