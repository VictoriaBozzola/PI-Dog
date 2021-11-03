import React from 'react';
import {Link} from 'react-router-dom';
import './Card.css'

export default function Card({name, image, temperament, weight, id}){
    console.log('TEMPERAMENTOS',temperament)
    return(
        <div className='cards'>
            <div className='tyf'>
                
                <img src={image} alt= 'dog' width='200px' height='200px'/>
                <h3>{name}</h3>
            </div>
            <div className='info'>
                <h4> <strong>Peso</strong> </h4> 
                <p> {parseInt(weight) + 5} kilos</p>
                <h4> <strong>Temperamento</strong> </h4> 
                <p className='temperamentos'> {!Array.isArray(temperament)? temperament :  temperament.map(e => e.name).join(', ')}</p>
               
                <Link to={'/home/' + id}>
                <button><strong> Más Info </strong></button>
                </Link>
            </div>
        </div>
    )
}