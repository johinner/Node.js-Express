const http = require('http');
const cursos = require('./cursos.js');

const PUERTO = 3002;

const servidor = http.createServer((req,res) => {
    // Sintaxis de desestructuracion
    const{method} = req;

    switch(method){
        case 'GET':
            return manejarSolicitudGET(req, res);
        case 'POST':
            return manejarSolicitudPOST(req, res);
        case 'DELETE':
            return manejarSolicitudDELETE(req, res);
        default:
            console.log(`El metodo usado no puede ser manejado por el servidor: ${method}`);
    }
});

servidor.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto http://localhost:${PUERTO}/`)
})

manejarSolicitudGET = (req, res) => {
    const path = req.url;

    if(path === '/'){
       // res.statusCode = 200; defaul
        return res.end('Bienvenidos a mi primer servidor y API creados con Node.js - nodemon')
    }else if (path === '/cursos'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(cursos.infoCursos))
    }else if (path === '/cursos/programacion'){
        return res.end(JSON.stringify(cursos.infoCursos.programacion))
    }
    res.statusCode = 404;
     return res.end('El rescurso solicitado no existe..');
}

manejarSolicitudPOST = (req, res) => {
    const path = req.url

    if(path === '/cursos/programacion'){
        let cuerpo = '';

        req.on('data', contenido => {
            cuerpo += contenido.toString();
        });

        req.on('end', () => {
            console.info(cuerpo);
            console.log(typeof cuerpo);

            // Convertir a un objeto de JavaScript.
            cuerpo = JSON.parse(cuerpo);
            console.log(typeof cuerpo);
            console.log(cuerpo.titulo);
            res.end(`El servidor recibio una solicitud POST PARA ${path}`)
        })
    }
}

manejarSolicitudDELETE = (req, res) => {
    const path = req.url;
    if(path === '/borrar'){
        res.statusCode = 202;
        return res.end(`El servidor recibio una solicitud ${req.method}`)
    }
}