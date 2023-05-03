import { useState, createContext } from 'react';
import './App.css';
import EventTypeList from './components/EventTypeList';
import EventList from './components/EventList';

export const LanguageContext = createContext();

function App() {
  const [eventType, setEventType] = useState(0);
  const [language, setLanguage] = useState('eu');

  const tituloPagina = {
    "eu": "EVENTUAK BIZKAIAN",
    "es": "EVENTOS EN BIZKAIA"
  };

  return (
    <LanguageContext.Provider value={language}>
    <div className="App">
      <header>
      <section className="btnlang">
      <button className={"language " + (language === "eu" ? "selected" : "")} onClick={() => setLanguage('eu')}>eu</button>
      
      <button className={"language " + (language === "es" ? "selected" : "")}  onClick={() => setLanguage('es')}>es</button>
      </section>
        <h1>{tituloPagina[language]}</h1>
      </header>
      <main>
        <EventTypeList handleClick={setEventType} selectedType={eventType}/>
        <EventList eventType={eventType} />
      </main>
    </div>
    </LanguageContext.Provider>
  );
}

export default App;
