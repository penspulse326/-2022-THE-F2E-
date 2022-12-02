import React from "react";
import "./App.css";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { HashRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import GameStart from "./pages/GameStart";
import NewAvatar from "./pages/NewAvatar";

import Stage1 from "./pages/Stage1";
import Stage2 from "./pages/Stage2";
import Stage3 from "./pages/Stage3";
import Stage4 from "./pages/Stage4";
import Final from "./pages/Final";
import Error from "./pages/Error";

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
              <Route path="start" element={<GameStart />} />
              <Route path="createAvatar" element={<NewAvatar />} />
              <Route path="stage1" element={<Stage1 />} />
              <Route path="stage2" element={<Stage2 />} />
              <Route path="stage3" element={<Stage3 />} />
              <Route path="stage4" element={<Stage4 />} />
              <Route path="final" element={<Final />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </HashRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
