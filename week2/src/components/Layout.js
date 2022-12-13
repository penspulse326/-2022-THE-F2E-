import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./NavBar";

const LayoutWrapper = styled.div`
  height: 100vh;
  width: 100vw;

  background-image: url("./images/bk.png");
  background-repeat: no-repeat;
  background-position: bottom;

  overflow: hidden;
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
