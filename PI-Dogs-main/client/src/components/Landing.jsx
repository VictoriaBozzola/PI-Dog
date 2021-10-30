import React from 'react';
import {Link} from 'react-router-dom';
import './Landing.css'

export default function LandingPage() {
    return (
        <div className='contenedorboton'>
            <h1 className='h1land'> 
            ¡Conocé más al mejor amigo <br/>
            del hombre! </h1>
            <Link to='/home/'> 
            <button className='comienzo'><strong> ENTRAR </strong></button>
            </Link>
        </div>
    )
};