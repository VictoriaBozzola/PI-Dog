const { Router } = require('express');
const routeDog = require('./dogs.js');
const routeTemperament = require('./temperaments');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', routeDog);
router.use('/temperaments', routeTemperament);




module.exports = router;
