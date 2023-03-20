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
    //para local
    //window.location="/pages/registro.html";
    //para git pages
    window.location="/permiso_Euroamerican_College/pages/registro.html";

}
function salidasEspeciales(){
    //para local
    //window.location="/pages/salidasEspeciales.html";
    //para git pages
    window.location="/permiso_Euroamerican_College/pages/salidasEspeciales.html";
}
function reporte(){
    //para local
    //window.location="/pages/reporte.html";
    //para git pages
    window.location="/permiso_Euroamerican_College/pages/registro.html";
}


