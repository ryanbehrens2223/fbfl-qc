//import logo from './FBFL_Logo.jpeg';
import './css/tooplate-wave-cafe.css';
import Scoreboard from './Scoreboard';
import Matchup from './Match';

function App() {
  return (
    <div className="App">
{/*       <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src={logo} className="App-logo-flip" alt="logo" />
          </div>
          <div class="flip-card-back">
            <p>
              HALEY BEHRENS
            </p>
            <a
              className="App-logo-flip"
              href="https://rbear17.wixsite.com/fbfl"
              target="_blank"
              rel="noopener noreferrer"
            >
              DAD & MOM
            </a>
          </div>
        </div>
      </div> */}
      <div class="Scoreboard">
        <Scoreboard />
      </div>
      <div class="Matchup">
        <Matchup />
      </div>
    </div>
  );
}

export default App;
