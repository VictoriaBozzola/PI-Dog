import {ADD_DOG, ALL_DOGS, GET_DETAILS, GET_TEMPERAMENTS, GET_QUERY, FILTER_TEMP, FILTER_BREED, 
ORDER_WEIGHT, ORDER_AS} from '../actions/types.js';

const initialState = {
    dogs:[], 
    details:[],
    temperaments:[],
    filtered:[],


};

 export default function rootReducer(state = initialState, action) {
    switch(action.type){
        case ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filtered: action.payload
                
            }

        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case ADD_DOG:    //no tiene el type pero lo agarra por la ruta y devuelve todo el estado (de api y db )
            return {     //en caso de no matchear con esto va al default
                ...state, 
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
            //sobre el nuevo array donde cargue a todos hago el filtro y se lo paso a dogs, para evitar que te haga filtros
            //sobre filtros
            const filter = action.payload === 'Temperamentos' ? state.filtered : state.filtered?.filter(data => data.temperament?.includes(action.payload));
            return{
                ...state,
                dogs: filter,
            }

        case FILTER_BREED:
            const filterBreed = action.payload === 'created' ? state.filtered.filter(e => e.createdInDb) : state.filtered.filter(e => !e.createdInDb)
            return{
                ...state,
                dogs: action.payload === 'all'? state.filtered : filterBreed,
            }
        
        case ORDER_AS:
            const order = action.payload === 'asc'?
            state.dogs.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1
                }
                return 0
            }) :
            state.dogs.sort(function(a, b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1
                }
                return 0
                })
            return {
                ...state,
                dogs: order,
            }
        case ORDER_WEIGHT:
            const isNan = state.dogs.filter(data => !isNaN(data.weight? data.weight[0] : data.weight_min))
            const orderW = action.payload === 'min'?
            isNan.sort(function(a, b){     
                
                if(parseInt(a.weight? a.weight[0] : a.weight_min) > parseInt(b.weight? b.weight[0]: b.weight_min)){ //min
                    return 1;
                }
                if(parseInt(b.weight? b.weight[0]: b.weight_min) > parseInt(a.weight? a.weight[0] : a.weight_min)){
                    return -1
                }
                return 0
            }) :
            isNan.sort(function(a, b) {    //max
                if(parseInt(a.weight? a.weight[0] : a.weight_min) > parseInt(b.weight? b.weight[0]: b.weight_min)){
                    return -1;
                }
                if(parseInt(b.weight? b.weight[0]: b.weight_min) > parseInt(a.weight? a.weight[0] : a.weight_min)){
                    return 1
                }
                return 0
                })
            return{
                ...state,
                dogs: orderW,
            }

        default:
            return {
                state
            }
    }

}






