import React from 'react';
import {Link} from 'react-router-dom';
import './Card.css'

export default function Card({name, image, temperament, weight, id}){

    return(
        <div className='cards'>
            <div className='tyf'>
                <h3>{name}</h3>
                <img src={image} alt= 'dog' width='200px' height='200px'/>
            </div>
            <div className='info'>
                <h4> <strong>Peso</strong> </h4> 
                <p> {weight[0]} a {weight[1]} kilos</p>
                <h4> <strong>Temperamento</strong> </h4> 
                <p className='temperamentos'> {temperament}</p>
                <Link to={'/home/' + id}>
                <button><strong> Más Info </strong></button>
                </Link>
            </div>
        </div>
    )
}