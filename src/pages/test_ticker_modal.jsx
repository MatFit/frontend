import React, { useState } from 'react';
import { TickerModal } from './TickerModal';

const TickerModalTest = () => {
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
};

export default TickerModalTest;