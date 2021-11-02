import React from 'react';
import {useDispatch} from 'react-redux';
import {filterByBreed} from '../actions/actions.js'



export default function Breed({pagina}){
    const dispatch = useDispatch();
    
    
    function handlefilterBreed(e){
        e.preventDefault();
        pagina(1);
        dispatch(filterByBreed(e.target.value));
        
    }

    
   

    return (
        <div>
                <select onChange={(e)=> handlefilterBreed(e)} >
                   <option value ='all'> Todas las razas </option>
                   <option value ='exist'> Existente </option>
                   <option value = 'created'> Creada </option>
                </select>
        </div>
    );
}
