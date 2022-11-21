import styled from "styled-components";
import Logo from "./Logo";

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  gap: 80px;

  position: absolute;
  width: 100vw;
  height: 97px;
  left: 0px;
  top: 0px;

  background: #ffffff;
  box-shadow: 0px 3px 4px #eeeeee;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
`;

export default function NavBar() {
  return (
    <NavbarWrapper>
      <Info>
        <Logo />
        <div className="process"></div>
      </Info>
      <div className="login">
        <a href="#">登入</a>
      </div>
    </NavbarWrapper>
  );
}
