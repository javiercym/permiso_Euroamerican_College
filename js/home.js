if (localStorage.getItem("usuario") ==null) {
    window.location="/index.html";
    //window.location="/matricula_Euroamerican_College/";
}

function cerrarSesion(){
    localStorage.clear();
    //para local
    //window.location="/index.html";
    //para git pages
    window.location="/permiso_Euroamerican_College/";
}
function registro(){
    window.location="/pages/registro.html";
}
function salidasEspeciales(){
    window.location="/pages/salidasEspeciales.html";
}
function reporte(){
    window.location="/pages/reporte.html";
}


