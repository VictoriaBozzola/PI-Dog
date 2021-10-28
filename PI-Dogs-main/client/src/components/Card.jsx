import React from 'react';
import {Link} from 'react-router-dom';

export default function Card({name, image, temperament, weight, id}){

    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt= 'dog' width='200px' height='200px'/>
            <p> <strong>Peso</strong> <br/> 
            {weight[0]} a {weight[1]} kilos</p>
            <p> <strong>Temperamento</strong> <br/> 
            {temperament}</p>
            <Link to={'/home/' + id}>
            <button>Más Info</button>
            </Link>
        </div>
    )
}