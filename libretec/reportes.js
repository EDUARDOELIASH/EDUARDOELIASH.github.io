function fetchData1(reporte) {
    return fetch("https://bibliotecait.azurewebsites.net/api/"+reporte)
        .then((res) => res.json())
        .then((data) => {
        return data;
        })
        .catch((error) => {
        console.log("ERROR:", error);
        throw error; // Propagate the error by throwing it
    });
}  

function masSolicitado(){
    var cardNumber = document.getElementById("nMasSolicitado");
    var cardTitle = document.getElementById("tMasSolicitado");

    // Call the fetch data function and use the returned data to update the card elements
    // Call the fetch data function and use the returned data to update the card elements
    fetchData1('reportes/libroMasPrestado').then((data) => {
    // Assuming the data is an array of objects with properties "titulo" and "num_prestamos"
    // Get the first element of the array
    var firstElement = data.data[0];
    // Update the card elements with the properties of the first element
    cardNumber.innerHTML = firstElement.num_prestamos;
    cardTitle.innerHTML = firstElement.titulo;
    }).catch((error) => {
    // Handle the error
    console.log(error);
    });
}

function noDevueltos(){
    var cardFooter = document.getElementById("card__footer");            
    fetchData1('reportes/librosNoDevueltos').then((data) => {
    // Assuming the data is an array of objects with properties "titulo" and "num_prestamos"
    // Get the first element of the array
    for (var i = 0; i<data.data.length; i++){
        var firstElement = data.data[i];
        // Update the card elements with the properties of the first element
        cardFooter.innerHTML = `<div class="card__footer-section">
                    <div class="footer-section__data">1</div>
                    <div class="footer-section__label">${firstElement.titulo}</div>
                </div>`;
                console.log(firstElement.titulo);
    }
    // select all the elements with the class footer-section__data
    const dataElements = document.querySelectorAll(".footer-section__data");
    // select all the elements with the class footer-section__label
    const labelElements = document.querySelectorAll(".footer-section__label");
    // create empty arrays to store the data and labels
    const newdata = [];
    const labels = [];
    // loop through the data elements and push their text content into the data array
    for (let element of dataElements) {
        console.log(element.textContent);
    newdata.push(element.textContent);
    }
    // loop through the label elements and push their text content into the labels array
    for (let element of labelElements) {
        console.log(element.textContent);
    labels.push(element.textContent);
    }
    // use the data and labels arrays to create the chart
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels, // use the labels array
            datasets: [{
                label: '# of Votes',
                data: newdata, // use the data array
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
            }]
        },
    });

    }).catch((error) => {
    // Handle the error
    console.log(error);
    });
}

function noPrestamosLibros(){           
    fetchData1('reportes/librosNoDevueltos').then((data) => {
    // Assuming the data is an array of objects with properties "titulo" and "num_prestamos"
    // Get the first element of the array
    for (var i = 0; i<data.data.length; i++){
        var firstElement = data.data[i];
    }
    // create a chart configuration object
    const config = {
    type: 'bar', // set the type to bar
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // provide an array of labels for the categories
        datasets: [{
        label: '# of Votes', // provide a label for the dataset
        data: [12, 19, 3, 5, 2, 3], // provide an array of data values for each category
        backgroundColor: [ // provide an array of colors for the bars
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        }]
    },
    };

    // get a reference to the canvas element
    var ctx = document.getElementById('myChart2');
    // create a new chart instance using the configuration object
    var myChart = new Chart(ctx, config);


    }).catch((error) => {
    // Handle the error
    console.log(error);
    });
}

function cargarDatos(){
    noDevueltos();
    masSolicitado();
    noPrestamosLibros();
}