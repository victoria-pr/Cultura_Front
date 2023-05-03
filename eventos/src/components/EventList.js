import { useState, useEffect, useRef, useContext } from "react";
import "../EventList.css";
import EventModal from "./EventModal";
import { LanguageContext } from "../App";

const EventList = ({eventType}) => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchWord, setSearchWord] = useState(""); //para el buscador de eventos
    const titleRef = useRef(null);
    const language = useContext(LanguageContext);

    useEffect( () => {
        setEvents([]);
        setPage(1);
    },[eventType]);

    useEffect( () => {
        getData()
        .then (data => {
            setEvents([...events, ...data.items]); //los tres puntos son para que no se sobreescriba el array 
            setTotalPages(data.totalPages);
        });
        },[page]); 

    useEffect( () => {
        getData()
        .then (data => {
            setEvents(data.items);
            setTotalPages(data.totalPages);
        });
        },[eventType]);  

     useEffect( () => {
        if(searchWord.length < 3) {
            return;
        }
        getData()
        .then (data => {
            setEvents(data.items); 
            setTotalPages(data.totalPages);
        });
        },[searchWord]);  

        const getData = () => {
            const type = eventType !== 0 ? `&type=${eventType}` : "";
            const search = searchWord.length < 3 && searchWord.length > 0 ? "" : `&description=${searchWord}` //para que no busque si no hay nada escrito o si hay menos de 3 caracteres
            return new Promise ((resolve, reject) => {
                fetch (`https://api.euskadi.eus/culture/events/v1.0/events/upcoming?_elements=20&_page=${page}&provinceNoraCode=48${type}${search}`)
                .then (response => response.json())
                .then (data => {
                    resolve(data);
                })
                .catch (error => {
                    reject(error);
                });
            });
        }

        const nextPage = () => {
            if (page < totalPages) {
                setPage(page + 1);
            }
        }

        const goToTop = () => {
            titleRef.current.scrollIntoView({behavior: "smooth"});
        }

    const showmore ={
        "eu": "Erakutsi gehiago",
        "es": "Mostrar más"
    }

    const nextEvent = {
        "eu": "Hurrengo ekitaldiak",
        "es": "Próximos eventos"
    }

    return (
        <section className="eventosCards" >
            <h2 ref={titleRef} >{nextEvent[language]}</h2>
            <input className="buscador" type="text" placeholder="..." value={searchWord} onChange={(event)=>setSearchWord(event.target.value)}/>
            <ul className="eventos">

                {events.map(event => { 
                    const translation = {
                        name: {
                        "eu": event.nameEu,
                        "es": event.nameEs
                    },
                    openingHours: {
                        "eu": event.openingHoursEu,
                        "es": event.openingHoursEs
                    },
                };
                    return<li class= "evento" key={event.id} onClick={()=>setSelectedEvent(event.id)}>
                        {event.images.length > 0 ? <img class="fotos" src={event.images[0].imageUrl} alt={event.images[0].imageFileName}/> : <img className= "fotos" src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="imagen no disponible"/>}
                        <h3>{translation.name[language]}</h3>
                        <p>{event.startDate.split("T") [0]}</p>
                        <p>{translation.openingHours[language]}</p>
                        <EventModal event={event} className={selectedEvent === event.id ? "show" : ""} close={()=>setSelectedEvent(null)} />
                    </li>
                })}
            </ul>
            {page < totalPages && <button onClick={nextPage}>{showmore[language]}</button>}
            <button className="btnflecharriba" onClick={goToTop}>↑</button>
        </section>
    );    
}

export default EventList;

/* 
//después del ul
<h3>página {page}/{totalPages}</h3>
{page >1 && <button onClick={previousPage}>{"<"}</button>}
{page < totalPages && <button onClick={nextPage}>{">"}</button>} */

/* const previousPage = () => { //lo usabamos con el botón de página anterior
    if (page > 1) {
        setPage(page - 1);
    }
} */