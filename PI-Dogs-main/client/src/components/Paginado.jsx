import React from 'react';
import './Paginado.css'

export default function Paginado({dogxPage, allDogs, paginado, actualPage}){
    const numPaginas = [];

    for(let i = 0; i <= Math.floor(allDogs/dogxPage); i++){   
        numPaginas.push(i+1);                                 
    }

    return(    
        <nav>
            <ul className='ul'>
                {numPaginas && numPaginas.map(num => (
                    <li key={num}>
                    <a className={num === actualPage? 'actual' : 'paginado'} onClick={() => paginado(num)}><strong> {num} </strong></a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}