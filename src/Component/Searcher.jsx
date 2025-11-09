import { useState, useEffect } from "react"
import CardResult from "./CardResult";
import './Searcher.Module.css'

const Searcher = () => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    function handleChange(e) {
        setQuery(e.target.value)
    }

    const fetchResults = async () =>{
        if (!query.trim()) return;
        fetch(`https://localhost:7137/search?dni=${query}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(console.error);
    }
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