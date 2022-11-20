import "./App.css";
import { SignCanvas } from "./components/SignCanvas";
import { PdfCanvas } from "./components/PdfCanvas";
import { HashRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar";

function App() {
  return <div className="App">
    <NavBar/>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </HashRouter>
  </div>;
}

export default App;
