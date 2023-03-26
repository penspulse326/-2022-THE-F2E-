import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo";
import { MQ_MB, MQ_MD, MQ_LG } from "../constants/breakpoint";

export default function NavBar() {
  const [progress, setProgress] = useState(1);
  const location = useLocation();
  useEffect(() => {
    setProgress(() => {
      if (location.pathname === "/") return 1;
      if (location.pathname === "/fileview") return 2;
      if (location.pathname === "/download") return 3;
    });
  }, [location]);

  return (
    <NavbarWrapper>
      <LogoGroup>
        <Logo />
        <Progress progress={progress} />
      </LogoGroup>
      <Login>登入</Login>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.div`
  position: relative;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 40px;
  height: 70px;
  width: 100%;

  background: #ffffff;
  box-shadow: 0px 3px 4px #eeeeee;
  box-sizing: border-box;

  z-index: 99;

  ${MQ_MD} {
    height: 80px;
  }
  ${MQ_LG} {
    height: 97px;
  }
`;

const Progress = styled.div`
  ${(props) =>
    props.progress === 1 && "background-image: url(./images/progress_1.png)"}
  ${(props) =>
    props.progress === 2 && "background-image: url(./images/progress_2.png)"}
    ${(props) =>
    props.progress === 3 && "background-image: url(./images/progress_3.png)"};

  background-repeat: no-repeat;
  background-size: contain;

  ${MQ_MB} {
    display: none;
  }
  ${MQ_MD} {
    display: block;
    width: 532px;
    height: 45px;
  }
  ${MQ_LG} {
    width: 632px;
    height: 75px;
  }
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;

  transition: 0.3s;

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary_hover};
  }

  ${MQ_MD} {
    width: 152px;
    height: 77px;
    font-size: 24px;
  }
`;

const LogoGroup = styled.div`
  display: flex;
`;
