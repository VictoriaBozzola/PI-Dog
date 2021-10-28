import React from 'react';

export default function Paginado({dogxPage, allDogs, paginado}){
    const numPaginas = [];

    for(let i = 0; i <= Math.ceil(allDogs/dogxPage); i++){   //todos mis perros dividido por los que quiero por pagina
        numPaginas.push(i+1);                                 // cuantas paginas vamos a tener
    }

    return(     //renderiza los numeros del total de las paginas que va a tener 
        <nav>
            <ul>
                {numPaginas && numPaginas.map(num => (
                    <li key={num}>
                    <div onClick={() => paginado(num)}> {num} </div>
                    </li>
                ))}
            </ul>
        </nav>
    )
}