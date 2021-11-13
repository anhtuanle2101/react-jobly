import Home from "./Home";
import Nav from "./Nav";
import './App.css';
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App;
