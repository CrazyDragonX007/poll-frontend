import './App.css';
import Home from "./components/Home";
import Nav from "./components/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import { socket } from './socket';

function App() {
    return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
        <Home socket={socket}/>
    </div>
  );
}

export default App;
