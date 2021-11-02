import React from 'react';
import {useDispatch} from 'react-redux';
import {orderAs} from '../actions/actions.js'



export default function OrderAsDes({pagina, set}) {
    
    const dispatch = useDispatch();
    
    
    function handleChange(e){
        e.preventDefault();
        dispatch(orderAs(e.target.value));
        pagina(1);
        set(`Ordenado ${e.target.value}`);
    }


    return (
        <select onChange={(e) => handleChange(e)}>
            <option>Alfabeticamente</option>
            <option value= "asc">A - Z</option>
            <option value= "desc">Z - A</option>
        </select>
    );
}
