import {ADD_DOG, ALL_DOGS, GET_DETAILS, GET_TEMPERAMENTS, GET_QUERY, FILTER_TEMP, FILTER_BREED, PAGINADO_D,PAGINADO_I} from '../actions/types.js';

const initialState = {
    dogs:[], 
    details:[],
    temperaments:[],
    pIinicial: 0,
    pFinal: 8, 


};

 export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
               
                
            }
        case PAGINADO_D:
            return {
                ...state,
                pInicial: state.pIinicial + 8,
                pFinal: state.pFinal + 8,
            }

        case PAGINADO_I:
            return {
                ...state,
                pInicial: state.pIinicial - 8,
                pFinal: state.pFinal - 8,
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case ADD_DOG:
            return {
                ...state, 
                dogs: state.dogs.concat(action.payload)
            }
        case GET_TEMPERAMENTS: 
        return {
            ...state,
            temperaments: action.payload,
        }
        case GET_QUERY:
            return {
                ...state,
                dogs: action.payload, 
            }
        case FILTER_TEMP: 
            // const allDogs = state.dogs;
            // const filter = action.payload === 'temp' ? allDogs : allDogs.filter(data => data.temperament.includes(action.payload));
            return{
                ...state,
                dogs: action.payload,
            }
    
        default:
            return {
                state
            }
    }

}






