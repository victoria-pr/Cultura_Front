import { useState,useEffect,useContext } from "react";
import "./css/EventModal.scss"
import { LanguageContext } from "../App";

const EventModal = ({event, className, close}) => {
    const[currentClassname, setCurrentClassname] = useState(null);
    const language = useContext(LanguageContext);

    useEffect( () => {
        setCurrentClassname(className);
    }, [className]);

    const closeModal = (event) => {
        event.stopPropagation();
        setCurrentClassname(null);
        close();
    }

    const name = {
        "eu": event.nameEu,
        "es": event.nameEs
    }

    const municipality = {
        "eu": event.municipalityEu,
        "es": event.municipalityEs
    }

    const description = {
        "eu": event.descriptionEu,
        "es": event.descriptionEs
    }

    const openingHours = {
        "eu": event.openingHoursEu,
        "es": event.openingHoursEs
    }

    return(
        <div>
        
        <section className={"modal-background " + currentClassname} onClick={closeModal}></section>
        <article className={"modal " + currentClassname}> 

            {event.images.length > 0 ? <img class="fotos" src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/> : <img class= "fotos" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="imagen no disponible"/>}
            <br></br>
            <h2>{name[language]}</h2>
            <p>{municipality[language]}</p>
            <p>{event.priceEs}</p>
            <p>{event.startDate.split("T") [0]}</p>
            <p>{openingHours[language]}</p>
            <div className="contenido" dangerouslySetInnerHTML={{__html: description[language]}}></div>
            <button onClick={closeModal}>X</button>
        </article>
        </div>
    )
}

export default EventModal;