require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {API_KEY} = process.env;
const {Dog, Temperament} = require('../db');
const {Op} = require('sequelize');

const getApi = async () => {
    const getApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const infoApi = getApi.data.map(response => {
            return {
                id: response.id,
                name: response.name,
                image: response.image.url,
                weight:response.weight.metric.split("-"),
                height: response.height.metric.split("-"),
                temperament: response.temperament,
                origin: response.origin,
                

            }
    }); 
    return infoApi
}

 const getDB = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attribute:{
                include: ['name']
            } ,
            through: {
                attribute:[]
            }
        }
    });
 }

 const getAllDogs = async ()=>{
    let dogMap = await getApi();
    const dbMap = await getDB();
    const allMap = await dogMap.concat(dbMap);
    return allMap;
}

router.get('/', async (req, res, next) => {
    
   try {
    const {name} = req.query;
    if(!name){
        const api = await getApi();
        const db = await getDB();
        const infoTotal = api.concat(db);
        res.status(200).send(infoTotal.length? infoTotal : 'Api not found')
    }   
    
    if(name) {
       
        const api = await getApi();
        const nameQuery = await api.filter(data => data.name.toLowerCase().includes(name.toLowerCase()))
        const db = await Dog.findAll({
            include: Temperament,  //para mas adelnate cuando conecte todo
            where: {
                name: {
                    [Op.iLike]: '%' + name + '%'
                }
            }
        })
        const infoTotal = nameQuery.concat(db);
        res.status(200).send(infoTotal.length? infoTotal : 'Name dog not found')
         
        
    } 

} catch(err){
    
    next(err);
}

});


router.post('/', async (req, res, next) => {
    try{
        let {name, height_min, height_max, weight_min, 
            weight_max, life_span, image, origin, temperament, createdInDb} = req.body;
        const createDog = await Dog.create({

                name,
                life_span,
                height_min,
                height_max,
                weight_min,
                weight_max,
                image,
                origin,
                createdInDb,
                
            
        })
        //los temperamentos se pasa a parte 


        temperament.map(async e => {
            const temperamentDB = await Temperament.findAll({
                where: {
                    name : e
                },
                include: [Dog]
            })
            createDog.addTemperament(temperamentDB)
        })

    
        //se lo agrego al personaje creado
        res.status(200).send(createDog)
    } catch (error) {
        next(error);
    }
});



router.get('/:id', async (req, res, next) => {
    try{
    const {id} = req.params;
    const dogsTotal = await getAllDogs();
    if(typeof id === 'string' && id.length > 8){
    
        let filter = dogsTotal.filter(el => el.id == id)
        
        res.status(200).send( filter );


    } else {

    const api = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const infoApi = api.data.map(response => {
            return {
                id: response.id,
                name: response.name,
                life_span: response.life_span,
                weight: response.weight.metric,
                height: response.height.metric,
                temperament: response.temperament,
                origin: response.origin,
                image: response.image.url
            }
    }); 

    //hay que traerlos de la base de datos los temperamentos guardados?
    const find = infoApi.find(data => data.id === Number(id));
    
    res.status(200).send(find)

    }
    
} catch (err) {
    next(err)
}
});




module.exports = router;