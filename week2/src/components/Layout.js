import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./NavBar";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;

  background-image: url("./images/bk.png");
  background-repeat: no-repeat;
  background-position: bottom;
  box-sizing: border-box;
`;

function Layout() {
  return (
    <LayoutWrapper>
      <Navbar />
      <Outlet />
    </LayoutWrapper>
  );
}

export default Layout;
