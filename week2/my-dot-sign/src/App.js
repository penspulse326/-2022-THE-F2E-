import "./App.css";
import { SignCanvas } from "./components/SignCanvas";
import { PdfCanvas } from "./components/PdfCanvas";
function App() {
  return (
    <div className="App">
      <SignCanvas />

      <PdfCanvas />
    </div>
  );
}

export default App;
