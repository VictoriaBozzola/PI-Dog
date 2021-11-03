import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {filterByTemperament} from '../actions/actions.js'



export default function Temperaments({pagina}){
    const allTemperament = useSelector((state) => state.temperaments);
    const dispatch = useDispatch();
    
    
    function onInputChange(e){
        e.preventDefault();
        pagina(1);
        dispatch(filterByTemperament(e.target.value))
        
    }

    
   

    return (
        <div>
            <select onChange={(e)=>{onInputChange(e)}} className='options'>
                <option name='Temperamentos' key='a1'> Temperamentos </option>

                {allTemperament && allTemperament.map((e) => (
                    <option key={e.id} value={e.name} >{e.name}</option>
                ))}

            </select>
        </div>
    );
}
