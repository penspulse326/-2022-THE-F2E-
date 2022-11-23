import React from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import CreateAvatar from "./pages/CreateAvatar";
import ErrorPage from "./pages/ErrorPage";

const theme = {
  colors: {
    primary: "#FFAC89",
    secondary: "#FF7D45",
    tertiary: "#FFF8BA",
    light_grey: "#F2ECE8",
    mid_grey: "#CFC8C4",
    dark_grey: "#8E7E74",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="createAvatar" element={<CreateAvatar />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
