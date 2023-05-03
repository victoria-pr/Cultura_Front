import { useState, useEffect, useContext } from 'react';
import "../EventTypeList.css"
import { LanguageContext } from "../App";

const EventTypeList = ({handleClick, selectedType}) => {
    const [eventTypes, setEventTypes] = useState([]);
    const language = useContext(LanguageContext);

    useEffect( () => {
        fetch ("https://api.euskadi.eus/culture/events/v1.0/eventType")
        .then (response => response.json())
        .then (data => {
            setEventTypes(data)       
        });
    },[]); // <-- array vacío para que se ejecute solo una vez al cargar el componente

    const allName = {
        "eu": "Guztiak",
        "es": "Todos"
    };

    return (
     <div>
        <ul className="navTypes">
            <li className={selectedType === 0 ? "selected listaTipos" : "listaTipos"} onClick={()=>handleClick(0)}>
                <img className="icono" src= "/img/Todos.png"></img>{allName[language]}</li>
            {eventTypes.map(eventType => {
                const name = {
                    "eu": eventType.nameEu,
                    "es": eventType.nameEs
                };
             
            return<li className={selectedType === eventType.id ? "selected listaTipos" : "listaTipos"} key={eventType.id} onClick={()=>handleClick(eventType.id)}>
            <img className="icono" src={`/img/${eventType.nameEs.toLowerCase()}.png`} alt={eventType.nameEs}/>{name[language]}</li>
            
            })}
        </ul>
        
     </div>   
     );
}


export default EventTypeList;


/* alt={eventType.nameEs} */