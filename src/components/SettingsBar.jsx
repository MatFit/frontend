import { useState } from 'react';
import { Settings } from 'lucide-react';

export function SettingsBar() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="nav-section">
      <button
        onClick={() => setSettingsOpen(!settingsOpen)}
        className="nav-button"
      >
        <Settings size={24} />
      </button>
      
      {settingsOpen && (
        <div className="dropdown-menu right">
          <a href="/profile" className="dropdown-item">Profile</a>
          <a href="/preferences" className="dropdown-item">Preferences</a>
          <a href="/notifications" className="dropdown-item">Notifications</a>
          <a href="/logout" className="dropdown-item danger">Logout</a>
        </div>
      )}
    </div>
  );
}