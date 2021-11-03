import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDogs, getTemperaments} from '../actions/actions.js'
import Card from './Card';
import SearchBar from './SearchBar';
import Temperaments from "./Temperaments";
import Paginado from './Paginado'
import Breed from './Breed.jsx'
import OrderAlf from './OrderAlf'
import OrderPeso from './OrderPeso';
import './Home.css'


export default function Home() {
   
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    
    
    useEffect(() => {           //despacha la acción, espera la info 
        dispatch(getDogs()); 
        dispatch(getTemperaments());
        
        
    }, [])

    const [orden, setOrden] = useState('')          //lo creo aca porque es un estado que funciona solo en este modulo
                                                    //y se lo paso como prop a orderAsDes 

    const [actualPage, setActualPage] = useState(1);         //pagina actual, siempre comienza en la pagina 1
    const [dogxPage, setDogPage] = useState(8);            //perros por pagina 
    const iLastDog = actualPage * dogxPage;               // ultimo perro es igual a la cantidad de perros por pagina que hay
    const iFirstDog = iLastDog - dogxPage;                 // primer perro es igual al ultimo menos la cantidad de perros por pagina
    const totalPageDog = allDogs?.slice(iFirstDog, iLastDog);
    const length = allDogs?.length;
    
    
    

    //para ir al numero de pagina que queramos
    const paginado = (pageNumber) => {
        setActualPage(pageNumber);
    }
 

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs()); //para que vuelva al get principal que te trae todos los personajes
    }

    

    return (
        <div className='contenedorAll'>
            <div className='navegador'>
                <h1>DOGGER</h1>
                <div className='searchBar'>
                    <SearchBar pagina={setActualPage}/>
                </div>
               
            </div>
            
            <div className='filtros'>
                <div className='botonesFiltro'>
                    <Link to='/create'><button className='crear link'>Crear raza</button></Link>
                    <button onClick={(e) => {handleClick(e)}} className='crear'> Todos </button>
                </div>
                <div>
                    <OrderAlf pagina={setActualPage} set={setOrden}/>
                    <OrderPeso pagina={setActualPage} set={setOrden} />
                    <div className='dosFiltros'>
                        <Temperaments pagina={setActualPage}/>
                        <Breed pagina={setActualPage}/>
                    </div>
                </div>
            </div>
            <Paginado dogxPage={dogxPage} allDogs={length} 
            paginado={paginado}/>   
            <div className='contenedorcard'>
            {    
                totalPageDog?.map(elemento => {
                
                return (
                    
                    <Card key={elemento.id} id={elemento.id} name={elemento.name} image={elemento.image} 
                    temperament={elemento.temperament? elemento.temperament: elemento.temperaments } 
                    weight={elemento.weight? elemento.weight[0] : elemento.weight_min}/>
                    
               )})
            }
            
            </div>
        </div>
    )
};