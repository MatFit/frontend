import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Page_404 from './pages/404';
import StockChart  from './pages/stockchart';
import WatchlistHistory from './pages/watchlist_history';
import Quiz from './pages/quiz';
import Profile from './pages/profile';
import { TickerModal } from './components/TickerModal';
import { SearchBar } from './components/SearchBar';
import './App.css'


function TickerModalTest() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const sampleTicker = {
    company_name: "Apple Inc.",
    ticker: "AAPL",
    exchange: "NASDAQ",
    market: "stocks"
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ticker Modal Test</h1>
      <button 
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Open Modal
      </button>

      <TickerModal 
        ticker={sampleTicker}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<TickerModalTest />} />
        <Route path="/watchlist" element={<WatchlistHistory />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Page_404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App