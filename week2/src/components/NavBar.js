import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";

const NavbarWrapper = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 97px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;

  background: #ffffff;
  box-shadow: 0px 3px 4px #eeeeee;
  box-sizing: border-box;

  z-index: 99;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Progress = styled.div`
  margin-left: 67px;

  width: 632px;
  height: 75px;

  ${(props) =>
    props.progress === 1 && "background-image: url(./images/progress_1.png)"}
  ${(props) =>
    props.progress === 2 && "background-image: url(./images/progress_2.png)"}
    ${(props) =>
    props.progress === 3 && "background-image: url(./images/progress_3.png)"};

  background-repeat: no-repeat;
  background-size: contain;
`;

const Login = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 52px;
  width: 152px;
  height: 77px;

  font-size: 24px;
  font-weight: bold;
  text-decoration: none;

  transition: 0.3s;
  &:hover {
    color: ${(props) => props.theme.primary_hover};
  }
`;

export default function NavBar() {
  const [progress, setProgress] = useState(1);
  const location = useLocation();
  useEffect(() => {
    setProgress(() => {
      if (location.pathname === "/") return 1;
      if (location.pathname === "/edit") return 2;
      if (location.pathname === "/download") return 3;
    });
  }, [location]);

  return (
    <NavbarWrapper>
      <Info>
        <Logo />
        <Progress progress={progress} />
      </Info>
      <Login to="/">登入</Login>
    </NavbarWrapper>
  );
}
