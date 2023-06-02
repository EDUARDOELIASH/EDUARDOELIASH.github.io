 // get the form element
const buttonOpenReportes = document.getElementById('open-reportes');
const buttonAddAlumnos = document.getElementById('btnAgregar');
const buttonQueryAlumnos = document.getElementById('btnConsultar');
const buttonUpdateAlumnos = document.getElementById('btnActualizar');
const buttonClose = document.getElementById('close-modal');
const modal = document.getElementById('modalFrame');
const toggleActiveModal = () => modal.classList.toggle('active');

// Define a function that will execute some code and call toggleActiveModal
const openAgregar = ()=> {
    toggleActiveModal();
    var toggleB = document.getElementById("dm-agregar")
    const agregar = toggleB.querySelector(".dropdown-toggle");

    console.log(agregar.textContent);
    if (agregar.textContent == 'Alumnos'){
        const modalContent = document.querySelector('.content');
        modalContent.innerHTML = `<div class="content-agregar">
            <h1>Agregar Alumno</h1>
            <form class='form' id="alumno-form">
                <input type="text" id="ncontrol" name="ncontrol" placeholder="Numero de control">
                <input type="text" id="nombre" name="nombre" placeholder="Nombre">
                <input type="text" id="apellido" name="apellido" placeholder="Apellido">
                <input type="text" id="telefono" name="telefono" placeholder="Telefono">
                <input type="text" id="carrera" name="carrera" placeholder="Carrera">
                <input type="submit" value="Agregar">
            </form>`;
        addAlumno();
    }
    if (agregar.textContent == 'Autor'){
        const modalContent = document.querySelector('.content');
        modalContent.innerHTML = `<div class="content-agregar">
            <h1>Agregar Autor</h1>
            <form class='form' id="autor-form">
            <input type="text" id="autor-id" name="autor_id" placeholder="ID autor">

            <input type="text" id="autor-nombre" name="nombre" placeholder="Nombre">

            <input type="text" id="autor-apellido" name="apellido" placeholder="Apellido">

            <input type="submit" value="Agregar">

        </form>`;
        addAutor();
    }
    if (agregar.textContent == 'Carrera'){
        const modalContent = document.querySelector('.content');
        modalContent.innerHTML = `<div class="content-agregar">
            <h1>Agregar Carrera</h1>
            <form class='form' id="carrera-form">
            <input type="text" id="carrera-id" name="id" placeholder="ID carrera">

            <input type="text" id="carrera-nombre" name="nombre" placeholder="Carrera">

            <input type="submit" value="Agregar">

            </form>`;
        addCarrera();
    }
    if (agregar.textContent == 'Libros'){
        const modalContent = document.querySelector('.content');
        modalContent.innerHTML = `<div class="content-agregar">
            <h1>Agregar Libro</h1>
            <form class='form' id="libros-form">

            <input type="text" id="libro-isbn" name="isbn" placeholder="ISBN">

            <input type="text" id="libro-titulo" name="titulo" placeholder="Titulo">

            <input type="text" id="libro-paginas" name="paginas" placeholder="Paginas">

            <input type="text" id="libro-carrera" name="carrera" placeholder="Carrera">

            <input type="number" id="libro-cantidad" name="cantidad" placeholder="Cantidad">

            <input type="text" id="libro-editorial" name="editorial_id" placeholder="Editorial">

            <input type="text" id="imagen" name="url_image" placeholder="URL">

            <input type="submit" value="Agregar">

            </form>`;
        addLibro();
    }
    if (agregar.textContent == 'Editorial'){
        const modalContent = document.querySelector('.content');
        modalContent.innerHTML = `<div class="content-agregar">
            <h1>Agregar Editorial</h1>
            <form class='form' id="alumno-form">
                <input type="text" id="editorial-id" name="id" placeholder="ID editorial">
                <input type="text" id="editorial-nombre" name="nombre" placeholder="Nombre">
                <input type="submit" value="Agregar">
            </form>`;
        addAlumno();
    }
    if (agregar.textContent == 'Prestamos'){
        const modalContent = document.querySelector('.content');
        modalContent.innerHTML = `<div class="content-agregar">
            <h1>Agregar Prestamo</h1>
            <form class='form' id="prestamos-form">
            <input type="text" id="prestamos-id" name="id" placeholder="ID prestamo">

             <input type="text" id="prestamos-isbn" name="isbn" placeholder="ISBN libro">

             <input type="text" id="prestamos-entregado" name="alumno_id" placeholder="ID alumno">

             <input type="text" id="prestamos-fecha" name="fecha" placeholder="Fecha">

             <input type="text" id="prestamos-fechaentrega" name="fechaentrega" placeholder="Fecha de entrega">

             <input type="text" id="prestamos-entregado" name="entregado" placeholder="Entregado">

            <input type="submit" value="Agregar">

        </form>`;
        addAlumno();
    }
    if (agregar.textContent == 'Devolucion'){
        const modalContent = document.querySelector('.content');
        modalContent.innerHTML = `<div class="content-agregar">
            <h1>Agregar Devolucion</h1>
            <form class='form' id="devolucion-form">
            <input type="text" id="devolucion-id" name="id" placeholder="ID devolucion">

             <input type="text" id="devolucion-isbn" name="isbn" placeholder="ISBN libro">

             <input type="text" id="devolucion-entregado" name="alumno_id" placeholder="ID alumno">

             <input type="text" id="devolucion-fecha" name="fecha" placeholder="Fecha">

             <input type="text" id="devolucion-retraso" name="retraso" placeholder="Retraso">

            <input type="submit" value="Agregar">

        </form>`;
        addAlumno();
    }
}
const openReportes = () => {
    // You can add any code here
    toggleActiveModal();
    console.log('Opening modal');
    const modalContent = document.querySelector('.content');
    modalContent.innerHTML = `<div class="content-reportes">
        <h1>Reportes</h1>
        <p>2023</p>
        <div class="cards">
            <div class="card" id="card">
                <h1 id="nMasSolicitado"></h1>
                <div class="container2">
                    <h4 id="tMasSolicitado"><b>Titulo</b></h4> 
                    <p>Libro mas solicitado</p> 
                </div>
            </div>
            <div class="card" id="charts">
                <div class="card__content">
                    <div class="card__header">
                        <div class="header__title">
                            Libros no devueltos<i class="header__title-icon far fa-question-circle"></i>     
                        </div>
                    </div>
                    <canvas class="chart" id="myChart" width="300" height="300"></canvas>
                    <div id="card__footer">
                        
                    </div>
                </div>
            </div>

            <div class="card" id="charts">
                <div class="card__content">
                    <div class="card__header">
                        <div class="header__title">
                            Cantidad prestamos de libro<i class="header__title-icon far fa-question-circle"></i>     
                        </div>
                    <select class="header__button">
                            <option value="value-1">Mes</option>
                            <option value="value-2">1</option>
                            <option value="value-3">2</option>
                            <option value="value-4">3</option>
                            <option value="value-5">4</option>
                            <option value="value-6">5</option>
                            <option value="value-7">6</option>
                            <option value="value-8">7</option>
                            <option value="value-9">8</option>
                            <option value="value-10">9</option>
                            <option value="value-11">10</option>
                            <option value="value-12">11</option>
                            <option value="value-13">12</option>
                        </select>
                    </div>
                    <canvas class="chart" id="myChart2" width="300" height="300"></canvas>
                    <div id="card__footer">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    cargarDatos();
};
buttonClose.addEventListener('click', toggleActiveModal);
buttonOpenReportes.addEventListener('click', openReportes);