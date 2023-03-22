const url = 'https://espartano.azurewebsites.net/alumnos';
const urlGuardar = 'https://espartano.azurewebsites.net/registraSalida';

let rellenar = document.querySelector("#rellenar"); 
let rellenar2 = document.querySelector("#rellenar2"); 

var nombreAlumno;
var cantidadResultados;

var input = document.getElementById("nombreAlumno");

if (localStorage.getItem("usuario") ==null) {
    //window.location="/index.html";
    window.location="/permiso_Euroamerican_College/";
}
window.onload = () => {
    mostrarSpinner();
    obtenerNombreAlumno();
}

function mostrarSpinner() {
    document.getElementById("spinner-container").style.display = "block";
    document.getElementById("formulario-container").style.display = "none";
}
function mostrarFormulario() {
    document.getElementById("spinner-container").style.display = "none";
    document.getElementById("formulario-container").style.display = "block";
}

function obtenerNombreAlumno(){

    fetch(url)
    .then(response => response.json())
    .then(json=>{
        imprimir2(json.data);
        mostrarFormulario();
    });

    let imprimir2 = (array)=>{

        var informacionAlumno ="";

        array.forEach((alumno) => {

            informacionAlumno+=
            ` 
            <option value="${alumno.alumno}">${alumno.alumno}</option>
            `  
        });
        rellenar2.innerHTML= informacionAlumno
    }
}

function obtenerValorSeleccionado() {
    nombreAlumno2=document.getElementById("nombreAlumno2").value;
    console.log(nombreAlumno2);
    BuscarAlumno(nombreAlumno2)
  }

function regresar(){
    //para local
    //window.location="/pages/home.html/";
    //para git pages
    window.location="/permiso_Euroamerican_College/pages/home.html";
}

async function obtenerDatos(nombreAlumno){
    await fetch(url+"/"+nombreAlumno)
        .then(response => response.json())
        .then(json=>{imprimir(json.data),
            cantidadResultados=(json.mensaje);
        });
    if(cantidadResultados =="Se encontraron 0 resultado(s)."){
        alert("No se encontraron resultados")
    }
}

let imprimir = (array)=>{

    var informacionAlumno ="";

    array.forEach((alumno) => {
        
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = fecha.getMonth() + 1; // Sumamos 1 porque los meses empiezan en 0
        const day = fecha.getDate();
        const hours = fecha.getHours();
        const minutes = fecha.getMinutes();
        const seconds = fecha.getSeconds();
  
        const fechaFormateada = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        informacionAlumno+=
        ` 
        <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Apellidos y nombres</span>
        <input type="text" id="nombreApellido" class="form-control" value="${alumno.alumno}"disabled>
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Codigo Alumno</span>
        <input type="text" id="codigoAlumno"  class="form-control" value="${alumno.idalumno}" disabled>
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Grado y sección</span>
        <input type="text" id="gradoSeccion"  class="form-control" value="${alumno.nivel}" disabled>
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Conductor</span>
        <input type="text" id="conductor"  class="form-control" value="${alumno.conductor}" disabled>
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">N° Camioneta</span>
        <input type="text" id="camioneta"  class="form-control" value="${alumno.ncamioneta}" disabled>
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Observación</span>
        <input type="text" id="observacion" class="form-control" placeholder="Observación" >
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Fecha</span>
        <input type="text" id="fecha"  class="form-control" value="${fechaFormateada}" disabled>
    </div>

    `   
        
    });
    rellenar.innerHTML= informacionAlumno
}

function BuscarAlumno(nombre){
   
    nombreAlumno=nombre

    if(nombreAlumno=="")
    {
        alert("Debe ingresar el nombre del alumno");
    }else{
        obtenerDatos(nombreAlumno);
    }
}

function guardar(){
    var nombreApellido=document.getElementById("nombreApellido").value;
    var codigoAlumno=document.getElementById("codigoAlumno").value;
    var gradoSeccion=document.getElementById("gradoSeccion").value;
    var conductor=document.getElementById("conductor").value;
    var camioneta=document.getElementById("camioneta").value;
    var observacion=document.getElementById("observacion").value;

    if(observacion==""){
        alert("Debe ingresar la observacion")
    }else{
        let body =  {
            "idalumno": codigoAlumno,
            "alumno": nombreApellido,
            "nivel": gradoSeccion,
            "conductor": conductor,
            "ncamioneta": camioneta,
            "observacion": observacion,
            "fecha": "2023-03-20"
        }
        fetch(urlGuardar, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
          console.log(json);
          alert(json.mensaje)
          location.reload();
         })
        .catch(err => console.log(err));
    }
}


