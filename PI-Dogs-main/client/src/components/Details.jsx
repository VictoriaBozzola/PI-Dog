import React from 'react';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDogDetails} from '../actions/actions.js'

export default function Details(props){
   
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    console.log('DETALLE', details)
    useEffect(() => {
        dispatch(getDogDetails(props.match.params.id))  //para pasarle el id de props y que haga la busqueda
    }, [dispatch])

    return (
        <div>
            <Link to='/home'>
                <button>volver</button>
            </Link>
            {
                details ?
                
                    <div>
                        <h1>{details.name? details.name : details[0].name}</h1>
                        <img src={details.image? details.image : details[0].image} alt='not found' width='200px' height='200px'/>
                        <div>
                            <h4> Peso </h4>
                            { details.weight?
                            <p>{details.weight} kilos</p>
                            :<p>{details[0].weight_min} - {details[0].weight_max} kilos</p>
                            }
                           
                        </div>   
                        <div>
                            <h4> Altura </h4>
                            { details.height?
                            <p>{details.height} cm</p>
                            :<p>{details[0].height_min} - {details[0].height_max} cm</p>
                            }
                            
                        </div> 
                        <div>
                            <h4> Temperamento/s </h4>
                            <p>{!details[0]?.createdInDb? details.temperament :  details[0].temperaments?.map(e => e.name).join(', ')}</p>
                        </div> 
                        <div>
                            <h4> Años de vida </h4>
                            <p>{details.life_span? details.life_span : details[0].life_span}</p>
                        </div> 
                        <div>
                            <h4> Origen </h4>
                            <p>{details.origin? details.origin : details[0].origin}</p>
                        </div> 
                    </div>
                :
                <div>Loading...</div>
            }
        </div>
    )
}