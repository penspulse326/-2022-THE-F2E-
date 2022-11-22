import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./NavBar";

const LayoutWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-image: url("./images/bk.png");
  background-repeat: no-repeat;
  background-position: bottom;
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
