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
    
    
    useEffect(() => {           
        dispatch(getDogs()); 
        dispatch(getTemperaments());
        
        
    }, [])

    // const [orden, setOrden] = useState('');          

    const [actualPage, setActualPage] = useState(1);         
    const [dogxPage, setDogPage] = useState(8);            
    const iLastDog = actualPage * dogxPage;               
    const iFirstDog = iLastDog - dogxPage;              
    const totalPageDog = allDogs?.slice(iFirstDog, iLastDog);
    const length = allDogs?.length;
    
    
    

    
    const paginado = (pageNumber) => {
        setActualPage(pageNumber);
    }
 

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs()); 
        
    }

    

    return (
        <div className='contenedorAll'>
            <div className='navegador'>
                <Link to='/' className='link'>
                <h1 className='dogger'>DOGGER</h1>
                </Link>
                <div className='searchBar'>
                    <SearchBar pagina={setActualPage}/>
                </div>
               
            </div>
            
            <div className='filtros'>
                <div className='botonesFiltro'>
                    <Link to='/create' className='link'><button className='crear'>Crear raza</button></Link>
                    <button onClick={(e) => {handleClick(e)}} className='crear'> Todos </button>
                </div>
                <div>
                    <OrderAlf pagina={setActualPage} />
                    <OrderPeso pagina={setActualPage}  />
                    <div className='dosFiltros'>
                        <Temperaments pagina={setActualPage}/>
                        <Breed pagina={setActualPage}/>
                    </div>
                </div>
            </div>
            <Paginado dogxPage={dogxPage} allDogs={length} 
            paginado={paginado} actualPage={actualPage}/>   
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