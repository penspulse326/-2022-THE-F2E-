import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./NavBar";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  background-repeat: no-repeat;

  background-position: bottom;
  box-sizing: border-box;
`;

function Layout() {
  return (
    <LayoutWrapper>
      <Navbar />
      <Outlet />
      <Footer />
    </LayoutWrapper>
  );
}

export default Layout;
