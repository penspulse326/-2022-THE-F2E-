import "./stylesheets/all.scss";
import { ThemeProvider } from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";
import Layout from "./components/UI/Layout";
import Home from "./pages/Home";

const colors = {
  primary: "#F9B471",
  secondary: "#51A8BC",
  terilary: "#BDE8F9",
  main: "#FFFAF4",
  dark: "#4D4C52",
  grey: {
    light: "#F9F8F6",
    mid: "#EEEDE8",
    dark: "#A5A39C",
  },
};

function App() {
  return (
    <ThemeProvider theme={colors}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
