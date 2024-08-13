document.addEventListener("DOMContentLoaded", function(){
    //boton addworker
    document.getElementById("buttonAddWorker").addEventListener("click", addWorker);
    //boton crearProyecto
    document.getElementById("buttonCrearProyecto").addEventListener("click", crearProyecto);
    //boton AsignarTrabajador
    document.getElementById("buttonAsignarTrabajador").addEventListener("click", asignarTrabajador);
    //boton BuscarProyecto
    document.getElementById("buttonBuscarTrabajador").addEventListener("click", showWorker);
});


//clase para crear trabajadores
    class Trabajador {
        #nombre;
        #rut;
        #cargo;
    
        constructor(nombre, rut, cargo){
            this.#nombre = nombre;
            this.#rut = rut;
            this.#cargo = cargo;
        }

        //para mostrar info en una alerta o demas
        mostrarInformacion() {
            return `Nombre: ${this.#nombre}, RUT: ${this.#rut}, Cargo: ${this.#cargo}`;
        }
    
        getNombre(){
            return this.#nombre;
        }
        setNombre(nombre){
            this.#nombre = nombre;
        }
    
        getRut(){
            return this.#rut;
        }
        setRut(rut){
            this.#rut = rut;
        }

        getCargo(){
            return this.#cargo;
        }
        setCargo(cargo){
            this.#cargo = cargo;
        }
    }
//Clase para crear proyectos
    class Proyecto {
        #nombre;
        #trabajadores;
    
        constructor(nombre){
            this.#nombre = nombre;
            this.#trabajadores = [];
        }
    
        getNombre() {
            return this.#nombre;
        }

        setNombre(nombre){
            this.#nombre = nombre;
        }
    
        agregarTrabajador(trabajador) {
            this.#trabajadores.push(trabajador);
        }
    
        mostrarTrabajadores() {
            return this.#trabajadores.map(trabajador => trabajador.mostrarInformacion()).join();
        }
    }



//Arreglo trabajadores y proyectos
const listaTrabajadores = [];
const listaProyectos = [];

//funcion agregar trabajadores
function addWorker(){
    const nombre = document.getElementById("nombre").value;
    const rut = document.getElementById("rut").value;
    const cargo = document.getElementById("cargo").value;

    //para validad textos y numeros
    const textPattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const numberPattern = /^[0-9.]+[-]?[0-9kK]{1}$/;
    
    //validar campos
    if (!nombre || !rut || !cargo){
        document.getElementById("errorTrabajador").textContent = "Por favor llene todos los campos";
        return;
    }  
    if (!textPattern.test(nombre) || !textPattern.test(cargo)){
        document.getElementById("errorTrabajador").textContent = "El nombre y el cargo solo deben contener letras";
        return;
    }
    if (!numberPattern.test(rut)){
        document.getElementById("errorTrabajador").textContent = "El RUT debe contener solo números, puntos y guiones";
        return;
    }

    const newTrabajador = new Trabajador(nombre, rut, cargo);
    listaTrabajadores.push(newTrabajador);
    document.getElementById("errorTrabajador").textContent = "";
    console.log(newTrabajador);
    alert("Nuevo trabajador creado: " + newTrabajador.mostrarInformacion()); 
    actualizarSelectTrabajadores();//para actualizar seleccion trabajadores
    document.getElementById("formWorker").reset();
    document.getElementById("errorTrabajador").textContent = "";
}

//funcion para actualizar selectTrabajador y selectTrabajador2
function actualizarSelectTrabajadores() {
    const select1 = document.getElementById("selectTrabajador");
    const select2 = document.getElementById("selectTrabajador2");

    // Resetea ambos menús desplegables
    select1.innerHTML = '<option value="">Seleccione un Trabajador</option>';
    select2.innerHTML = '<option value="">Seleccione un Trabajador</option>';

    // Agrega las opciones a ambos select
    listaTrabajadores.forEach(trabajador => {
        const option1 = document.createElement("option");
        option1.value = trabajador.getNombre();
        option1.textContent = trabajador.getNombre();
        select1.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = trabajador.getNombre();
        option2.textContent = trabajador.getNombre();
        select2.appendChild(option2);
    });
}

// Función para crear proyectos
function crearProyecto() {
    const nombreProyecto = document.getElementById("nombreProyecto").value;

    if (!nombreProyecto) {
        document.getElementById("errorProyecto").textContent = "Por favor ingrese el nombre del proyecto";
        return;
    }

    const newProyecto = new Proyecto(nombreProyecto);
    listaProyectos.push(newProyecto);
    document.getElementById("errorProyecto").textContent = "";
    document.getElementById("nombreProyecto").value = "";
    actualizarSelectProyectos(); //llamo para actualizar seleccion proyectos
    console.log(newProyecto)
    alert("Nuevo proyecto creado: " + nombreProyecto);
    
}

//funcion para actualizar selectProyectos
function actualizarSelectProyectos() {
    const select = document.getElementById("selectProyecto");
    select.innerHTML = '<option value="">Seleccione un Proyecto</option>'; // Resetea el menú desplegable

    listaProyectos.forEach(proyecto => {
        const option = document.createElement("option");
        option.value = proyecto.getNombre();
        option.textContent = proyecto.getNombre();
        select.appendChild(option);
    });
}


// Función para asignar trabajadores a proyectos
function asignarTrabajador() {
    const nombreProyecto = document.getElementById("selectProyecto").value.trim();
    const nombreTrabajador = document.getElementById("selectTrabajador").value.trim();

    const proyecto = listaProyectos.find(proyecto => proyecto.getNombre() === nombreProyecto);
    const trabajador = listaTrabajadores.find(trabajador => trabajador.getNombre() === nombreTrabajador);

    if (proyecto && trabajador) {
        proyecto.agregarTrabajador(trabajador);
        alert("Trabajador asignado exitosamente.");
    } else {
        alert("Proyecto o trabajador no encontrado.");
    }
}


//agrega metodo buscarTrabajador a la clase Trabajador a traves del prototype
Trabajador.prototype.buscarTrabajador = function(nombre) {
    return listaTrabajadores.find(trabajador => trabajador.getNombre().toLowerCase() === nombre.toLowerCase());
};

//muestra info del trabajador
function showWorker(){
    const workerName = document.getElementById("selectTrabajador2").value.trim();

    if (!workerName) {
        alert("Por favor, selecciona un trabajador.");
        return;
    }

    //usando el metodo agregado de buscarTrabajador
    const trabajadorEncontrado = Trabajador.prototype.buscarTrabajador(workerName);

    if (trabajadorEncontrado) {
        alert("Información del Trabajador:\n" + trabajadorEncontrado.mostrarInformacion());
    } else {
        alert("Trabajador no encontrado.");
    }
}
