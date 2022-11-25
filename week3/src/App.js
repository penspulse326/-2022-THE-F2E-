import React from "react";
import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import NewAvatarPage from "./pages/NewAvatartPage";
import ErrorPage from "./pages/ErrorPage";
import Stage1Page from "./pages/Stage1Page";

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
              <Route index element={<HomePage />} />
              <Route path="createAvatar" element={<NewAvatarPage />} />
              <Route path="stage1" element={<Stage1Page />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
