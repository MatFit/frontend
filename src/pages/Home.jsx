import './styles/Home.css';
import { SearchBar } from './SearchBar';

function Home() {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <p>Welcomse to the home page!</p>
      <SearchBar></SearchBar>
    </div>
  );
}

export default Home;