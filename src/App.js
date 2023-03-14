import './App.css';
import Home from "./components/Home";
import Nav from "./components/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
        <Home/>
    </div>
  );
}

export default App;
