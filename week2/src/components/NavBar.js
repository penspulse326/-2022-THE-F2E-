import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import { MQ_MD, MQ_LG} from "../constants/breakpoint"

const NavbarWrapper = styled.div`
  position: relative;
  top: 0;
  
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 40px;
  width: 100%;

  background: #ffffff;
  box-shadow: 0px 3px 4px #eeeeee;
  box-sizing: border-box;

  z-index: 99;

  ${MQ_LG} {
    height: 97px;
  }

  ${MQ_MD} {
    height: 60px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Progress = styled.div`
  margin-left: 67px;
  width: 632px;

  ${(props) =>
    props.progress === 1 && "background-image: url(./images/progress_1.png)"}
  ${(props) =>
    props.progress === 2 && "background-image: url(./images/progress_2.png)"}
    ${(props) =>
    props.progress === 3 && "background-image: url(./images/progress_3.png)"};

  background-repeat: no-repeat;
  background-size: contain;

  ${MQ_LG} {
    height: 75px;
  }

  ${MQ_MD} {
    height: 45px;
  }
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

  ${MQ_MD} {
    font-size: 18px;
  }
`;

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
      <Info>
        <Logo />
        <Progress progress={progress} />
      </Info>
      <Login to="/">登入</Login>
    </NavbarWrapper>
  );
}
