const express = require('express');
const {programacion} = require('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

routerProgramacion.get('/', (req, res) => {
    return res.send(JSON.stringify(programacion))
});

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultado = programacion.filter(curso => curso.lenguaje === lenguaje);

    if(resultado.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }
// api/cursos/programacion/python?ordenar=vistas
    if(req.query.ordenar === 'vistas'){
        console.log('okds')
        return res.send(JSON.stringify(resultado.sort((a, b) => b.vistas - a.vistas)));
    }

    res.send(JSON.stringify(resultado));
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if(resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    }

    res.send(JSON.stringify(resultados));
});

module.exports = routerProgramacion;