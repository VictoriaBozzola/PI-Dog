import React from 'react';
import {useDispatch} from 'react-redux';
import {orderByWeight} from '../actions/actions.js'
import './Filtros.css'


export default function Order({pagina}) {
    
    const dispatch = useDispatch();
    
    
    function handleSortWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        pagina(1);
        
    }

    
    
   

    return (
        <div>
        <select onChange={(e) => handleSortWeight(e)} className='options'>
            <option value = 'peso'> Peso </option>
            <option value ='min'> Peso minimo</option>
            <option value='max'> Peso máximo </option>
        </select>

        </div>
    );
}
