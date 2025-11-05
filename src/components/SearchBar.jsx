import "./styles/SearchBar.css";
import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import PropTypes from 'prop-types';


export const SearchBar = ({onTickerSelect}) => {
    console.log(import.meta.env.VITE_PYTHON_SERVICES_URL);
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_BASE = import.meta.env.VITE_PYTHON_SERVICES_URL;

    const fetchMarkets = async (input) => {
        // Trim input
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
            const res = await fetch(`${API_BASE}/tickers/search?${params.toString()}`);

            // Check if the req is successful
            if (!res.ok) {
                throw new Error(`Request failed: ${res.status}`);
            }
            // Parse data
            const data = await res.json();

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

    // Handle when user types in input
    const handleChange = (input) => {
        setInput(input);
        fetchMarkets(input);
    };

    // Handle clear input
    const handleClear = () => {
        setInput("");
        setResults([]);
        setError("");
    };

    // Handle when ticker is clicked
    const handleTickerClick = (ticker) => {
        setResults([]);
        setInput("");
        
        if (onTickerSelect) {
            onTickerSelect(ticker);
        }
    };

    return (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <SearchIcon className="search-icon" size={20} />
                <input
                    className="search-input"
                    placeholder="Search for stocks..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
                {input && (
                    <button 
                        className="clear-button" 
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
            {/* If loading invoke this div element */}
            {loading && (
                <div className="search-status loading">
                    <div className="loading-spinner"></div>
                    Searching...
                </div>
            )}
        
            {/* When results aren't empty*/}
            {results.length > 0 && (
                <div className="search-results-container">
                    <ul className="search-results">
                        {results.map((r) => (
                            <li 
                                key={`${r.ticker}-${r.exchange}`}
                                onClick={() => handleTickerClick(r.ticker)}
                                className="search-result-item"
                            >
                                <div className="result-ticker">{r.ticker}</div>
                                <div className="result-details">
                                    <span className="result-name">{r.company_name}</span>
                                    <span className="result-exchange">{r.exchange}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

SearchBar.propTypes = {
  onTickerSelect: PropTypes.func.isRequired,
};