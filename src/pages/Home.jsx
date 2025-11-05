import './styles/home.css';
import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { TickerModal } from '../components/TickerModal';
import { MenuBar } from '../components/MenuBar';
import { Footer } from '../components/Footer';
import { SettingsBar } from '../components/SettingsBar';

function Home() {
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTickerSelect = (ticker) => {
    console.log('Selected ticker:', ticker);
    setSelectedTicker(ticker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicker(null);
  };

  return (
    <div className="home">
      <nav className="top-nav">
        <MenuBar />
        <h1 className="nav-title">AfterMath</h1>
        <SettingsBar />
      </nav>

      <div className="main-content">
        <h2 className='search-bar-title'>Follow and quiz your knowledge on the markets in your watchlist!</h2>
        <SearchBar onTickerSelect={handleTickerSelect} />
        <TickerModal ticker={selectedTicker} isOpen={isModalOpen} onClose={closeModal}/>
      </div>

      <Footer />
    </div>
  );
}

export default Home;