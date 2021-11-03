import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDog, getTemperaments} from '../actions/actions.js';
import {Link, useHistory} from 'react-router-dom';

export default function Create(){
    const history = useHistory();
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
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
    }


    function handleSelect(e){
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
                    <label>Vida </label>
                    <input type='number' value={form.life_span} name='life_span' onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Peso </label>
                    <input type='text' placeholder='Minimo' value={form.weight_min} name='weight_min' onChange={(e)=>handleChange(e)}></input>
                    <input type='text' placeholder='Máximo' value={form.weight_max} name='weight_max' onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Altura </label>
                    <input type='text' placeholder='Minima' value={form.height_min} name='height_min' onChange={(e)=>handleChange(e)}></input>
                    <input type='text' placeholder='Máxima' value={form.height_max} name='height_max' onChange={(e)=>handleChange(e)}></input>
                </div>
                <div>
                    <label>Temperamento/s </label>
                    <select onChange={(e)=>handleSelect(e)}>
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