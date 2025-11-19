import './styles/TickerModal.css';

import React from 'react';

import { X, Plus} from "lucide-react";
import PropTypes from 'prop-types';

export const TickerModal = ({ ticker, isOpen, onClose }) => {
  if (!isOpen || !ticker) return null;

  // Handle clicking outside the modal to close it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Add event listener for escape key
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* Close button */}
        <button onClick={onClose} className="modal-close-button">
          <X size={24} />
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <h2>{ticker.company_name}</h2>
          <div className="ticker-info">
            <span className="ticker-symbol">{ticker.ticker}</span>
            <span className="ticker-exchange">{ticker.exchange}</span>
          </div>
        </div>

        {/* Placeholder for chart */}
        <div className="chart-section">
          <h3>Price Chart</h3>
          <div className="chart-placeholder">
            Chart for {ticker.ticker} will go here
          </div>
        </div>

        {/* Company details section */}
        <div className="details-section">
          <h3>Company Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-label">Symbol</div>
              <div className="detail-value">{ticker.ticker}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Exchange</div>
              <div className="detail-value">{ticker.exchange}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Market</div>
              <div className="detail-value">{ticker.market || 'stocks'}</div>
            </div>
          </div>
        </div>

        {/* Placeholder for additional data */}
        <div className="additional-info">
          <h3>Additional Information</h3>
          <div className="info-placeholder">
            More company data and analytics will be displayed here...
          </div>
        </div>

        {/* <div className="watchlist-button-section">
            <button onClick={onClose} className="modal-add-watchlist-button" title="Add to Watchlist">
              <Plus size={24} />
            </button>
        </div> */}
        <div class="button-container">
          <Plus className="hover-button" size={24} />
          <div class="content-box">
            <p>Add to your watchlist</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// Types validation
TickerModal.propTypes = {
    ticker: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};