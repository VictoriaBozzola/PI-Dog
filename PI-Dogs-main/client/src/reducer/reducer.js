import {ADD_DOG, ALL_DOGS, GET_DETAILS, GET_TEMPERAMENTS, GET_QUERY} from '../actions/types.js';

const initialState = {
    dogs: [], 
    details: {},
    temperaments:[],
    search:[]

};

 export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case ALL_DOGS:
            return {
                ...state,
                dogs: action.payload
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
                search: action.payload, 
            }
    
        default:
            return {
                state
            }
    }

}






