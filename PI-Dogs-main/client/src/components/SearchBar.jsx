import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getName} from '../actions/actions.js'
import {useHistory} from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar({pagina}){
    const history = useHistory();
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    function onSubmit(e){
        e.preventDefault();
        pagina(1);
        dispatch(getName(search))
    }

    function onInputChange(e){
        e.preventDefault();
        setSearch(e.target.value)
    }

    return(
        <div className='contenedorSearch'>
            <form onSubmit={onSubmit}>
                <input className='busqueda' type='text' placeholder='Nombre de la Raza...' value={search} onChange={onInputChange}/>
                <input className='botonSearch' type='submit' value='Buscar' onSubmit={onSubmit}/>
           </form>
        </div>
    )
}