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

// let getApi = async () => {
//     const urlApi = await axios.get('https://api.thedogapi.com/v1/breeds');
//     const infoApi = await urlApi.map(response => {
//         return {

//         }
//     })
// }


module.exports = router;
