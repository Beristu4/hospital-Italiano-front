import { useState, useEffect } from "react"
import CardResult from "./CardResult";
import './Searcher.Module.css'

const Searcher = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    function handleChange(e) {
        setQuery(e.target.value)
    }

    const fetchResults = async () => {
        if (!query.trim()) return;

        try {
            const res = await fetch(`https://bullionless-solange-tinglingly.ngrok-free.dev/search?dni=${query}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            });

            if (!res.ok) {
            const text = await res.text();
            console.error("Respuesta no OK:", text);
            return;
            }

            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error("Error al hacer fetch:", err);
        }
    };


    useEffect( () => {
       fetchResults()
    }, [query] )


    return (
        <div className="input-container">
            <input 
            type="number" 
            name="searcher" 
            id="searcher" 
            onChange={handleChange}
            value={query}
            placeholder="Buscar por DNI"
            />
            <div className="results">
                <CardResult result={results}  onRefresh={fetchResults}/>
            </div>
        </div>
    )
}

export default Searcher