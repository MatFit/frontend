import './styles/Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">AfterMath</h3>
          <p className="footer-description">
            Your convenient platform for market speculation, aggregated news, and interactive market quizzes.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/watchlist">Watchlist</a></li>
            <li><a href="/quiz">Quiz Yourself</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>


        <div className="footer-section">
          <h4 className="footer-heading">Connect</h4>
          <ul className="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="https://github.com/MatFit">GitHub</a></li>
            <li><a href="https://linkedin.com/in/mathis-fituwi-892977225">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AFTERMATH. All rights reserved.</p>
      </div>
    </footer>
  );
}
