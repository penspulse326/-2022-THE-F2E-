import React from "react";
import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import CreateAvatar from "./pages/CreateAvatar";
import ErrorPage from "./pages/ErrorPage";
import Stage__1 from "./pages/Stage__1"


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
  const [user, setUser] = useState({ gender: null, name: null });
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="createAvatar" element={<CreateAvatar />} />
              <Route path="stage1" element={<Stage__1 />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
