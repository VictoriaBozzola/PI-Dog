import React from 'react';
import {useDispatch} from 'react-redux';
import {orderByWeight} from '../actions/actions.js'
import './Filtros.css'


export default function Order({pagina, set}) {
    
    const dispatch = useDispatch();
    
    
    function handleSortWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        pagina(1);
        set(`Ordenado ${e.target.value}`);
    }

    
    
   

    return (
        <select onChange={(e) => handleSortWeight(e)} className='options'>
            <option> Peso </option>
            <option value ='min'> Peso minimo</option>
            <option value='max'> Peso máximo </option>
        </select>
    );
}
