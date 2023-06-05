function setLibros(){
    // add a submit event listener
    const form = document.getElementById('search-form');
    form.addEventListener('submit', async (event) => {
        // prevent the default form submission
        event.preventDefault();
        var cc_biblioteca = document.getElementById("cc-biblioteca");
        const formData = {};
        for (let element of form.elements) {
            // if the element has a name attribute
            if (element.name) {
            // add a property to the formData object with the element name and value
            formData[element.name] = element.value;
            }
        }
        var query = formData['search'];
        if (query != ''){
            console.log(query);
            try {
                let jsonDataElement = await fetchData('libros', query);
                cc_biblioteca.innerHTML = jsonDataElement;
                } catch (error) {
                console.log('ERROR');
                // Handle error if necessary
                }
        }
        else{
            query = '/'
            console.log(query);
            try {
                let jsonDataElement = await fetchData('libros', query);
                cc_biblioteca.innerHTML = jsonDataElement;
                } catch (error) {
                console.log('ERROR');
                // Handle error if necessary
                }
        }
    });
    
}

async function fetchData(table, id) {
  try {
    // wait for the fetch promise to resolve and get the Response object
    let res = await fetch("https://bibliotecait.azurewebsites.net/api/"+table+"/"+id);
    // wait for the json promise to resolve and get the JSON data
    let data = await res.json();
    let jsonDataElement = ``;
    
    var length = data.data.length;
    console.log(length);
    
    if (table === 'libros'){
        if (!length){ 
            jsonDataElement += getLibro(data, jsonDataElement) 
        }
        else{ 
            jsonDataElement += getLibros(data, jsonDataElement);
        }
    }
    console.log(jsonDataElement);      
    return jsonDataElement; // Resolve the Promise with the complete HTML structure
  } catch (error) {
    console.log("ERROR:", error);
    throw error; // Propagate the error by throwing it
  }
}

function getLibro(data, jsonData){
    Object.values(data.data).forEach((element, index) => {
        if (index === 0) {
            jsonData += `<p class="isbn">ISBN: ${element}</p>`;
        } else if (index === 1) {
            jsonData += `<p class="titulo">Titulo: ${element}</p>`;
        } else if (index === 2) {
            jsonData += `<p class="paginas">Paginas: ${element}</p>`;
        } else if (index === 3) {
            jsonData += `<p class="carrera">Carrera: ${element}</p>`;
        } else if (index === 4) {
            jsonData += `<p class="cantidad">Cantidad: ${element}</p>`;
        } else if (index === 6) {
            jsonData += `<img class="imagen" width="150px" src="${element}" />`;
        }
        console.log('hola'); // this should be executed now
    });
    return jsonData;
}

// use map and reduce instead of for and forEach
function getLibros(data, html){
    let jsonData = ``;
    // use map to create a new array with the HTML strings for each element of data.data
    let results = data.data.map((element) => {
      // use Object.values to get an array of values from element
      let values = Object.values(element);
      // use reduce to concatenate the values with HTML tags
      let htmlString = values.reduce((acc, value, index) => {
        if (index === 0) {
          acc += `<p class="isbn">ISBN: ${value}</p>`;
        } else if (index === 1) {
          acc += `<p class="titulo">Titulo: ${value}</p>`;
        } else if (index === 2) {
          acc += `<p class="paginas">Paginas: ${value}</p>`;
        } else if (index === 3) {
          acc += `<p class="carrera">Carrera: ${value}</p>`;
        } else if (index === 4) {
          acc += `<p class="cantidad">Cantidad: ${value}</p>`;
        } else if (index === 6) {
          acc += `<img class="imagen" width="150px" src="${value}" />`;
        }
        console.log('hola'); // this should be executed now
        return acc;
      }, "");
      return htmlString;
    });
    // join the array elements with an empty string and assign it to jsonData
    jsonData = results.join("");
    return html + jsonData;
}

function getAlumno(data, jsonData){
    
        jsonData += `<table> <tr> <th>Numero de control</th> <th>Nombre</th> <th>Apellido</th> <th>Telefono</th> <th>Carrera</th> </tr><tr>`;
        Object.values(data.data).forEach((element, index) => {
            if (index === 0) {
                jsonData += `<td class="ncontrol">${element}</td>`;
            } else if (index === 1) {
                jsonData += `<p class="nombre">${element}</p>`;
            } else if (index === 2) {
                jsonData += `<p class="apellido">${element}</p>`;
            } else if (index === 3) {
                jsonData += `<p class="telefono">${element}</p>`;
            } else if (index === 4) {
                jsonData += `<p class="carrera">${element}</p>`;
            }
            jsonData += `</tr> </table>`;
            console.log('hola'); // this should be executed now
        });
        return jsonData;
}
