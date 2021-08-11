import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

export default function Formulario({crearCita}) {
    //Crear el state
    const[cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const[ error, setError] = useState(false)

    //Vigilar los cambios en el formulario y actualizarlo
    const handleChange = (e) => {
        setCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita

    //Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        //Validar 
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || 
        sintomas.trim() === ''){
            setError(true)
            return;
        }

        setError(false);

        //Asignar un id
        cita.id = uuidv4();

        //Crear la cita
        crearCita(cita);

        //reiniciar el form
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <>
            <h2>Crear cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligarotios</p> : null}

            <form onSubmit={handleSubmit}>
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange ={handleChange}
                    value = {mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange ={handleChange}
                    value = {propietario}
                />
                <label>Fecha de ingreso</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange ={handleChange}
                    value = {fecha}
                />
                <label>Hora de ingreso</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange ={handleChange}
                    value = {hora}
                />
                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange ={handleChange}
                    value = {sintomas}
                ></textarea>

                <button 
                    type="submit"
                    className="u-full-width button guardar"
                >Guardar</button>
            </form>
        </>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
