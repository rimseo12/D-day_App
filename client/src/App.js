import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ExampleModal from './pages/home/components/shared/ModalLayout'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ExampleModal/>
        <button
          onClick={async () => {
            const result = await axios.get("/products");
            console.log(result);
          }}
        >
         리스트 불러오기!
        </button>
      </header>
    </div>
  );
}

export default App;
