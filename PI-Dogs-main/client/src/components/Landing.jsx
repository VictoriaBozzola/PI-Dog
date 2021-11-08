import React from 'react';
import {Link} from 'react-router-dom';
import './Landing.css'

export default function LandingPage() {
    return (
        <div className='contenedorboton'>
           <hr className='hrLanding'/> 
            <h1 className='h1land'> 
            DOGGER </h1>
            <hr/>
            <p className='pLanding'> El blog de perros que te ayuda a conocer más a tu mascota</p>
            <Link to='/home/'> 
            <button className='comienzo'> Comenzar </button>
            </Link>
        </div>
    )
};