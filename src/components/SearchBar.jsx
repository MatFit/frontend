import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export const SearchBar = () => {
    console.log(import.meta.env.VITE_PYTHON_SERVICES_URL);
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_BASE = import.meta.env.VITE_PYTHON_SERVICES_URL || 'http://localhost:8000';


    const fetchMarkets = async (input) => {
        const trimmed = input.trim();

        if (!trimmed) {
            setResults([]);
            return;
        }
        try {
            setLoading(true);
            setError("");

            // API call to fetch markets list from Alpaca
            const params = new URLSearchParams({ query: trimmed, limit: "10" });
            const res = await fetch(`${API_BASE}/alpaca/fetch_markets?${params.toString()}`);

            // Check if the req is successful
            if (!res.ok) {
                throw new Error(`Request failed: ${res.status}`);
            }

            // Parse data
            const data = await res.json();

            console.log(data);

            // Set results
            setResults(Array.isArray(data.results) ? data.results : []);
        } 
        catch (e) {
            // Catch and set error or generic error message
            setError(e?.message || "Failed to fetch markets");
            setResults([]);
        } 
        finally {
            setLoading(false);
        }
        };

        const handleChange = (input) => {
        setInput(input);
        fetchMarkets(input);
    };

    return (
        <div className="input-wrapper">
            <SearchIcon id="search-icon" size={16} />
            <input
                placeholder="Find your market..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
            {loading && <div className="search-loading">Loading...</div>}
            {error && <div className="search-error">{error}</div>}
            {results.length > 0 && (
                <ul className="search-results">
                    {results.map((r) => (
                        <li key={`${r.ticker}-${r.exchange}`}>
                            {r.ticker} - {r.name} ({r.exchange})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}