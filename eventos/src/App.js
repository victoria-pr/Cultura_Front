import { useState, createContext,useRef } from 'react';
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';

export const LanguageContext = createContext();

function App() {
  const [eventType, setEventType] = useState(0);
  const [language, setLanguage] = useState('es');

  const tituloPagina = {
    "eu": "EKITALDIAK BIZKAIAN",
    "es": "EVENTOS EN BIZKAIA"
  };

  const refTo = useRef(null); 

  return (
    <LanguageContext.Provider value={language}>
    <div className="App">
      <header ref={refTo}>
      <section className="btnlang">
      <button className={"language " + (language === "eu" ? "selected" : "")} onClick={() => setLanguage('eu')}>eu</button>
      
      <button className={"language " + (language === "es" ? "selected" : "")}  onClick={() => setLanguage('es')}>es</button>
      </section>
        <h1>{tituloPagina[language]}</h1>
      </header>
      <main>
        <EventTypeList handleClick={setEventType} selectedType={eventType}/>
        <EventList eventType={eventType} refTo={refTo}/>
      </main>
    </div>
    </LanguageContext.Provider>
  );
}

export default App;
