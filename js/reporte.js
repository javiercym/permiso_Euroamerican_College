const url = 'https://espartano.azurewebsites.net/reporteSalida';
let rellenar = document.querySelector("#rellenar"); 
var cantidadResultados;

if (localStorage.getItem("usuario") ==null) {
    //window.location="/index.html";
    window.location="/permiso_Euroamerican_College/";
}

function regresar(){
    //para local
    //window.location="/pages/home.html";
    //para git pages
     window.location="/permiso_Euroamerican_College/pages/home.html";
}

window.onload = () => {
    obtenerDatos();
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
        const fechaOriginal = new Date(alumno.fecha);
        const year = fechaOriginal.getFullYear();
        const month = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaOriginal.getDate().toString().padStart(2, '0');
        const hours = fechaOriginal.getHours().toString().padStart(2, '0');
        const minutes = fechaOriginal.getMinutes().toString().padStart(2, '0');
        const seconds = fechaOriginal.getSeconds().toString().padStart(2, '0');

        const fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
        informacionAlumno+=
        ` 
        <tr>
        <th>${alumno.alumno}</th>
        <td>${alumno.idalumno}</td>
        <td>${alumno.nivel}</td>
        <td>${alumno.conductor}</td>
        <td>${alumno.ncamioneta}</td>
        <td>${alumno.observacion}</td>
        <td>${fechaFormateada}</td>
        </tr>
        `   
        
    });
    rellenar.innerHTML= informacionAlumno
}

function guardar(){
    var nombreApellido=document.getElementById("nombreApellido").value;
    var codigoAlumno=document.getElementById("codigoAlumno").value;
    var gradoSeccion=document.getElementById("gradoSeccion").value;
    var conductor=document.getElementById("conductor").value;
    var camioneta=document.getElementById("camioneta").value;
    var observacion=document.getElementById("observacion").value;

    console.log("observacion: " + observacion)

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
              .then(json => console.log(json))
              .catch(err => console.log(err));

    }

}