import "./App.css";
import { SignCanvas } from "./components/SignCanvas";
import { PdfCanvas } from "./components/PdfCanvas";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { ThemeProvider } from "styled-components";

const colors = {
  primary: "#5C45D2",
  primary_hover: "#816BF1",
  grey: "#EEEEEE",
  mid_grey: "#EEEEEE",
  dark_grey: "#BBBBBB",
  text: {
    black: "#000000",
    green: "#458227",
    red: "#EC0303",
    blue: "#0073E6",
  },
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={colors}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
