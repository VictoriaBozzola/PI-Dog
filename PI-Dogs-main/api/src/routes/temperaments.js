const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {API_KEY} = process.env;
const {Temperament} = require ('../db');

router.get('/', async (req, res, next) => {
    
    //Obtener todos los temperamentos posibles
    // En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos 
    // y luego ya{ utilizarlos desde allí}
    try{
        let array = [];
        let concatArr = [];
        const getApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const infoApi = getApi.data.map( data => {
            
            return {
                temperament: data.temperament,
            }
        });

        //filtro de los obj vacios
        const filtrado = infoApi.filter(data => data.temperament !== undefined)

        //pusheamos todos los strings por separado en un array
        filtrado.map(data => {
            array.push(data.temperament.split(","));
            return array
        });
       
        //le sacamos el array de arrays y ponemos todos los valores sobre un solo array 
        array.forEach(data => {
            for(var i = 0; i < data.length; i++){
                data[i] = data[i].trimStart();
                concatArr.push(data[i])
            }
        });
        
        //filtra segun la tabla de hash, si no tiene la propiedad se la agrega al objeto con el valor de true, 
        // si la tiene devuelve false haciendo que no pase del filtrado  
        const tabla = {};
        const unicos = concatArr.filter((indice) => {
        return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true);
        });
        
        //los ordeno alfabeticamente
        unicos.sort();

        const apiADb = unicos.map((data) => {
            return Temperament.findOrCreate({
                
                where:{
                    name: data,
                }
            
        })
        
        });
        
        let showDB = await Temperament.findAll();
        res.send(showDB);

    }catch (error){
        next(error)
    }

});

module.exports = router;