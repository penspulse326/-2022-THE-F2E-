import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FileView from "./pages/FileView";
import Layout from "./components/Layout";
import { ThemeProvider } from "styled-components";
import { FileContext } from "./FileContext";
import { useState } from "react";

const colors = {
  primary: "#5C45D2",
  primary_hover: "#816BF1",
  grey: "#EEEEEE",
  mid_grey: "#E6E6E6",
  dark_grey: "#BBBBBB",
  text: {
    black: "#000000",
    green: "#458227",
    red: "#EC0303",
    blue: "#0073E6",
  },
};

function App() {
  const [file, setFile] = useState(null);
  return (
    <div className="App">
      <ThemeProvider theme={colors}>
        <FileContext.Provider value={{ file, setFile }}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="fileview" element={<FileView />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </HashRouter>
        </FileContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;