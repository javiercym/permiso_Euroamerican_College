const url = 'https://espartano.azurewebsites.net/reporteSalidaEspeciales';
const urlBuscar = 'https://espartano.azurewebsites.net/alumnos';
const urlGuardar = "https://espartano.azurewebsites.net/registraSalidaEspecial"; 





let rellenar = document.querySelector("#rellenar"); 
let rellenar2 = document.querySelector("#rellenar2"); 
let rellenar3 = document.querySelector("#rellenar3"); 
var cantidadResultados;

if (localStorage.getItem("usuario") ==null) {
    //window.location="/index.html";
    window.location="/permiso_Euroamerican_College/";
}

window.onload = () => {
    obtenerDatos();
    obtenerNombreAlumno();
}

function obtenerNombreAlumno(){

    fetch(urlBuscar)
    .then(response => response.json())
    .then(json=>{imprimir2(json.data)
    });

    let imprimir2 = (array)=>{

        var informacionAlumno ="";

        array.forEach((alumno) => {

            informacionAlumno+=
            ` 
            <option value="${alumno.alumno}">${alumno.alumno}</option>

            `  
        });
        rellenar3.innerHTML= informacionAlumno
    }
}

function obtenerValorSeleccionado() {
    nombreAlumno2=document.getElementById("nombreAlumno2").value;
    console.log(nombreAlumno2);
    BuscarAlumno(nombreAlumno2)
}



function regresar(){
    //para local
    //window.location="/pages/home.html";
    //para git pages
     window.location="/permiso_Euroamerican_College/pages/home.html";
}

async function obtenerDatos(){
    await fetch(url)
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
        
        // console.log(index);
        informacionAlumno+=
        ` 
        <tr>
            <th>${alumno.alumno}</th>
            <td>${alumno.idalumno}</td>
            <td>${alumno.observacion}</td>
        </tr>
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
        obtenerDatos2(nombreAlumno);
    }
}

async function obtenerDatos2(nombreAlumno){
    await fetch(urlBuscar+"/"+nombreAlumno)
        .then(response => response.json())
        .then(json=>{imprimir2(json.data),
            cantidadResultados=(json.mensaje);
        });
    if(cantidadResultados =="Se encontraron 0 resultado(s)."){
        alert("No se encontraron resultados")
    }
}

let imprimir2 = (array)=>{

    var informacionAlumno ="";

    array.forEach((alumno) => {

        informacionAlumno+=
        ` 
        <span style="color: white;">id alumno: <span id="codigoAlumno">${alumno.idalumno}</span></span>
        
        <div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-10">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Apellidos y nombres</span>
                <input type="text" id="nombreApellido" class="form-control" value="${alumno.alumno}" disabled>
            </div>
    
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Observación</span>
                <input type="text" id="observacion" class="form-control" placeholder="Observación" >
            </div>
        </div>
        `
        
    });
    rellenar2.innerHTML= informacionAlumno
}

function guardar(){

    var nombreApellido=document.getElementById("nombreApellido").value;
    var codigoAlumno=document.getElementById("codigoAlumno");
    var observacion=document.getElementById("observacion").value;

    if(observacion==""){
        alert("Debe ingresar la observacion")
    }else{
        let body =  {
            "idalumno": codigoAlumno.textContent,
            "alumno": nombreApellido,
            "observacion": observacion,

        }
 
        fetch(urlGuardar, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
          console.log(json);
          location.reload();
         })
        .catch(err => console.log(err));

    }

}
