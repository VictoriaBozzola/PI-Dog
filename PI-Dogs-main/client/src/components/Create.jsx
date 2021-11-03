import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDog, getTemperaments} from '../actions/actions.js';
import {Link, useHistory} from 'react-router-dom';

function validate(form){
    let error ={};
    
    if(!form.name){
        error.name = 'La raza necesita un nombre'
    } 

   
        if(!form.weight_min){
            error.weight_min = 'Debe colocar un peso minimo'
        } else if(!/^[0-9]+$/.test(form.weight_min)){
            error.weight_min = 'Peso minimo: Tiene que ser un número'
        }
        
        else if(!form.weight_max){
            error.weight_max = 'Debe colocar un peso máximo'
        } else if(!/^[0-9]+$/.test(form.weight_max)){
            error.weight_max = 'Peso máximo: Tiene que ser un número'
        } else if(form.weight_min > form.weight_max){
            error.weight_max = 'El peso máximo debe ser mayor al peso minimo'
        
        }
        
    

    
        if(!form.height_min){
            error.height_min = 'Debe colocar una altura minima'
        } else if(!/^[0-9]+$/.test(form.height_min)){
            error.height_min = 'Altura minima: Tiene que ser un número'
        }
        
        else if(!form.height_max){
            error.height_max = 'Debe colocar una altura máxima'
        } else if(!/^[0-9]+$/.test(form.height_max)){
            error.height_max = 'Altura máxima: Tiene que ser un número'
        }else if(form.height_min > form.height_max){
            error.height_max = 'La altura máxima debe ser mayor a la altura minima'
        }
    
    return error;
}



export default function Create(){
    const history = useHistory();
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const [error, setError] = useState({});
    
    const[form, setForm] = useState({
                name:'',
                life_span:'',
                height_min:'',
                height_max:'',
                weight_min:'',
                weight_max:'',
                image:'',
                origin:'',
                temperament:[]
    });

    useEffect(()=> {
        dispatch(getTemperaments())
    }, []);

    function handleChange(e){
        setForm({
            ...form,                            //todo lo anterior que se guardó en otras props
            [e.target.name] : e.target.value    // le asignamos segun el name del input en que propiedad de obj
        })                                      // vamos a guardar el valor 
    
        setError(validate({
            ...form,
            [e.target.name] : e.target.value,
        }))
    }


    function handleSelectTemp(e){
        setForm({
            ...form,
            temperament: [...form.temperament, e.target.value]
        })
    }

    function deleteTemp(e){
        e.preventDefault();
        setForm({
            ...form,
            temperament: form.temperament.filter(t => t !== e.target.value)
        })
    }

    function onSubmit(e){
        e.preventDefault();
        dispatch(addDog(form));
        alert("your dog was successfully created");
        setForm({
            name:'',
            life_span:'',
            height_min:'',
            height_max:'',
            weight_min:'',
            weight_max:'',
            image:'',
            origin:'',
            temperament:[]
        })
        history.push("/home")
    }

    

    

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Creá una raza nueva</h1>

            <form onSubmit={(e)=>onSubmit(e)}>
                <div>
                    <label>Nombre </label>   {/* poner p para que quede arriba del input */}
                    <input type='text' value={form.name} name='name' onChange={(e)=>handleChange(e)}></input>
                    { error.name && ( <p> {error.name} </p>)}
                </div>
                <div>
                    <label>Origen </label>
                    <input type='text' value={form.origin} name='origin' onChange={(e)=>handleChange(e)}></input>
                    
                </div>
                <div>
                    <label>imagen </label>
                    <input type='text' value={form.image} name='image' onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Años de vida </label>
                    <input type='number' value={form.life_span} name='life_span' onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Peso </label>
                    <input type='text' placeholder='Minimo' value={form.weight_min} name='weight_min' onChange={(e)=>handleChange(e)}></input>
                    <input type='text' placeholder='Máximo' value={form.weight_max} name='weight_max' onChange={(e)=>handleChange(e)}></input>
                    { error.weight_min ? ( <p> {error.weight_min} </p>) : ( <p> {error.weight_max} </p>)}

                </div>
                <div>
                    <label>Altura </label>
                    <input type='text' placeholder='Minima' value={form.height_min} name='height_min' onChange={(e)=>handleChange(e)}></input>
                    <input type='text' placeholder='Máxima' value={form.height_max} name='height_max' onChange={(e)=>handleChange(e)}></input>
                    { error.height_min?( <p> {error.height_min} </p>) : ( <p> {error.height_max} </p>)}

                </div>
                <div>
                    <label>Temperamento/s </label>
                    <select onChange={(e)=>handleSelectTemp(e)}>
                        <option  value='temp'> Temperamentos </option>
                        {temperaments?.map(t => (
                            <option key={t.id} value={t.name}> {t.name} </option>
                        ))}
                    </select>
                    <div>
                        {form.temperament.map((e, i)=>(
                                <button key={i} value={e} onClick={(e)=>deleteTemp(e)}> {e} </button>
                        ))} 
                    </div>
                   
                </div>
                <button type='submit' onSubmit={(e)=>onSubmit(e)}> Crear </button>

            </form>
        </div>

    );

}