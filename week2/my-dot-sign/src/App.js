import "./App.css";
import { SignCanvas } from "./components/SignCanvas";
import { PDFCanvas } from "./components/PDFCanvas";
function App() {
  return (
    <div className="App">
      <SignCanvas />
      <PDFCanvas />
    </div>
  );
}

export default App;
