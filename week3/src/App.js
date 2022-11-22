import React from "react";
import "./App.css";
import styled from "styled-components";
import Home from "./pages/Home";

const AppWrapper = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("./images/bk.png");
  background-size: cover;
  background-repeat: no-repeat;
`;

function App() {
  return (
    <AppWrapper>
      <Home></Home>
    </AppWrapper>
  );
}

export default App;
