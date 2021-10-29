import {ADD_DOG, ALL_DOGS, GET_DETAILS, GET_TEMPERAMENTS, GET_QUERY, FILTER_TEMP, FILTER_BREED} from '../actions/types.js';

const initialState = {
    dogs:[], 
    details:[],
    temperaments:[],
    filterTemp:[],


};

 export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filterTemp: action.payload
                
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
            
            const filter = action.payload === 'Temperamentos' ? state.dogs : state.dogs?.filter(data => {
            if(data.temperament?.includes(action.payload)) return data
            });
            return{
                ...state,
                dogs: filter,
            }
    
        default:
            return {
                state
            }
    }

}






