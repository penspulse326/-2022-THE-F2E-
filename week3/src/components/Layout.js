import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AppWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  background-image: url("./images/bk.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  font-family: "Noto Sans TC";
`;

function Layout() {
  return (
    <AppWrapper>
      <Outlet />
    </AppWrapper>
  );
}

export default Layout;
