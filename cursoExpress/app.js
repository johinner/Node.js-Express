const express = require('express');
const {infoCursos} = require('./datos/cursos.js')

const app = express();

// Routers
const routerProgramacion = require('./routers/programacion.js')
app.use('/api/cursos/programacion', routerProgramacion);

// Routing
app.get('/', (req, res) => {
   return res.send('Mi primer servidor. Cursos :)')
});

app.get('/api/cursos', (req, res) => {
   return res.send(JSON.stringify(infoCursos))
});

const PUERTO = process.env.PORT || 3001;

app.listen(PUERTO, () => {
    console.info(`El servidor esta escuchando en el puerto ${PUERTO}...`);

});
