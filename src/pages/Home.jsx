import './styles/Home.css';
import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { TickerModal } from '../components/TickerModal';


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
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <SearchBar onTickerSelect={handleTickerSelect} />
      <TickerModal ticker={selectedTicker} isOpen={isModalOpen} onClose={closeModal}/>
    </div>
  );
}

export default Home;