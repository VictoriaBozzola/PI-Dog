import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDogs, getTemperaments} from '../actions/actions.js'
import Card from './Card';
import SearchBar from './SearchBar';
import Temperaments from "./Temperaments";
import Paginado from './Paginado'
import './Home.css'


export default function Home() {
    
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    console.log('allDogs',allDogs);
    
    useEffect(() => {           //despacha la acción, espera la info 
        dispatch(getDogs()); 
        dispatch(getTemperaments());
        console.log('DENTRO DEL USE', allDogs)
        
    }, [])

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
                <Link to='/dogs'><button>Crear raza</button></Link>
                <SearchBar/>
            </div>
            <button onClick={(e) => {handleClick(e)}}> Volver a todos los perros </button>
            <div className='filtros'>
                <select>
                   <option value= "asc">Ascendente</option>
                   <option value= "desc">Descendente</option>
               </select>
                <select>
                    <option value ='all'> Todos </option>
                    <option value= 'alf'> Orden Alfabético </option>
                    <option value = 'peso'> Peso </option>
                </select>

                <Temperaments/>

                <select>
                   <option value ='all'> Todos </option>
                   <option value ='exist'> Raza existente </option>
                   <option value = 'created'> Raza creada </option>
                </select>
            </div>
            <Paginado dogxPage={dogxPage} allDogs={length} 
            paginado={paginado}/>   
            <div className='contenedorcard'>
            {    
                totalPageDog?.map(elemento => {
                return (
                
                    <Card key={elemento.id} id={elemento.id} name={elemento.name} image={elemento.image} 
                    temperament={elemento.temperament} weight={elemento.weight}/>
                
               )})
            }
            </div>
        </div>
    )
};