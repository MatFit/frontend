import { useState } from 'react';
import { Menu } from 'lucide-react';

export function MenuBar() {
  // When menu is open
  const [menuOpen, setMenuOpen] = useState(false);
  // When history submenu is open
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="nav-section">
      <button onClick={() => setMenuOpen(!menuOpen)} className="nav-button">
        <Menu size={24} />
      </button>
      
      {menuOpen && (
        <div className="dropdown-menu left">
          <a href="/" className="dropdown-item">Home</a>
          <a href="/watchlist" className="dropdown-item">Watchlist</a>
          <a href="/quiz" className="dropdown-item">Quiz Yourself!</a>
          
          <div 
            className="dropdown-item submenu-parent"
            onMouseEnter={() => setHistoryOpen(true)}
            onMouseLeave={() => setHistoryOpen(false)}
          >
            <span>History</span>
            
            {historyOpen && (
              <div className="submenu">
                <a href="/past_quizzes" className="dropdown-item">Past Quizzes</a>
                <a href="/performance" className="dropdown-item">Performance</a>
                
              </div>
            )}
          </div>
          
          <a className="dropdown-item">About</a>
        </div>
      )}
    </div>
  );
}