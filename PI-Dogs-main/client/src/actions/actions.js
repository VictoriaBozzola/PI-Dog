import axios from 'axios';
import {ADD_DOG, ALL_DOGS, GET_DETAILS, GET_TEMPERAMENTS, GET_QUERY} from './types';

export function getDogs () {
    return async function(dispatch){
        const infoDogs = await axios.get('http://localhost:3001/api/dogs');
        dispatch({
        type: ALL_DOGS,
        payload: infoDogs.data
        
         })

         
         
    }
}



export function addDog(creado){
    return {
        type: ADD_DOG,
        payload: {
                name: creado.name,
                life_span: creado.life_span,
                height: creado.height,
                weight: creado.weight,
                image: creado.image,
                origin: creado.image,
                // temperament   >> traer de la base de datos?? 
        }
    }
}

export function getDogDetails (id){
    return async function (dispatch){
        const infoDetails = await axios.get('http://localhost:3001/api/dogs/' + id);
        dispatch({
            type: GET_DETAILS,
            payload: infoDetails.data,

        })
    }
}

export function getTemperaments(){
    return async function (dispatch){
        const temp = await axios.get('http://localhost:3001/api/temperaments');
        dispatch({
            type:GET_TEMPERAMENTS,
            payload: temp.data
        })
    }
}

export function getName(name) {
    return async function (dispatch){
        const query = await axios.get('http://localhost:3001/api/dogs?name='+name)
        dispatch ({
            type: GET_QUERY,
            payload: query.data,
        })
    }   
}



