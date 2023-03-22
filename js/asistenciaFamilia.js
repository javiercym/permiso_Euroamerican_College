const url = 'https://espartano.azurewebsites.net/listarFamilia';
const urlGuardar = 'https://localhost:7147/registrarReporteAsistencia';

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
            <option value="${alumno.nombrefamilia}"></option>
            `  
        });
        rellenar2.innerHTML= informacionAlumno
    }
}

function obtenerValorSeleccionado() {
    nombreAlumno2=document.getElementById("nombreAlumno2").value;

    // console.log(nombreAlumno2);
    
    // BuscarAlumno(nombreAlumno2)
  }

function regresar(){
    //para local
    //window.location="/pages/home.html/";
    //para git pages
    window.location="/permiso_Euroamerican_College/pages/home.html";
}


// function BuscarAlumno(nombre){
   
//     nombreAlumno=nombre

//     if(nombreAlumno=="")
//     {
//         alert("Debe ingresar el nombre del alumno");
//     }else{
//         obtenerDatos(nombreAlumno);
//     }
// }

function guardar(){
    var check;
    nombreAlumno2=document.getElementById("nombreAlumno2").value;

    console.log(nombreAlumno2);

    checkbox = document.getElementById("flexSwitchCheckChecked");
    if (checkbox.checked) {
        check ="Si"
        console.log("El checkbox está seleccionado");
    } else {
        check="No"
        console.log("El checkbox no está seleccionado");
    }


    if(nombreAlumno2==""){
        alert("Debe ingresar el nombre del alumno")
    }else{
        let body =  {
            "nombrefamilia": nombreAlumno2,
            "asistio": check,
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


